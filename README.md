# 🔐 React + Node.js Multi-Factor Authentication (MFA) System

> **Secure. Scalable. Modern.**  
> A full-stack MFA implementation using React, Node.js, Express, and TOTP (Time-Based One-Time Password) with QR code provisioning — perfect for enterprise-grade authentication flows.

---

## 🌟 Overview

This project demonstrates a production-ready **Multi-Factor Authentication (MFA)** system built with:

- **Frontend**: React (TypeScript, Vite, Tailwind CSS)
- **Backend**: Node.js + Express (REST API)
- **Auth Protocol**: TOTP (RFC 6238) via `speakeasy` and `qrcode`
- **Storage**: In-memory (easily swappable for Redis/PostgreSQL)
- **Security**: Rate limiting, input sanitization, JWT session tokens

Ideal for recruiters evaluating your **full-stack security implementation skills**, this repo showcases clean architecture, testing, documentation, and modern tooling.

---

## 🚀 Features

✅ User registration with TOTP setup via QR code  
✅ Secure login requiring TOTP code  
✅ Session management with JWT  
✅ Rate limiting to prevent brute force  
✅ Responsive UI with loading states & error handling  
✅ TypeScript end-to-end  
✅ Environment configuration (`.env`)  
✅ Docker-ready (optional)  
✅ CI/CD ready (GitHub Actions template included)

---

## 📊 Architecture Diagram

```mermaid
graph TD
    A[React Frontend] -->|HTTP Requests| B[Node.js/Express API]
    B --> C[User Service]
    C --> D[(In-Memory Store)]
    B --> E[TOTP Service]
    E --> F[Speakeasy Library]
    F --> G[Generate Secret & QR]
    E --> H[Verify TOTP Token]
    B --> I[JWT Service]
    I --> J[Issue/Validate Tokens]
    A -->|Display| K[QR Code via qrcode.react]
    A -->|Input| L[6-Digit TOTP Code]
```

---

## 🧩 Tech Stack

| Layer        | Technology             |
|--------------|------------------------|
| Frontend     | React + TypeScript, Vite, Tailwind CSS, `qrcode.react` |
| Backend      | Node.js, Express, `speakeasy`, `jsonwebtoken`, `bcrypt` |
| DevOps       | Nodemon, Concurrently, ESLint, Prettier |
| Testing      | Jest, React Testing Library (optional setup) |
| Deployment   | Docker, Render / Railway / Heroku ready |

---

## 🛠️ Setup & Installation

### Prerequisites

- Node.js ≥ v18
- npm or yarn
- Git

### Clone & Install

```bash
git clone https://github.com/bungydotgit/react-node-mfa.git
cd react-node-mfa

# Install backend dependencies
cd server && npm install

# Install frontend dependencies
cd ../client && npm install
```

### Environment Variables

Create `.env` in `/server`:

```env
PORT=5000
JWT_SECRET=your_jwt_secret_here_32_chars_min
RATE_LIMIT_MAX=5
RATE_LIMIT_WINDOW_MS=15*60*1000
```

### Run Development Server

From root directory:

```bash
npm run dev
```

> Uses `concurrently` to run both client and server with hot-reload.

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

---

## 🧪 Testing the Flow

1. **Register a User**
   - POST `/api/auth/register`
   - Returns: `{ user, qrCodeUrl, secret }`

2. **Scan QR Code**
   - Use Google Authenticator / Authy
   - Save generated secret securely

3. **Login with TOTP**
   - POST `/api/auth/login`
   - Body: `{ email, password, token }`
   - Returns JWT on success

4. **Access Protected Routes**
   - Include `Authorization: Bearer <token>` header

---

## 🧱 Project Structure

```
react-node-mfa/
├── client/
│   ├── src/
│   │   ├── components/     # Reusable UI (QR, Form, Button)
│   │   ├── hooks/          # Custom hooks (useAuth, useLocalStorage)
│   │   ├── pages/          # AuthPage, DashboardPage
│   │   ├── services/       # API calls (authService.ts)
│   │   └── App.tsx
├── server/
│   ├── src/
│   │   ├── controllers/    # Auth logic
│   │   ├── middleware/     # Auth, rate limiting
│   │   ├── routes/         # Express routers
│   │   ├── services/       # TOTP, JWT, User
│   │   └── utils/          # Helpers, types
│   └── .env
├── docker-compose.yml      # Optional Docker setup
└── README.md
```

---

## 🔒 Security Best Practices Implemented

- ✅ **TOTP Secrets** never exposed to client post-setup
- ✅ **Rate limiting** on auth endpoints
- ✅ **Input validation & sanitization**
- ✅ **JWT expiration** (15min access, 7d refresh)
- ✅ **HTTPS-ready** (add SSL in prod)
- ✅ **CORS** configured for frontend origin only
- ✅ **Secrets** managed via `.env`


---

> ⭐ **Star this repo if you found it useful!**  
> It helps others discover solid full-stack security examples.
