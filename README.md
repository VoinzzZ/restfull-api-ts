# 🚀 RESTful API — Express + TypeScript

A RESTful API for **User Management** built with **Express.js**, **TypeScript**, and **MySQL** following **Clean Architecture** principles.

## 🏗️ Architecture

```
src/
├── domain/              # Business entities, repository interfaces, custom errors
├── application/         # Use cases (business logic) and DTOs
├── infrastructure/      # Database connection and repository implementations
└── interfaces/          # Controllers, routes, and middlewares (HTTP layer)
```

Each layer only depends on the layer **below it** — keeping business logic independent from frameworks and databases.

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| Express.js | HTTP framework |
| TypeScript | Type safety |
| MySQL + mysql2 | Database & query driver |
| Zod | Request validation |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT authentication |
| ts-node-dev | Dev server with hot reload |

## ⚙️ Prerequisites

- Node.js >= 18
- MySQL >= 8.0
- npm >= 9

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/restfull-api-ts.git
cd restfull-api-ts
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

### 4. Create the database table

Run this SQL in your MySQL client:

```sql
CREATE TABLE users (
  id         INT          NOT NULL AUTO_INCREMENT,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(100) NOT NULL,
  password   VARCHAR(255) NOT NULL,
  created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### 5. Start the development server

```bash
npm run dev
```

Server will start at `http://localhost:3000`

## 📋 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run compiled production build |

## 🔌 API Endpoints

Base URL: `http://localhost:3000/api`

### Users

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/users` | Create a new user | — |
| `GET` | `/users` | Get all users | — |
| `GET` | `/users/:id` | Get user by ID | — |
| `PUT` | `/users/:id` | Update user | — |
| `DELETE` | `/users/:id` | Delete user | — |

### Request & Response Examples

#### POST `/api/users`

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

**Response `201`:**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

#### GET `/api/users`

**Response `200`:**
```json
{
  "status": "success",
  "data": [...]
}
```

#### PUT `/api/users/:id`

**Request body** (all fields optional):
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "newpassword123"
}
```

#### Error Response

```json
{
  "status": "error",
  "message": "User not found"
}
```

#### Validation Error Response

```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Invalid email format" }
  ]
}
```

## 🏛️ Layer Responsibilities

| Layer | Folder | Responsibility |
|---|---|---|
| **Domain** | `src/domain/` | Entities, repository interfaces, business errors |
| **Application** | `src/application/` | Use cases orchestrating business logic |
| **Infrastructure** | `src/infrastructure/` | MySQL queries, database connection |
| **Interface** | `src/interfaces/` | HTTP controllers, routes, Express middlewares |

## 📁 Project Structure

```
src/
├── domain/
│   ├── entities/User.ts
│   ├── repositories/IUserRepository.ts
│   └── errors/AppError.ts
├── application/
│   ├── dtos/UserDTO.ts
│   └── use-cases/
│       ├── CreateUserUseCase.ts
│       ├── GetAllUsersUseCase.ts
│       ├── GetUserByIdUseCase.ts
│       ├── UpdateUserUseCase.ts
│       └── DeleteUserUseCase.ts
├── infrastructure/
│   ├── database/connection.ts
│   └── repositories/MysqlUserRepository.ts
├── interfaces/
│   ├── controllers/UserController.ts
│   ├── routes/user.routes.ts
│   └── middlewares/
│       ├── errorHandler.ts
│       └── validate.ts
├── app.ts
└── server.ts
```

## 📄 License

MIT
