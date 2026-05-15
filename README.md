# Mini Service Request Board — GlobalTNA

A full-stack app where homeowners post service requests and tradespeople browse, view, and manage them.

**Stack:** Next.js 14 · Express · MongoDB Atlas · Tailwind CSS

---

## Project Structure

```
/
├── frontend/   Next.js 14 app (App Router)
└── backend/    Node.js + Express REST API
```

---

## Setup

### Prerequisites

- Node.js 18+
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account

---

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Open .env and fill in your MongoDB Atlas connection string
npm run dev
```

Runs on **http://localhost:5000**

---

### Frontend

```bash
cd frontend
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local
npm run dev
```

Runs on **http://localhost:3000**

---

## Environment Variables

**`backend/.env`**

| Variable    | Description                             |
| ----------- | --------------------------------------- |
| `MONGO_URI` | MongoDB Atlas connection string         |
| `PORT`      | Port for the API server (default: 5000) |

**`frontend/.env.local`**

| Variable              | Description                                                      |
| --------------------- | ---------------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL` | Base URL of the Express backend (default: http://localhost:5000) |

---

## Seed Data

```bash
cd backend
node seed.js
```

Inserts 8 sample jobs across all categories (Plumbing, Electrical, Painting, Joinery).

---

## API

| Method | Endpoint        | Description                                                 |
| ------ | --------------- | ----------------------------------------------------------- |
| GET    | `/api/jobs`     | List all jobs — supports `?category=` `?status=` `?search=` |
| GET    | `/api/jobs/:id` | Get a single job                                            |
| POST   | `/api/jobs`     | Create a job                                                |
| PATCH  | `/api/jobs/:id` | Update status only                                          |
| DELETE | `/api/jobs/:id` | Delete a job                                                |

---
