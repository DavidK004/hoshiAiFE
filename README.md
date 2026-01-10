
# Hoshi AI – Frontend

Frontend application for the **Hoshi AI**, a web platform for creating, managing, and solving knowledge tests with support for AI-generated questions and answers.

This repository contains **only the frontend (client-side)** part of the project.

---

## Tech Stack

- **React** (with TypeScript)
- **Vite**
- **Material UI (MUI)** – UI components and tables
- **React Router**
- **TanStack React Query**
- **Axios**
- **React QR Code**

---

## Features

### Public (Guest)

- View general information about the platform
- View tests, questions and categories
- Register an account

### Registered User

- Browse available tests
- Solve tests by category and difficulty
- View your test results and statistics
- Review your correct/incorrect answers
- View personal test history and progress

### Question/Test Creator

- Create tests manually
- Add, update, and delete questions
- Manage answers (text or multiple-choice)
- Use **AI assistance** for generating questions
- Generate **QR codes** for tests

### Administrator

- Manage users and creators
- Enable/disable user accounts
- Manage tests, questions, and categories
- View system activity and statistics

---

## Responsive Design

- Fully responsive UI
- Optimized for desktop and mobile devices
- Built using **Material UI** responsive components

---

## API Integration

The frontend communicates with a REST API that provides:

- JSON-based request/response format
- CRUD operations for:
  - Tests
  - Questions
  - Categories
  - Users
- Proper HTTP status codes and error handling
- Swagger API documentation (backend)

---



## Installation & Running the Project

### Prerequisites

- Node.js (v18 or newer recommended)
- npm
- Running backend API (see backend repository)

### Steps

1. Clone the repository



2. Install dependencies

```bash
npm install
```


3. Configure environment variables
   Create an .env file in the project root

```bash
VITE_API_BASE_URL=BE_URL
```


4. Start the development server

```bash
npm run dev
```


5. Open the application
   Vite will give the link to the locally ran app



## Project Structure

```text
├── public/              # Static assets
├── src/
│   ├── api/              # API calls (Axios)
│   ├── components/       # Reusable UI components
│   ├── context/          # Global state (Auth, user)
│   ├── hooks/            # Custom hooks & React Query
│   ├── layouts/          # Page layouts
│   ├── pages/            # Application pages
│   ├── router/           # Route definitions
│   ├── utils/            # Helper functions
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── vite.config.ts
└── README.md
```
