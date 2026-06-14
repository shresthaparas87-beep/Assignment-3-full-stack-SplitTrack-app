# SplitTrack

SplitTrack is a full-stack web application for tracking shared household bills, expenses, and subscriptions. It helps users manage payments in one place, split costs fairly, and keep track of recurring financial responsibilities.

## Live Links

Frontend: https://assignment-3-full-stack-split-track.vercel.app
Backend API: https://splittrack-backend-xz82.onrender.com
Health Check: https://splittrack-backend-xz82.onrender.com/api/health

## Tech Stack

* React
* Vite
* Python
* FastAPI
* Supabase
* Render
* Vercel

## Features

* Create and manage users
* Create households
* Add shared expenses
* Add recurring subscriptions
* View expenses and subscriptions from the dashboard
* Backend API connected to Supabase
* Deployed frontend and backend

## Project Structure

```text
SplitTrack_Assessment3_Project/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── schema.sql
│   └── .python-version
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── README.md
```

## Local Setup

### Frontend

Install dependencies:

```bash
npm install
```

Run the frontend:

```bash
npm run dev
```

The frontend runs at:

```text
http://localhost:5173
```

### Backend

Go into the backend folder:

```bash
cd backend
```

Create and activate a virtual environment:

```bash
python -m venv venv
```

On Windows:

```bash
venv\Scripts\activate
```

On macOS/Linux:

```bash
source venv/bin/activate
```

Install backend dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file inside the `backend` folder:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_secret_key
FRONTEND_ORIGIN=http://localhost:5173
```

Run the backend:

```bash
uvicorn main:app --reload
```

The backend runs at:

```text
http://localhost:8000
```

Test the backend:

```text
http://localhost:8000/api/health
```

## Supabase Setup

The database schema is included in:

```text
backend/schema.sql
```

This file was run in Supabase SQL Editor to create the required tables and policies.

## Deployment

The backend is deployed on Render using:

```text
Root Directory: backend
Build Command: pip install -r requirements.txt
Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
Health Check Path: /api/health
```

Render environment variables:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_secret_key
FRONTEND_ORIGIN=https://assignment-3-full-stack-split-track.vercel.app
PYTHON_VERSION=3.11.10
```

The frontend is deployed on Vercel using:

```text
Framework: Vite
Build Command: npm run build
Output Directory: dist
```

Vercel environment variable:

```env
VITE_API_BASE_URL=https://splittrack-backend-xz82.onrender.com
```

## Notes

The application uses a React frontend, a FastAPI backend, and Supabase for persistent database storage. The deployed version connects the Vercel frontend to the Render backend, which then communicates with Supabase.
