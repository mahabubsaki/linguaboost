# Agent App

Python agent application for LinguaBoost that communicates with the API through gRPC.

## Setup

1. Install uv (if not already installed):
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

2. Install dependencies:
```bash
uv sync
```

3. Run the agent:
```bash
uv run python src/main.py
```

## Development

- Format code: `uv run black src/`
- Sort imports: `uv run isort src/`
- Lint: `uv run flake8 src/`
- Type check: `uv run mypy src/`
- Run tests: `uv run pytest`

## gRPC Communication

The agent communicates with the API app through gRPC on port 50051.
Protocol buffer definitions are shared between the agent and API apps.
