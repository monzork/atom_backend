# 🧠 Atom Backend Challenge

Backend project developed for the Atom fullstack technical challenge. Built using **Node.js**, **TypeScript**, **Express**, and **Firebase Cloud Functions**, following a strict **DDD + Clean Architecture** approach.

---

## 🚀 Tech Stack

- Node.js + TypeScript
- Express
- Firebase Functions
- Firestore (NoSQL)
- Jest (unit testing)
- ESLint + Prettier
- Domain-Driven Design (DDD)
- Clean imports using `@/` via TypeScript paths

---

## 📁 Project Structure

```bash
src/
├── application/
│   ├── dtos/
│   │   ├── task/
│   │   └── user/
│   └── use-cases/
│       ├── task/
│       └── user/
├── domain/
│   ├── entities/
│   └── repositories/
├── infrastructure/
│   └── firebase/
│       └── repositories/
├── interfaces/
│   ├── controllers/
│   └── routes/
├── config/
├── index.ts
├── dev.ts
functions.ts
```

---

## 🧱 Architecture Principles

- Separation of concerns: domain, application, infrastructure, interfaces
- Pure domain entities with no external dependencies
- Use cases orchestrate domain logic
- Repository interfaces for easy mocking and swapping DB layers
- Firebase SDK is isolated inside the infrastructure layer

---

## 📡 API Endpoints

### 🔹 Tasks

| Method   | Route                                           | Description                |
|----------|--------------------------------------------------|----------------------------|
| `GET`    | `/api/tasks`                                    | Get all tasks              |
| `POST`   | `/api/tasks`                                    | Create a new task          |
| `PUT`    | `/api/tasks/:id`                                | Update a task by ID        |
| `DELETE` | `/api/tasks/:id`                                | Delete a task by ID        |
| `GET`    | `/api/tasks/paginated?limit=10&after=...`       | Paginated task retrieval   |

### 🔹 Users

| Method | Route                          | Description                          |
|--------|--------------------------------|--------------------------------------|
| `GET`  | `/api/users/:email`           | Find user by email                   |
| `POST` | `/api/users`                  | Create user with email               |
| `POST` | `/api/users/find-or-create`  | Find or create user (idempotent)     |

---

## 🧪 Tests

Unit tests using [Jest](https://jestjs.io/) for use cases:

```bash
npm run test
```

---

## ⚙️ Dev Scripts

```json
"scripts": {
  "dev": "ts-node -r tsconfig-paths/register src/dev.ts",
  "dev:debug": "node --inspect=9229 -r ts-node/register -r tsconfig-paths/register src/dev.ts",
  "build": "tsc",
  "test": "jest",
  "lint": "eslint . --ext .ts",
  "lint:fix": "eslint . --ext .ts --fix",
  "format": "prettier --write "**/*.{ts,js,json,md}""
}
```

---

## 🧪 Requirements to run locally

### ✅ Firebase Service Account Key

To run the backend locally (and allow access to Firestore), you must provide a Firebase Admin SDK credential.

Create a file named:

```bash
ServiceAccountKey.json
```

And place it in the project root.

> You can download this from Firebase Console → Project Settings → Service Accounts → Generate Key

Also, make sure this file is loaded in your local environment, e.g. via:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="./ServiceAccountKey.json"
```

Or set it in your `.env`:

```bash
GOOGLE_APPLICATION_CREDENTIALS=./ServiceAccountKey.json
```

---

## ☁️ Deploying with Firebase

```bash
npm run build
firebase deploy --only functions
```

---

## ✨ Features

- Clean, maintainable architecture
- Fully typed domain and use case layers
- Firestore integration abstracted behind repositories
- Alias-based imports using `@/`
- Jest tests for key use cases
