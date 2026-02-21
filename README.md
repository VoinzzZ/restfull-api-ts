# RESTful API — Express + TypeScript

A robust, maintainable RESTful API for User Management built with Express.js, TypeScript, and MySQL. This project follows Clean Architecture principles to ensure scalability and testability.

## Architecture & Design Patterns

This project adheres to Clean Architecture, decoupling the business logic from external frameworks, databases, and delivery mechanisms.

- **Domain**: Core business entities and repository interfaces. Contains enterprise-wide business rules.
- **Application**: Use cases and Data Transfer Objects (DTOs). Contains application-specific business rules.
- **Infrastructure**: Concrete implementations of repository interfaces (e.g., MySQL connection, database queries).
- **Interfaces**: HTTP delivery layer containing Express controllers, routes, and middleware.

Each layer only depends on the layer strictly below it, keeping business logic independent and highly testable.

## Technology Stack

| Category          | Technologies                                  |
|-------------------|-----------------------------------------------|
| **Core**          | Node.js, Express.js                           |
| **Language**      | TypeScript                                    |
| **Database**      | MySQL, `mysql2` driver                        |
| **Validation**    | Zod                                           |
| **Security**      | `bcryptjs` (password hashing), `jsonwebtoken` |
| **Development**   | `ts-node-dev` (live reload)                   |

## Getting Started

### Prerequisites

Ensure you have the following installed on your local development machine:

- Node.js (v18 or higher)
- npm (v9 or higher)
- MySQL (v8.0 or higher)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/restfull-api-ts.git
   cd restfull-api-ts
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Copy the sample environment file and configure it:

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your local database credentials:

   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=your_database
   JWT_SECRET=your_secret_key
   JWT_EXPIRES_IN=7d
   ```

4. **Initialize the Database**

   Execute the following SQL script in your MySQL client to set up the required table:

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

### Development

Start the development server with live-reloading enabled:

```bash
npm run dev
```

The Express server will start and be available at `http://localhost:3000`.

## Available Scripts

The following scripts are available via `npm run`:

- `npm run dev` — Starts the development server using `ts-node-dev`.
- `npm run build` — Compiles TypeScript source code to JavaScript in the `dist/` directory.
- `npm start` — Runs the compiled application for production (requires building first).

## API Documentation

Base URL: `http://localhost:3000/api`

### Endpoints

| Resource | Method   | Endpoint       | Description                  | Auth Required |
|----------|----------|----------------|------------------------------|---------------|
| Users    | `POST`   | `/users`       | Create a new user            | No            |
| Users    | `GET`    | `/users`       | Retrieve all users           | No            |
| Users    | `GET`    | `/users/:id`   | Retrieve a specific user     | No            |
| Users    | `PUT`    | `/users/:id`   | Update an existing user      | No            |
| Users    | `DELETE` | `/users/:id`   | Delete a user                | No            |

### Example Requests & Responses

#### Create User

**POST** `/api/users`

*Request Body:*

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

*Success Response (201 Created):*

```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

*Validation Error Response (400 Bad Request):*

```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Invalid email format" }
  ]
}
```

## Project Structure

```
src/
├── app.ts                          # Express application setup
├── server.ts                       # Server initialization entry point
├── domain/                         # Enterprise business rules
│   ├── entities/User.ts
│   ├── repositories/IUserRepository.ts
│   └── errors/AppError.ts
├── application/                    # Application use cases
│   ├── dtos/UserDTO.ts
│   └── use-cases/
│       ├── CreateUserUseCase.ts
│       ├── GetAllUsersUseCase.ts
│       ├── GetUserByIdUseCase.ts
│       ├── UpdateUserUseCase.ts
│       └── DeleteUserUseCase.ts
├── infrastructure/                 # External service implementations
│   ├── database/connection.ts
│   └── repositories/MysqlUserRepository.ts
└── interfaces/                     # Delivery mechanisms (HTTP)
    ├── controllers/UserController.ts
    ├── routes/user.routes.ts
    └── middlewares/
        ├── errorHandler.ts
        └── validate.ts
```

## License

This project is licensed under the MIT License.
