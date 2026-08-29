# XENOVA Investment Platform

A modern investment platform built with Expo React Native + TypeScript, featuring real-time portfolio management, stock/fund investments, and GCash/Maya payment integration, with comprehensive admin panel.

## 🚀 Features

### Core Features (User App)
- **Investment Portfolio** - Track stocks, bonds, and funds
- **Real-time Analytics** - Live market data and performance charts
- **Payment Integration** - GCash & Maya deposits and withdrawals
- **Transaction History** - Complete audit trail of all transactions
- **Portfolio Rebalancing** - Smart allocation recommendations
- **Watchlist** - Monitor favorite investments
- **Performance Analytics** - ROI tracking and reports

### Admin Panel Features
- **User Management** - Create, edit, suspend, delete users
- **Investment Management** - Add/edit/remove investment products
- **Transaction Monitoring** - View all deposits, withdrawals, investments
- **Financial Reports** - Revenue, AUM, transaction analytics
- **Payment Gateway Management** - GCash & Maya configuration
- **Compliance & Audits** - Complete transaction logs
- **Customer Support** - User inquiry management
- **System Settings** - Platform configuration
- **Risk Management** - Fraud detection and prevention
- **Commission Management** - Fees and rewards configuration

### Security
- JWT Authentication
- Encrypted payment data
- Two-factor authentication (OTP)
- Secure transaction validation
- Admin role-based access control (RBAC)

### Payment Methods
- **GCash** - Direct bank transfers
- **Maya** - E-wallet deposits/withdrawals
- Balance hold management

## 📱 Tech Stack

### Frontend (Mobile)
- React Native (Expo)
- TypeScript
- Redux for state management
- React Navigation
- Tailwind CSS (NativeWind)

### Admin Dashboard
- Next.js / React
- TypeScript
- Tailwind CSS
- Recharts for analytics
- React Query for data fetching

### Backend
- Node.js + Express
- MongoDB
- JWT Authentication
- Stripe/GCash API Integration
- Socket.io for real-time updates

### Deployment
- Expo EAS Build (Mobile)
- Vercel (Admin Dashboard)
- Railway/Heroku (Backend)

## 📋 Project Structure

```
xenova-investment-platform/
├── mobile/                          # React Native Expo App
│   ├── app/
│   │   ├── screens/
│   │   │   ├── auth/
│   │   │   │   ├── LoginScreen.tsx
│   │   │   │   ├── RegisterScreen.tsx
│   │   │   │   └── OTPVerification.tsx
│   │   │   ├── portfolio/
│   │   │   │   ├── PortfolioOverview.tsx
│   │   │   │   ├── InvestmentDetails.tsx
│   │   │   │   ├── AddInvestment.tsx
│   │   │   │   └── Watchlist.tsx
│   │   │   ├── payments/
│   │   │   │   ├── DepositScreen.tsx
│   │   │   │   ├── WithdrawScreen.tsx
│   │   │   │   ├── PaymentMethod.tsx
│   │   │   │   └── TransactionHistory.tsx
│   │   │   ├── analytics/
│   │   │   │   ├── PerformanceChart.tsx
│   │   │   │   ├── ReportsScreen.tsx
│   │   │   │   └── Analytics.tsx
│   │   │   └── settings/
│   │   │       ├── ProfileSettings.tsx
│   │   │       ├── SecuritySettings.tsx
│   │   │       └── NotificationSettings.tsx
│   │   ├── components/
│   │   ├── navigation/
│   │   ├── store/
│   │   ├── services/
│   │   ├── types/
│   │   └── App.tsx
│   ├── app.json
│   ├── package.json
│   └── tsconfig.json
│
├── admin/                           # Admin Dashboard (Next.js)
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── users/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [id]/page.tsx
│   │   │   │   └── create/page.tsx
│   │   │   ├── investments/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [id]/page.tsx
│   │   │   │   └── create/page.tsx
│   │   │   ├── transactions/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── payments/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── gcash/page.tsx
│   │   │   │   └── maya/page.tsx
│   │   │   ├── analytics/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── revenue/page.tsx
│   │   │   │   └── reports/page.tsx
│   │   │   ├── support/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── settings/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── system/page.tsx
│   │   │   │   ├── fees/page.tsx
│   │   │   │   └── compliance/page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── api/
│   │   │   ├── users/
│   │   │   ├── investments/
│   │   │   ├── transactions/
│   │   │   ├── analytics/
│   │   │   └── settings/
│   │   └── layout.tsx
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Modal.tsx
│   │   ├── users/
│   │   │   ├── UserTable.tsx
│   │   │   └── UserForm.tsx
│   │   ├── investments/
│   │   │   ├── InvestmentTable.tsx
│   │   │   └── InvestmentForm.tsx
│   │   ├── transactions/
│   │   │   ├── TransactionTable.tsx
│   │   │   └── TransactionFilter.tsx
│   │   ├── analytics/
│   │   │   ├── RevenueChart.tsx
│   │   │   ├── AUMChart.tsx
│   │   │   └── StatsCard.tsx
│   │   └── charts/
│   │       ├── LineChart.tsx
│   │       ├── BarChart.tsx
│   │       └── PieChart.tsx
│   ├── lib/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── utils.ts
│   ├── middleware.ts
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                         # Node.js Express API
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── users.routes.ts
│   │   │   ├── investments.routes.ts
│   │   │   ├── transactions.routes.ts
│   │   │   ├── payments.routes.ts
│   │   │   ├── analytics.routes.ts
│   │   │   ├── admin.routes.ts
│   │   │   └── support.routes.ts
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── userController.ts
│   │   │   ├── investmentController.ts
│   │   │   ├── transactionController.ts
│   │   │   ├── paymentController.ts
│   │   │   ├── analyticsController.ts
│   │   │   ├── adminController.ts
│   │   │   └── supportController.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Investment.ts
│   │   │   ├── Transaction.ts
│   │   │   ├── Payment.ts
│   │   │   ├── Portfolio.ts
│   │   │   └── Audit.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   ├── rbac.ts
│   │   │   ├── validation.ts
│   │   │   └── errorHandler.ts
│   │   ├── services/
│   │   │   ├── authService.ts
│   │   │   ├── gcashService.ts
│   │   │   ├── mayaService.ts
│   │   │   ├── investmentService.ts
│   │   │   ├── analyticsService.ts
│   │   │   └── notificationService.ts
│   │   ├── utils/
│   │   │   ├── encryption.ts
│   │   │   ├── validators.ts
│   │   │   └── helpers.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── config/
│   │   │   └── database.ts
│   │   └── index.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
└── docs/
    ├── API.md
    ├── ADMIN_GUIDE.md
    ├── SETUP.md
    └── DEPLOYMENT.md
```

## 🔧 Installation

### Prerequisites
- Node.js 18+
- MongoDB
- GCash & Maya API credentials
- Expo CLI (for mobile)

### Setup Mobile App

```bash
cd mobile
npm install
expo start
```

### Setup Admin Dashboard

```bash
cd admin
npm install
npm run dev
# Open http://localhost:3000
```

### Setup Backend

```bash
cd backend
npm install
cp .env.example .env
# Configure environment variables
npm run dev
```

## 💰 Payment Integration

### GCash
- Deposit via bank transfer
- Instant withdrawal
- Real-time status
- Admin monitoring

### Maya
- E-wallet deposits
- Quick payouts
- Verified transactions
- Payment tracking

## 📊 Admin Dashboard Features

### Dashboard Overview
- Total users, AUM, revenue
- Active transactions
- System health status
- Recent activity feed

### User Management
- View all users with status
- Create new admin/user accounts
- Edit user information
- Suspend/activate accounts
- View user activity logs

### Investment Management
- Add new investment products
- Edit investment details
- Set pricing and fees
- Manage investment categories
- View popularity metrics

### Transaction Monitoring
- Real-time transaction feed
- Filter by type, status, date
- Approve/reject pending transactions
- View transaction details
- Export reports

### Payment Gateway
- GCash configuration and monitoring
- Maya configuration and monitoring
- Fee structure management
- Payment method status
- Settlement tracking

### Analytics & Reports
- Revenue dashboard
- AUM tracking
- User growth metrics
- Investment performance
- Transaction volume analysis
- Custom date range reports
- Export to PDF/Excel

### Support System
- Customer inquiries management
- Response tracking
- Ticket history
- Auto-escalation rules

### Settings
- System configuration
- Fee structure
- Commission rates
- Security policies
- Notification settings
- API key management

## 🔐 Security Features

- Password encryption (bcrypt)
- JWT token management
- Rate limiting
- CORS protection
- Input validation
- Admin audit logs
- Two-factor authentication
- Role-based access control
- Transaction verification

## 📈 Admin API Endpoints

### Users
- `GET /api/admin/users` - List all users
- `POST /api/admin/users` - Create user
- `PUT /api/admin/users/:id` - Edit user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/users/:id/activity` - User activity log

### Investments
- `GET /api/admin/investments` - List investments
- `POST /api/admin/investments` - Create investment
- `PUT /api/admin/investments/:id` - Edit investment
- `DELETE /api/admin/investments/:id` - Delete investment

### Transactions
- `GET /api/admin/transactions` - List transactions
- `GET /api/admin/transactions/:id` - Transaction details
- `PUT /api/admin/transactions/:id/approve` - Approve transaction
- `PUT /api/admin/transactions/:id/reject` - Reject transaction

### Analytics
- `GET /api/admin/analytics/revenue` - Revenue data
- `GET /api/admin/analytics/aum` - AUM metrics
- `GET /api/admin/analytics/users` - User growth
- `GET /api/admin/analytics/transactions` - Transaction metrics

### Payments
- `GET /api/admin/payments/gcash` - GCash stats
- `GET /api/admin/payments/maya` - Maya stats
- `GET /api/admin/payments/settlements` - Settlement history

---

**Investment Platform with Admin Panel Ready! 🚀📈**
