# NeoArchon-BackTile ⚔️🛡️

## Modern Backend for a Classic Battle

Welcome to the backend service for **NeoArchon**, a project dedicated to reviving the classic strategy game Archon into a modern, web-based experience.

This repository, the "BackTile," is a robust, scalable **NestJS** application built with TypeScript, managing all core game logic, user authentication, and persistent data storage.

---

## ✨ Features

- **Robust Authentication:** Full user lifecycle management (Sign Up, Sign In, Update Password, Logout) powered by **JWT (Access & Refresh Tokens)** and **Passport.js** strategies. Uses `bcrypt` for secure password hashing.
- **Persistent Storage:** Data is managed via **TypeORM** connected to a **PostgreSQL** database.
- **Modular Game Logic:** Clear separation of concerns with dedicated modules for `Auth`, `Users`, `Games`, and `Moves`.
- **Game Management:** API endpoints for **creating** and **joining** games, managing player roles (`WHITE`/`BLACK`), and storing complex **board state** as `JSONB`.
- **Clean Architecture:** Utilizes NestJS best practices, including **Guards** (for JWT protection), **Decorators** (`@GetUser()`), and **Interceptors** (for response transformation).

---

## 🚀 Quick Start

Follow these steps to get the development environment running on your local machine.

### Prerequisites

You will need the following installed:

- **Node.js** (LTS recommended)
- **npm** (comes with Node.js)
- **PostgreSQL** (or Docker to run it)
- A **`.env`** file (see Setup section below)

### 1\. Installation

Clone the repository and install dependencies:

```bash
git clone git@gitlab.nixdev.co:berniki-neoarchon-backtile.git
cd berniki-neoarchon-backtile
npm install
```

### 2\. Environment Setup

Create a file named **`.env`** in the project root with the required environment variables.

| Variable                 | Description                            | Example Value                           |
| :----------------------- | :------------------------------------- | :-------------------------------------- |
| `PORT`                   | Server port for the NestJS app         | `3000`                                  |
| `DATABASE_URL`           | Connection string for your Postgres DB | `postgres://user:pass@host:5432/dbname` |
| `JWT_SECRET`             | Secret for short-lived access tokens   | `my-access-secret-key-123`              |
| `JWT_EXPIRATION`         | Expiration time for access tokens      | `1h`                                    |
| `JWT_REFRESH_SECRET`     | Secret for long-lived refresh tokens   | `my-refresh-secret-key-456`             |
| `JWT_REFRESH_EXPIRATION` | Expiration time for refresh tokens     | `7d`                                    |

### 3\. Running the App

Use the provided NPM scripts to run the application in development mode:

| Command              | Description                                                   |
| :------------------- | :------------------------------------------------------------ |
| `npm run start:dev`  | **Start the server in watch mode** (reloads on file changes). |
| `npm run build`      | Compile the TypeScript code to JavaScript.                    |
| `npm run start:prod` | Run the compiled application from the `dist` folder.          |

**Start Development Server:**

```bash
npm run start:dev
```

The application will be listening on the port specified in your `.env` file (default: 3000).

## OR:

# 🧱 NeoArchon Backend (NestJS + PostgreSQL)

## 🚀 Run locally with Docker

### Prerequisites

- Docker and Docker Compose installed

### 1️⃣ Build and start all containers

```bash
docker-compose up --build

---

# Important NOTE:

### use this address if you choose docker DATABASE_URL=postgres://postgres:postgres@postgres:5432/archon in env.
### also crypto declaration requirement in app.module is dependent on your node version.

## 📂 Project Structure Overview

The application follows the standard NestJS modular pattern, ensuring high maintainability and scalability.

```

src/
├── app.module.ts # Root Module
├── main.ts # App entry point
├── transform.interceptor.ts # Global response shaping
├── auth/ # User authentication (JWT, Passports, Strategies)
│ ├── auth.controller.ts # REST endpoints: signup, signin, refresh, logout
│ ├── auth.service.ts # Core logic: password hashing, token generation
│ └── jwt/ # Passport Strategies (jwt, jwt-refresh)
├── config/ # Global configuration service for secrets
├── CONSTS/ # Centralized error messages and string constants
├── enums/ # Game and Player status enums
├── games/ # Core Game logic (creation, joining, state management)
│ ├── games.entity.ts # TypeORM entity for the Game board
│ └── games.service.ts # Logic for creating and joining games
├── moves/ # Future Move validation and history tracking
└── users/ # User management (profile, update, delete, decorators)
├── users.entity.ts # TypeORM entity for User data
├── users.controller.ts # REST endpoints: profile management
└── get-user.decorator.ts # Custom decorator to retrieve the authenticated user

````

---

## 🧪 Testing

Unit and E2E tests are configured using **Jest**.

| Command            | Description                                                             |
| :----------------- | :---------------------------------------------------------------------- |
| `npm run test`     | Run all unit tests.                                                     |
| `npm run test:e2e` | Run all end-to-end tests (requires the server to be running or mocked). |
| `npm run test:cov` | Run tests and display code coverage report.                             |

---

## 📝 Code Style & Quality

This project enforces strict code quality and formatting rules to maintain consistency.

- **Linting:** Handled by **ESLint** with specific rules for TypeScript and Prettier integration.
- **Formatting:** Managed by **Prettier** for automatic code style consistency.

<!-- end list -->

```bash
npm run format # Automatically format all .ts files
npm run lint   # Check for linting errors and attempt to fix them
````

---

## 🏛️ NeoArchon Backend Entity Relationship Diagram (ERD)

| Entity                          | Primary Key (PK) | Key Relationships                                                                      | Description                                                                                                                                                             |
| :------------------------------ | :--------------- | :------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **User** (`users`)              | `id` (UUID)      | One-to-Many with `GamePlayer`                                                          | Stores user credentials, profile info (`username`, `email`), ELO rating, and security tokens (`passwordHash`, `currentHashedRefreshToken`).                             |
| **Game** (`games`)              | `id` (UUID)      | One-to-Many with `GamePlayer`, One-to-Many with `Move`, Many-to-One with `User` (Turn) | Represents a single game instance. Stores dynamic data like `status`, `board_state` (JSONB), and `gameSetup` (JSONB).                                                   |
| **GamePlayer** (`game_players`) | `id` (UUID)      | **Many-to-One** with `Game`, **Many-to-One** with `User`                               | **Junction table** establishing the M:M relationship between `User` and `Game`. It defines the `role` (`WHITE`, `BLACK`, `SPECTATOR`) of a user within a specific game. |
| **Move** (`moves`)              | `id` (UUID)      | **Many-to-One** with `Game`, **Many-to-One** with `User`                               | Stores the history of actions taken in a game. Tracks the `gameId`, the executing `userId`, and the `move_data` (JSONB).                                                |

---

## 🔗 Detailed Relationships

The entities are connected primarily through **Many-to-One** and **One-to-Many** decorators, forming the following logical connections:

### 1. User & Game (Many-to-Many via Junction Table)

The relationship between `User` and `Game` is mediated by the `GamePlayer` entity. This is the **correct pattern** for storing associated metadata (the player's `role`) for the relationship.

- **`User` $\rightarrow$ `GamePlayer` (One-to-Many):** A user can participate in many games.
  - _Implementation:_ `User` has `@OneToMany(() => GamePlayer, (gp) => gp.user) games: GamePlayer[]`

- **`Game` $\rightarrow$ `GamePlayer` (One-to-Many):** A single game can have many players (participants).
  - _Implementation:_ `Game` has `@OneToMany(() => GamePlayer, (gp) => gp.game) players: GamePlayer[]`

- **`GamePlayer` $\rightarrow$ `User` (Many-to-One):** Each entry links back to one user.
  - _Implementation:_ `GamePlayer` has `@ManyToOne(() => User, (user) => user.games)`
- **`GamePlayer` $\rightarrow$ `Game` (Many-to-One):** Each entry links back to one game.
  - _Implementation:_ `GamePlayer` has `@ManyToOne(() => Game, (game) => game.players)`

### 2. Game & Move (One-to-Many)

A game tracks all the moves that happen within it.

- **`Game` $\rightarrow$ `Move` (One-to-Many):** A game can have many moves.
  - _Implementation:_ `Game` has `@OneToMany(() => Move, (move: Move) => move.game) moves: Move[]`

- **`Move` $\rightarrow$ `Game` (Many-to-One):** Each move belongs to exactly one game.
  - _Implementation:_ `Move` has `@ManyToOne(() => Game, (game) => game.moves)`

### 3. Move & User (Many-to-One)

A move is associated with the user who executed it.

- **`Move` $\rightarrow$ `User` (Many-to-One):** Each move was made by one user.
  - _Implementation:_ `Move` has `@ManyToOne(() => User, { eager: true }) user: User`

### 4. Game & Turn User (Many-to-One)

The game entity tracks which user's turn it currently is.

- **`Game` $\rightarrow$ `User` (Many-to-One):** A game's `turnUser` column points to a single `User`.
  - _Implementation:_ `Game` has `@ManyToOne(() => User, { nullable: true }) turnUser: User`

## 🤝 Contribution

This project is licensed under the **MIT License**. We welcome contributions, bug reports, and feature suggestions\! Please review the license and submit a Pull Request to contribute.

**License:** [MIT License](https://www.google.com/search?q=LICENSE)
**Author:** Nikolett Bernadett (Copyright 2025)
