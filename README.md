# SecondServing — Surplus Food Rescue Platform

A real-time network connecting restaurants, stores, and farms with communities to rescue surplus food. Businesses list items before expiration; nearby households, food banks, or composters claim them instantly via the app. AI learns waste patterns to optimize future ordering.

## Architecture

| Service    | Tech             | Port |
|------------|------------------|------|
| `frontend` | Next.js 14 + TS  | 3000 |
| `backend`  | FastAPI + Python  | 8000 |
| `ml`       | scikit-learn / XGBoost | — |

## Prerequisites

- **Python 3.12+**
- **Node.js 20+**
- **Homebrew** (macOS) — for PostgreSQL and Redis

## Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/mandp711/secondserving.git
cd secondserving
```

### 2. Configure environment variables

Create a `.env` file in the project root with your API keys:

```bash
# Google Maps
GOOGLE_MAPS_API_KEY=your-google-maps-key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-key

# OpenRouter (OpenAI-compatible — used for embeddings + chat)
OPENROUTER_API_KEY=your-openrouter-key
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1

# Pinecone (vector search)
PINECONE_API_KEY=your-pinecone-key

# PostgreSQL (local Homebrew install)
DATABASE_URL=postgresql+asyncpg://your-user@localhost:5432/foodapp

# Redis
REDIS_URL=redis://localhost:6379/0

# App
APP_ENV=development
APP_SECRET_KEY=change-me-in-production
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:8000
```

Then set up the frontend env file:

```bash
cp frontend/.env.example frontend/.env.local
```

Edit `frontend/.env.local` and fill in:

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` — same Google Maps key as above
- `NEXT_PUBLIC_SUPABASE_URL` — your Supabase project URL (e.g. `https://abc123.supabase.co`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — your Supabase anon/public key

### 3. Install PostgreSQL and Redis

```bash
brew install postgresql@16 redis
export PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH"

brew services start postgresql@16
brew services start redis

createdb foodapp
```

To make the PATH change permanent, add this to `~/.zshrc`:

```bash
export PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH"
```

### 4. Set up Supabase (for auth)

Create a free project at [supabase.com/dashboard](https://supabase.com/dashboard), then run the following SQL migrations in the Supabase SQL Editor (in order):

1. `migrations/001_create_restaurants.sql`
2. `migrations/002_create_profiles.sql`

Copy the **Project URL** and **anon key** from **Settings → API** into `frontend/.env.local`.

### 5. Start the backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The backend runs at **http://localhost:8000**. API docs at **http://localhost:8000/docs**.

> The backend reads `.env` from the project root automatically. Pinecone and OpenRouter keys are optional — without them, restaurant search falls back to the local CSV dataset.

### 6. Start the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at **http://localhost:3000**.

## Environment Variables

### Backend (root `.env`)

| Variable | Required | Description |
|---|---|---|
| `GOOGLE_MAPS_API_KEY` | For geocoding | Google Maps Platform API key |
| `OPENROUTER_API_KEY` | For vector search | OpenRouter API key (OpenAI-compatible) |
| `OPENROUTER_BASE_URL` | For vector search | Defaults to `https://openrouter.ai/api/v1` |
| `PINECONE_API_KEY` | For vector search | Pinecone vector database API key |
| `DATABASE_URL` | For DB features | PostgreSQL connection string |
| `REDIS_URL` | For caching | Redis connection string |
| `APP_SECRET_KEY` | Yes | Secret key for signing |
| `APP_ENV` | No | `development` or `production` |

### Frontend (`frontend/.env.local`)

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | For map display | Google Maps JavaScript API key |
| `NEXT_PUBLIC_BACKEND_URL` | No | Backend URL (defaults to `http://localhost:8000`) |
| `NEXT_PUBLIC_SUPABASE_URL` | For auth | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | For auth | Supabase anon/public key |

## Project Structure

```
secondserving/
├── .env                        # API keys and service config (git-ignored)
├── .gitignore
├── README.md
├── scrape_santa_barbara.py     # One-off scraper for restaurant data
├── migrations/                 # Supabase SQL migrations
│   ├── 001_create_restaurants.sql
│   └── 002_create_profiles.sql
├── frontend/                   # Next.js web app
│   ├── .env.example            # Template for frontend env vars
│   ├── .env.local              # Actual frontend env vars (git-ignored)
│   ├── package.json
│   └── src/
│       ├── app/                # Pages: landing, map, listings, auth, dashboard
│       ├── components/         # UI components, auth guards, layout
│       ├── hooks/              # useGeolocation
│       ├── lib/                # Supabase client, Google Maps loader
│       ├── store/              # Zustand auth store
│       └── types/              # TypeScript interfaces
├── backend/                    # FastAPI REST API
│   ├── requirements.txt
│   └── app/
│       ├── main.py             # App entry point, CORS, router setup
│       ├── config.py           # Pydantic settings (reads root .env)
│       └── api/v1/
│           ├── search.py       # POST /api/v1/search — find nearby restaurants
│           └── restaurants.py  # GET /api/v1/restaurants — list all restaurants
└── ml/                         # Waste prediction ML pipeline
    ├── requirements.txt
    ├── data/                   # CSV datasets, collectors, preprocessors
    ├── models/                 # Demand forecaster
    └── training/               # Training scripts (train_surplus.py)
```
