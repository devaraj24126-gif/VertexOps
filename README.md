<div align="center">

# 🚀 VertexOps

### Enterprise IT Ticket Management System

A production-ready full-stack IT Ticket Management System built with **React**, **FastAPI**, **SQLAlchemy**, **PostgreSQL**, and **Oracle Database**, featuring secure JWT authentication, role-based access control, and cloud deployment.

<p>

![React](https://img.shields.io/badge/Frontend-React%2019-61DAFB?logo=react)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.13-3776AB?logo=python)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169E1?logo=postgresql)
![Oracle](https://img.shields.io/badge/Oracle-Supported-F80000?logo=oracle)
![SQLAlchemy](https://img.shields.io/badge/ORM-SQLAlchemy-D71F00)
![JWT](https://img.shields.io/badge/Auth-JWT-black)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render)
![License](https://img.shields.io/badge/License-MIT-green)

</p>

### 🌐 Live Application

**Frontend**

https://vertex-ops-gray.vercel.app/

**Backend API**

https://vertexops-api.onrender.com

**Swagger API**

https://vertexops-api.onrender.com/docs

</div>

---

# 📖 Overview

VertexOps is a modern Enterprise IT Ticket Management System designed to simulate how technical support teams operate inside organizations.

The application enables employees to raise IT support requests while providing administrators with complete control over user management, ticket assignment, workflow tracking, and support operations.

Unlike a basic CRUD project, VertexOps demonstrates real-world software engineering concepts including secure authentication, role-based authorization, RESTful APIs, cloud deployment, multiple database support, and scalable application architecture.

The backend has been designed to work with both **Oracle Database** for enterprise-style local development and **PostgreSQL** for cloud deployment without requiring changes to the application logic.

---

# ✨ Key Features

## 🔐 Authentication & Security

- Secure JWT Authentication
- Password Hashing
- Protected API Routes
- Role-Based Authorization
- Token Validation
- Secure Login System

---

## 👥 User Management

- Administrator Accounts
- Employee Accounts
- Create Users
- Manage Users
- Active / Inactive Users
- Role Assignment

---

## 🎫 Ticket Management

- Create Support Tickets
- View Tickets
- Update Ticket Status
- Assign Tickets
- Ticket Categories
- Priority Levels
- Ticket Tracking
- Complete Ticket Lifecycle

---

## 📊 Dashboard

- Ticket Statistics
- Open Tickets
- Closed Tickets
- Pending Tickets
- User Overview
- Real-Time Database Integration

---

## 🗄 Database Support

VertexOps supports two enterprise databases.

### Oracle Database

Used during local development.

Features

- Oracle XE
- Enterprise SQL
- Local Development
- Oracle SQL Practice

### PostgreSQL

Used for cloud deployment.

Features

- Neon PostgreSQL
- Production Ready
- Cloud Database
- Render Deployment

The backend automatically selects the appropriate database based on environment configuration.

---

# 🏗 System Architecture

```text
                     React Frontend
                        (Vercel)
                             │
                             │ REST API
                             ▼
                   FastAPI Backend
                        (Render)
                             │
                     SQLAlchemy ORM
                             │
        ┌────────────────────┴────────────────────┐
        │                                         │
 Oracle Database XE                    Neon PostgreSQL
(Local Development)                  (Cloud Deployment)
```

---

# ⚙ Technology Stack

## Frontend

- React 19
- Vite
- React Router
- Axios
- CSS3
- React Icons
- Framer Motion

---

## Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- Passlib
- JWT Authentication

---

## Database

- Oracle Database XE
- PostgreSQL (Neon)

---

## Cloud & Deployment

- Vercel
- Render
- Neon PostgreSQL

---

## Development Tools

- Git
- GitHub
- VS Code
- Swagger UI

---

# 📂 Project Structure

```text
VertexOps
│
├── backend
│   ├── app
│   │
│   ├── api
│   │     ├── auth.py
│   │     ├── users.py
│   │     ├── tickets.py
│   │     └── dashboard.py
│   │
│   ├── core
│   ├── database
│   ├── models
│   ├── schemas
│   ├── security
│   └── main.py
│
│   requirements.txt
│
├── frontend
│
│   ├── public
│   ├── src
│   │
│   ├── components
│   ├── pages
│   ├── api
│   ├── assets
│   └── App.jsx
│
│   package.json
│
└── README.md
```

---

# 🔄 Application Workflow

```text
User Login
      │
      ▼
JWT Authentication
      │
      ▼
Role Validation
      │
      ▼
Dashboard
      │
      ▼
Create Ticket
      │
      ▼
Database
      │
      ▼
Administrator
      │
      ▼
Assign Ticket
      │
      ▼
Update Status
      │
      ▼
Resolved
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/devaraj24126-gif/VertexOps.git
```

```bash
cd VertexOps
```

---

## Backend

```bash
cd backend
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run backend

```bash
uvicorn app.main:app --reload
```

---

## Frontend

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run frontend

```bash
npm run dev
```

---

# 🌍 Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | Neon PostgreSQL |
| Local Database | Oracle XE |

---

# 🔑 Environment Variables

Create a `.env` file inside the backend directory.

Required variables

```env
DATABASE_URL=

DB_HOST=
DB_PORT=
DB_SERVICE=
DB_USERNAME=
DB_PASSWORD=

SECRET_KEY=
ALGORITHM=
ACCESS_TOKEN_EXPIRE_MINUTES=
```

Example configuration is available in

```
backend/.env.example
```

---

# 📡 REST API

| Method | Endpoint | Description |
|----------|----------------|----------------------------|
| POST | /login | User Authentication |
| POST | /register | Create User |
| GET | /users | List Users |
| GET | /tickets | List Tickets |
| POST | /tickets | Create Ticket |
| PUT | /tickets/{id} | Update Ticket |
| GET | /dashboard | Dashboard Statistics |
| GET | /health | Health Check |

Swagger Documentation

```
/docs
```

---

# 📷 Screenshots

Add screenshots here

- Login Page

- Dashboard

- User Management

- Ticket Management

- Swagger Documentation

---

# 🎯 Skills Demonstrated

This project demonstrates practical experience with:

- Full Stack Development
- React Development
- FastAPI
- REST API Design
- JWT Authentication
- Role-Based Access Control
- SQLAlchemy ORM
- Oracle Database
- PostgreSQL
- Cloud Deployment
- Environment Configuration
- Git & GitHub
- API Integration
- Responsive UI Design
- Production Deployment

---

# 🔮 Future Enhancements

- Email Notifications
- File Attachments
- Search & Filters
- Ticket Comments
- Analytics Dashboard
- Docker Support
- Kubernetes Deployment
- CI/CD using GitHub Actions
- Audit Logs
- AI-powered Ticket Classification

---

# 👨‍💻 Developer

## Devaraj P

GitHub

https://github.com/devaraj24126-gif

LinkedIn

https://www.linkedin.com/in/deva-p-883651329/

---

<div align="center">

### ⭐ If you found this project useful, consider giving it a star.

Built with ❤️ using React, FastAPI, SQLAlchemy, Oracle & PostgreSQL.

</div>
