# XENOVA Investment Platform - Complete Setup

## 🎯 Project Overview

XENOVA is a **full-stack investment platform** with:
- 📱 **Mobile App** (React Native + Expo)
- 🎛️ **Admin Dashboard** (Next.js)
- 🔧 **Backend API** (Node.js + Express)
- 🌍 **Weather Dashboard** (Real-time weather data)
- 💰 **Payment Integration** (GCash & Maya)

---

## 📦 Quick Start

### 1. **Mobile App Setup**
```bash
cd app
npm install
echo 'EXPO_PUBLIC_API_URL=http://localhost:3001/api' > .env
echo 'EXPO_PUBLIC_WEATHER_API_KEY=your_openweather_key' >> .env
expo start
```

### 2. **Admin Dashboard Setup**
```bash
cd admin
npm install
echo 'NEXT_PUBLIC_API_URL=http://localhost:3001/api' > .env.local
echo 'NEXT_PUBLIC_WEATHER_API_KEY=your_openweather_key' >> .env.local
npm run dev
# Opens at http://localhost:3000
```

### 3. **Backend Setup**
```bash
cd backend
npm install
echo 'PORT=3001' > .env
echo 'MONGODB_URI=mongodb://localhost:27017/xenova' >> .env
echo 'JWT_SECRET=your_jwt_secret_key' >> .env
echo 'OPENWEATHER_API_KEY=your_openweather_key' >> .env
echo 'GCASH_MERCHANT_ID=your_gcash_id' >> .env
echo 'MAYA_MERCHANT_ID=your_maya_id' >> .env
npm run dev
# Runs on http://localhost:3001
```

---

## 🏗️ Project Structure

```
xenova-prototype/
├── app/                    # React Native Mobile App
│   ├── screens/
│   │   ├── auth/          # Login, Register, OTP
│   │   ├── portfolio/     # Portfolio Overview
│   │   ├── payments/      # Deposit, Withdraw
│   │   └── weather/       # Weather Dashboard
│   ├── services/          # API services
│   ├── store/             # Redux state management
│   └── types/             # TypeScript types
│
├── admin/                  # Next.js Admin Dashboard
│   ├── app/
│   │   ├── (dashboard)/
│   │   │   ├── page.tsx           # Dashboard Home
│   │   │   ├── users/             # User Management
│   │   │   ├── investments/       # Investment Management
│   │   │   ├── transactions/      # Transaction Monitoring
│   │   │   ├── payments/          # Payment Gateway Config
│   │   │   ├── analytics/         # Analytics & Reports
│   │   │   ├── weather/           # Weather Dashboard
│   │   │   └── settings/          # System Settings
│   │   └── (auth)/
│   │       └── login/
│   └── components/        # Reusable components
│
├── backend/                # Node.js Express API
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── payments.routes.ts
│   │   │   ├── portfolio.routes.ts
│   │   │   ├── users.routes.ts
│   │   │   ├── investments.routes.ts
│   │   │   ├── transactions.routes.ts
│   │   │   └── admin.routes.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Investment.ts
│   │   │   ├── Portfolio.ts
│   │   │   ├── Transaction.ts
│   │   │   └── PaymentGateway.ts
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   └── index.ts       # Server entry point
│   └── package.json
│
└── README.md
```

---

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-otp` - Email verification

### Portfolio
- `GET /api/portfolio` - Get user portfolio
- `GET /api/portfolio/investments/available` - List available investments
- `POST /api/portfolio/invest` - Buy investment

### Payments
- `GET /api/payments/methods` - Get payment methods
- `POST /api/payments/deposit` - Initiate deposit
- `POST /api/payments/withdraw` - Initiate withdrawal
- `GET /api/payments/history` - Transaction history

### Weather
- `GET /api/weather/current?city=Manila` - Current weather
- `GET /api/weather/forecast?city=Manila` - Weather forecast

---

## 🌐 Access Points

| Service | URL | Port |
|---------|-----|------|
| Mobile App | Expo | 8081 |
| Admin Dashboard | http://localhost:3000 | 3000 |
| Backend API | http://localhost:3001 | 3001 |
| MongoDB | localhost | 27017 |

---

## 🔧 Environment Variables

### Backend (.env)
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/xenova
JWT_SECRET=your_jwt_secret_key
OPENWEATHER_API_KEY=your_key
GCASH_MERCHANT_ID=your_id
MAYA_MERCHANT_ID=your_id
```

### Admin (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_WEATHER_API_KEY=your_key
```

### Mobile (.env)
```
EXPO_PUBLIC_API_URL=http://localhost:3001/api
EXPO_PUBLIC_WEATHER_API_KEY=your_key
```

---

## 💰 Payment Integration

### GCash
- Real-time deposits
- Instant withdrawals
- Transaction verification

### Maya
- E-wallet integration
- Quick payouts
- Payment tracking

---

## 🎛️ Admin Panel Features

✅ **Dashboard** - Overview stats, charts, quick actions
✅ **User Management** - Create, edit, suspend users
✅ **Investment Management** - Add/edit/remove products
✅ **Transaction Monitoring** - View & approve transactions
✅ **Payment Gateway** - Configure GCash & Maya
✅ **Analytics** - Revenue, AUM, user growth charts
✅ **Weather Dashboard** - Real-time weather monitoring
✅ **Settings** - System configuration

---

## 🚀 Deployment

### Mobile
```bash
cd app
eas build --platform ios
eas build --platform android
```

### Admin Dashboard
```bash
cd admin
npm run build
vercel deploy
```

### Backend
```bash
cd backend
npm run build
# Deploy to Heroku, Railway, or AWS
```

---

## 📊 Tech Stack

### Frontend
- React Native (Expo)
- Next.js
- Tailwind CSS
- Redux
- Recharts

### Backend
- Node.js + Express
- TypeScript
- MongoDB
- JWT Authentication
- Axios

### APIs
- OpenWeatherMap
- GCash Payment Gateway
- Maya Payment Gateway

---

## 🔒 Security

✅ JWT Authentication
✅ Password Encryption (bcryptjs)
✅ OTP Verification
✅ CORS Protection
✅ Input Validation
✅ Rate Limiting
✅ Role-Based Access Control

---

## 📝 License

MIT License - See LICENSE file

---

## 🤝 Support

For issues and feature requests, create an issue on GitHub.

**Happy Building! 🚀📈**
