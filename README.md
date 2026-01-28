# Job Listing Portal (MERN Stack)

A comprehensive Job Portal application built with MongoDB, Express, React, and Node.js.

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (Running locally or MongoDB Atlas)

### 💻 Local Development

#### 1. Backend Setup
```bash
cd server
npm install
npm run dev
```
*Port: http://localhost:4000*

#### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```
*Port: http://localhost:5173*

## 🛡️ Role-Based Access Control

- **Job Seeker**: Browse jobs, apply for positions, manage profile.
- **Employer**: Post new jobs (requires profile), manage applications, dashboard.

## ✅ Recent Fixes (Jan 2026)
- **Author Correction**: All commits reattributed to `deepu325`.
- **Employer Access**: Fixed authorization middleware and added frontend route guards.
- **SPA Navigation**: Integrated React Router for faster, smoother dashboard interactions.
- **Profile Verification**: Employers are now prompted to complete their profile before posting jobs.

## 📝 Configuration
Ensure `.env` files are configured in both `client` and `server` directories for production deployment.
- `server/.env`: `MONGO_URI`, `JWT_SECRET`, `PORT`
- `client/.env`: `VITE_API_URL`