# RegalMart E-commerce Platform

A modern full-stack e-commerce application built with React, TypeScript, Express, and MongoDB. RegalMart provides a complete online shopping experience with user authentication, shopping cart functionality, order management, and PayPal payment integration.

## 🚀 Features

### Frontend Features
- **Product Catalog**: Browse and search products with detailed views
- **Shopping Cart**: Add, remove, and manage cart items with persistent storage 
- **User Authentication**: Secure login and registration system
- **Checkout Process**: Multi-step checkout with shipping and payment 
- **Order Management**: View order history and track order status
- **PayPal Integration**: Secure payment processing
- **Dark/Light Theme**: Toggle between themes with persistence 
- **Responsive Design**: Bootstrap-based responsive UI

### Backend Features
- **RESTful API**: Express.js backend with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based user authentication
- **Order Processing**: Complete order lifecycle management
- **Sample Data**: Pre-populated products and users for development

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling and development server
- **React Router** for navigation
- **TanStack Query** for server state management
- **React Bootstrap** for UI components
- **PayPal React SDK** for payment processing
- **Axios** for HTTP requests

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcrypt** for password hashing
- **CORS** for cross-origin requests

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Clone Repository
```bash
git clone https://github.com/Mhmdyasser33/e-commerce.git
cd e-commerce
```

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/regalmart
JWT_SECRET=your_jwt_secret_here
PAYPAL_CLIENT_ID=your_paypal_client_id
```

Start the backend server:
```bash
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
```

Start the development server: [9](#0-8) 
```bash
npm run dev
```

## 🏗 Project Structure

```
e-commerce/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── context/         # React Context for state management
│   │   ├── types/           # TypeScript type definitions
│   │   └── App.tsx          # Main application component
│   └── package.json         # Frontend dependencies
├── backend/                 # Express backend application
│   ├── src/
│   │   ├── routes/          # API route handlers
│   │   ├── models/          # Database models
│   │   ├── config/          # Configuration files
│   │   ├── data.ts          # Sample data for development
│   │   └── index.ts         # Server entry point
│   └── package.json         # Backend dependencies
└── README.md
```

## 🔧 Development

### Available Scripts

#### Frontend [10](#0-9) 
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

#### Backend [11](#0-10) 
- `npm start` - Start development server with nodemon
- `npm run build` - Compile TypeScript
- `npm test` - Run tests

### Sample Data
The application includes sample data for development: [12](#0-11) 
- **Admin User**: admin@example.com / 0100010
- **Regular User**: user@example.com / 123456
- **Sample Products**: 4 products across different categories

## 🌐 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:slug` - Get product by slug

### Users
- `POST /api/users/signin` - User login
- `POST /api/users/signup` - User registration

### Orders
- `POST /api/orders` - Create new order [13](#0-12) 
- `GET /api/orders/:id` - Get order details [14](#0-13) 
- `GET /api/orders/history` - Get user order history [15](#0-14) 
- `PUT /api/order/:id/pay` - Process payment [16](#0-15) 

## 🎨 Features in Detail

### State Management
The application uses React Context for global state management: [17](#0-16) 
- User authentication state
- Shopping cart persistence
- Theme preferences
- Order data

### Payment Integration
PayPal integration provides secure payment processing: [18](#0-17) 
- Real PayPal payments
- Test payment functionality
- Order status updates

### Responsive Design
Bootstrap-based responsive design ensures compatibility across devices: [19](#0-18) 

## 🚀 Deployment

### Production Build
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm run build
```

### Environment Variables
Ensure all environment variables are properly configured for production deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Mohamed Yasser** - [Mhmdyasser33](https://github.com/Mhmdyasser33)
