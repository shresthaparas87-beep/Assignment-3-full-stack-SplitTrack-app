# SplitTrack - BUS4012 Assignment 3

SplitTrack is a shared expense and subscription tracker for students living in shared housing. This Assignment 3 version upgrades the Assignment 2 MVP into a deployed full-stack application with a React frontend, a Python backend, and Supabase persistence.

## Architecture

- **Frontend:** React + Vite, deployed to Vercel.
- **Backend:** Python FastAPI service, deployable to Render/Railway/Fly.io or another Python-friendly cloud host.
- **Database:** Supabase PostgreSQL, accessed only from the backend using environment variables.
- **Security:** Supabase keys are not hardcoded in frontend code. 

## Key Features

1. Sign-up screen with basic validation.
2. Household setup flow.
3. Add shared expenses and save them through the Python backend.
4. Add subscriptions and save them through the Python backend.
5. Retrieve saved expenses and subscriptions from Supabase when the app loads.
6. Dashboard, reminders, confirmation, and profile screens retained from the MVP.

## Local Setup

### 1. Supabase

Create a Supabase project and run the SQL in `backend/schema.sql` inside the Supabase SQL Editor.

### 2. Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

Fill in `.env`:

```bash
SUPABASE_URL=https://moreaijlgnuzqmgdowao.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sb_publishable_hw1oI-TvAof6Y22ow3oOLg_hTlnoSdv
FRONTEND_ORIGIN=http://localhost:5173
```

Run the backend:

```bash
uvicorn main:app --reload --port 8000
```

Health check:

```bash
http://localhost:8000/api/health
```

### 3. Frontend

From the project root:

```bash
npm install
cp .env.example .env
npm run dev
```

Set `.env`:

```bash
VITE_API_BASE_URL=http://localhost:8000
```

Open `http://localhost:5173`.

## Deployment Notes

### Vercel Frontend

1. Push this repository to GitHub.
2. Import the project into Vercel.
3. Add environment variable:
   - `VITE_API_BASE_URL=https://your-backend-url`
4. Deploy.

### Python Backend

Deploy the `backend` folder to a Python cloud service. Add environment variables:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `FRONTEND_ORIGIN=https://your-vercel-app.vercel.app`

Start command:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

## Repository Structure

```text
SplitTrack_Assessment3_Project/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── schema.sql
│   └── .env.example
├── src/
│   ├── api.js
│   ├── App.jsx
│   ├── App.css
│   └── components/
├── .env.example
├── .gitignore
├── package.json
└── README.md
```
## Notes for Marking

The backend includes a local fallback so the app still runs if Supabase environment variables are missing. For the submitted demo, the deployed backend should use Supabase credentials through environment variables so the marker can see real database persistence.
