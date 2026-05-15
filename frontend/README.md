# Mini Service Request Board — GlobalTNA

A full-stack app where homeowners post service requests and tradespeople browse, view, and manage them.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas, Mongoose

## Project Structure

```
/
├── frontend/   Next.js app
└── backend/    Express REST API
```

## Prerequisites

- Node.js 18+
- MongoDB Atlas free account

## Setup

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Paste your MongoDB Atlas connection string into .env
npm run dev
# Runs on http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
# Create frontend/.env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local
npm run dev
# Runs on http://localhost:3000
```

## Environment Variables

**backend/.env**
```
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/globaltna
PORT=5000
```

**frontend/.env.local**
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Seed Data

```bash
cd backend
node seed.js
# Inserts 8 sample jobs across all categories
```

## API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/jobs` | List jobs — supports `?category=` `?status=` `?search=` |
| GET | `/api/jobs/:id` | Get one job |
| POST | `/api/jobs` | Create a job |
| PATCH | `/api/jobs/:id` | Update status only |
| DELETE | `/api/jobs/:id` | Delete a job |

## Live Demo

| | URL |
|---|---|
| Frontend | _Vercel URL_ |
| Backend | _Render URL_ |
