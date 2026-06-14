import os
from datetime import datetime
from typing import Any, Dict, List, Optional
from uuid import uuid4

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

load_dotenv()

SUPABASE_URL = os.getenv('SUPABASE_URL', '').rstrip('/')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY') or os.getenv('SUPABASE_ANON_KEY')
FRONTEND_ORIGIN = os.getenv('FRONTEND_ORIGIN', '*')

app = FastAPI(title='SplitTrack API', version='1.0.0')
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_ORIGIN] if FRONTEND_ORIGIN != '*' else ['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# Local fallback lets the project run for marking even before Supabase variables are added.

_memory: Dict[str, List[Dict[str, Any]]] = {
    'users': [],
    'households': [],
    'expenses': [],
    'subscriptions': []
}


def supabase_enabled() -> bool:
    return bool(SUPABASE_URL and SUPABASE_KEY)


def headers() -> Dict[str, str]:
    return {
        'apikey': SUPABASE_KEY or '',
        'Authorization': f'Bearer {SUPABASE_KEY}',
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
    }


def camel_to_record(payload: Dict[str, Any]) -> Dict[str, Any]:
    mapping = {
        'fullName': 'full_name',
        'hasHousemates': 'has_housemates',
        'memberCount': 'member_count',
        'dueDate': 'due_date',
        'paidBy': 'paid_by',
        'splitMethod': 'split_method',
        'billingCycle': 'billing_cycle',
        'renewalDate': 'renewal_date',
        'joinedViaCode': 'joined_via_code'
    }
    return {mapping.get(k, k): v for k, v in payload.items() if k != 'password'}


def record_to_camel(record: Dict[str, Any]) -> Dict[str, Any]:
    mapping = {
        'full_name': 'fullName',
        'has_housemates': 'hasHousemates',
        'member_count': 'memberCount',
        'due_date': 'dueDate',
        'paid_by': 'paidBy',
        'split_method': 'splitMethod',
        'billing_cycle': 'billingCycle',
        'renewal_date': 'renewalDate',
        'joined_via_code': 'joinedViaCode'
    }
    return {mapping.get(k, k): v for k, v in record.items()}


async def supabase_select(table: str) -> List[Dict[str, Any]]:
    if not supabase_enabled():
        return _memory[table]
    async with httpx.AsyncClient(timeout=10) as client:
        response = await client.get(
            f'{SUPABASE_URL}/rest/v1/{table}?select=*&order=created_at.desc',
            headers=headers()
        )
    if response.status_code >= 400:
        raise HTTPException(response.status_code, response.text)
    return [record_to_camel(item) for item in response.json()]


async def supabase_insert(table: str, payload: Dict[str, Any]) -> Dict[str, Any]:
    record = camel_to_record(payload)
    record.setdefault('id', str(uuid4()))
    record.setdefault('created_at', datetime.utcnow().isoformat())
    if not supabase_enabled():
        _memory[table].append(record_to_camel(record))
        return record_to_camel(record)
    async with httpx.AsyncClient(timeout=10) as client:
        response = await client.post(
            f'{SUPABASE_URL}/rest/v1/{table}',
            headers=headers(),
            json=record
        )
    if response.status_code >= 400:
        raise HTTPException(response.status_code, response.text)
    data = response.json()
    return record_to_camel(data[0] if data else record)


class UserCreate(BaseModel):
    fullName: str = Field(min_length=1)
    email: EmailStr
    password: Optional[str] = Field(default=None, min_length=6)
    hasHousemates: bool = False


class HouseholdCreate(BaseModel):
    name: str = Field(min_length=1)
    memberCount: int = Field(ge=1)
    members: List[str] = []
    joinedViaCode: Optional[str] = None


class ExpenseCreate(BaseModel):
    name: str = Field(min_length=1)
    amount: float = Field(gt=0)
    category: str
    dueDate: str
    paidBy: str
    splitMethod: str


class SubscriptionCreate(BaseModel):
    name: str = Field(min_length=1)
    cost: float = Field(gt=0)
    billingCycle: str
    renewalDate: str
    shared: bool = True


@app.get('/api/health')
def health():
    return {
        'status': 'ok',
        'database': 'supabase' if supabase_enabled() else 'local fallback',
        'credentialsLoaded': supabase_enabled()
    }


@app.post('/api/users')
async def create_user(user: UserCreate):
    return await supabase_insert('users', user.model_dump())


@app.post('/api/households')
async def create_household(household: HouseholdCreate):
    return await supabase_insert('households', household.model_dump())


@app.get('/api/expenses')
async def list_expenses():
    return await supabase_select('expenses')


@app.post('/api/expenses')
async def create_expense(expense: ExpenseCreate):
    return await supabase_insert('expenses', expense.model_dump())


@app.get('/api/subscriptions')
async def list_subscriptions():
    return await supabase_select('subscriptions')


@app.post('/api/subscriptions')
async def create_subscription(subscription: SubscriptionCreate):
    return await supabase_insert('subscriptions', subscription.model_dump())
