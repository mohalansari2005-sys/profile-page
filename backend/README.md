# Profile Page — Backend

FastAPI service powering the portfolio profile page.

## Quick Start

```bash
# Create & activate a virtual environment
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate

# Install dependencies
pip install -e ".[dev]"

# Copy env and (optionally) customise
cp .env.example .env
```

## Database

Start PostgreSQL (from the **project root**, not `backend/`):

```bash
docker compose up -d postgres
```

Run migrations:

```bash
# Inside backend/ with venv active
alembic upgrade head
```

Generate a new migration after adding models:

```bash
alembic revision --autogenerate -m "describe change"
```

## Run the Server

```bash
uvicorn app.main:app --reload
```

The API is served at **http://localhost:8000**.
Health check: `GET /health`

## Docker (backend only)

```bash
docker build -t profile-backend .
docker run -p 8000:8000 profile-backend
```

## Project Structure

```
backend/
├── alembic/               # Alembic migrations
│   ├── versions/          # Auto-generated migration scripts
│   └── env.py             # Async migration environment
├── app/
│   ├── core/
│   │   └── config.py      # pydantic-settings configuration
│   ├── db/
│   │   ├── base.py        # SQLAlchemy DeclarativeBase
│   │   └── session.py     # Async engine & session factory
│   └── main.py            # FastAPI app factory & routes
├── .env.example
├── alembic.ini
├── Dockerfile
├── pyproject.toml
└── README.md
```
