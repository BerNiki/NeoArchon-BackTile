# NeoArchon-BackTile

A project to bring back Archon to it's glory today.

🟢 Phase 1: MVP Roadmap (4–6 weeks)
Week 1 – Foundation (Board Service & DB)

Set up NestJS project.

Connect to Postgres (Docker).

Define schema:

users (id, email, password hash).

games (id, status, turn, board state JSON).

moves (id, gameId, playerId, move data).

fights (id, gameId, defenderId, attackerId, winnerId, log)

gamePlayers (id, gameId, UserId, role)

Implement auth (JWT w/ Passport).

Expose endpoints:

POST /games (create new game).

POST /games/:id/join (join existing game).

GET /games/:id (fetch board state).

Write unit tests for services.

👉 End of week: you can create/join games and fetch board state.

Week 2 – Turn Logic & Board State

Implement basic board logic (like chess-lite):

Units placed on grid.

Players alternate turns.

Move validation rules.

Update DB schema: board_state stored as serialized JSON.

Implement POST /games/:id/move endpoint.

Enforce turn order.

Add test cases for move validation.

👉 End of week: you can play a simple board game through API calls.

Week 3 – Frontend Board UI (React)

Set up React + Vite project.

Build board UI (grid with pieces).

Integrate API calls:

Create/join game.

Fetch board state.

Submit moves.

Simple auth flow (login/signup).

Polling (or SSE) for board updates (later swapped for WS).

👉 End of week: you can play a basic turn-based game in the browser.

Week 4 – Arena Prototype (Express/NestJS WS)

Set up Arena Service (Express or NestJS w/ WS).

Implement WS room creation (one room per arena fight).

Clients connect → send input (move, attack).

Server simulates simple arena loop (tick 30/s).

Arena ends when one player “wins.”

Report result back to Board Service (HTTP call).

👉 End of week: board fights now launch a simple arena battle.
