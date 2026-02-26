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

# Run the dev server
uvicorn app.main:app --reload
```

The API is served at **http://localhost:8000**.  
Health check: `GET /health`

## Docker

```bash
docker build -t profile-backend .
docker run -p 8000:8000 profile-backend
```

## Project Structure

```
backend/
├── app/
│   ├── core/
│   │   └── config.py      # pydantic-settings configuration
│   └── main.py             # FastAPI app factory & routes
├── .env.example
├── Dockerfile
├── pyproject.toml
└── README.md
```
