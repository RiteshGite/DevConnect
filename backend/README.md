# 🚀 DevConnect - Backend API Documentation

A modern, feature-rich backend for a developer networking platform built with **Node.js**, **Express**, **MongoDB**, and **Socket.IO**.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Key Features](#-key-features)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Socket.IO Events](#-socketio-events)
- [Database Models](#-database-models)
- [Middleware](#-middleware)
- [Authentication System](#-authentication-system)
- [Payment Integration](#-payment-integration)
- [Error Handling](#-error-handling)
- [Author](#-author)

---

## 🎯 Overview

**DevConnect Backend** powers a professional developer networking platform where developers can connect, chat, and collaborate. The backend handles authentication, real-time messaging, smart matching algorithms, payment processing, and AI-powered assistance.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime Environment |
| **Express.js** | Web Framework |
| **MongoDB** | Database |
| **Mongoose** | ODM (Object Data Modeling) |
| **Socket.IO** | Real-time Communication |
| **JWT** | Authentication |
| **Bcrypt** | Password Hashing |
| **Stripe** | Payment Gateway |
| **Google Gemini AI** | AI Chatbot |
| **Validator.js** | Data Validation |
| **Cookie-Parser** | Cookie Management |
| **CORS** | Cross-Origin Resource Sharing |

---

## ✨ Key Features

### **Authentication & Security**
- ✅ JWT-based authentication with HTTP-only cookies
- ✅ Secure password hashing with bcrypt (10 rounds)
- ✅ Protected routes with middleware validation
- ✅ CORS-enabled for secure cross-origin requests

### **User Management**
- ✅ User registration and login
- ✅ Profile management (view, edit, password change)
- ✅ Skill-based smart matching with Jaccard similarity algorithm
- ✅ Advanced user search with pagination

### **Connection System**
- ✅ Send connection requests (interested/ignored)
- ✅ Review requests (accept/reject)
- ✅ View received requests and accepted connections
- ✅ Prevent duplicate and self-connection requests

### **Real-time Chat**
- ✅ Socket.IO-powered instant messaging
- ✅ Multi-tab online status tracking
- ✅ Connection-verified chat rooms
- ✅ Message history persistence

### **Membership & Payments**
- ✅ Stripe checkout integration
- ✅ Silver & Gold membership plans
- ✅ Webhook-based payment confirmation
- ✅ Automatic membership activation and expiry tracking
- ✅ Stackable membership durations

### **Smart Feed System**
- ✅ Priority-based feed (Gold → Silver → Normal users)
- ✅ Pagination support (up to 50 users per page)
- ✅ Exclude already connected/requested users
- ✅ MongoDB aggregation pipeline for efficient querying

### **AI Integration**
- ✅ Google Gemini AI-powered chatbot
- ✅ Context-aware responses about DevConnect features
- ✅ Input validation and rate limiting

---

## 📂 Project Structure

```
backend/
├── 📁 config/
│   ├── db.js                      # MongoDB connection setup
│   └── stripe.js                  # Stripe configuration
│
├── 📁 middlewares/
│   ├── auth.js                    # JWT authentication middleware
│   ├── socketAuth.js              # Socket.IO authentication
│   └── errorHandler.js            # Global error handler
│
├── 📁 models/
│   ├── user.js                    # User schema with methods
│   ├── connectionRequest.js       # Connection request schema
│   ├── chat.js                    # Chat & message schema
│   └── payment.js                 # Payment transaction schema
│
├── 📁 router/
│   ├── auth.js                    # Authentication routes
│   ├── profile.js                 # Profile management routes
│   ├── request.js                 # Connection request routes
│   ├── user.js                    # User feed & search routes
│   ├── chat.js                    # Chat history routes
│   ├── payment.js                 # Payment checkout routes
│   ├── paymentWebhookHandler.js   # Stripe webhook handler
│   └── ai.js                      # AI chatbot routes
│
├── 📁 utils/
│   ├── constants.js               # Application constants
│   ├── validation.js              # Input validation functions
│   ├── socket.js                  # Socket.IO initialization
│   └── geminiService.js           # Google Gemini AI service
│
├── app.js                         # Express app configuration
├── .env                           # Environment variables
├── package.json                   # Dependencies
└── README.md                      # Documentation
```

---

## 🚀 Installation & Setup

### **Prerequisites**
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- Stripe account (for payments)
- Google Gemini API key (for AI chatbot)

### **Step 1: Clone Repository**
```bash
git clone <repository-url>
cd backend
```

### **Step 2: Install Dependencies**
```bash
npm install
```

### **Step 3: Configure Environment Variables**
Create a `.env` file in the root directory (see [Environment Variables](#-environment-variables))

### **Step 4: Start the Server**

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

The server will run on: `http://localhost:7777`

---

## 🔑 Environment Variables

Create a `.env` file with the following configuration:

```env
# Database Configuration
MONGO_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET_KEY=your_jwt_secret_key

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Frontend URL (CORS)
FRONTEND_URL=http://localhost:5173

# Server Configuration
PORT=7777
NODE_ENV=development
```

⚠️ **Security Note:** Never commit `.env` file to version control. Add it to `.gitignore`.

---

## 📡 API Documentation

### **🔐 Authentication Routes (`/`)**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/signup` | Register a new user | ❌ |
| `POST` | `/login` | Login user and issue JWT token | ❌ |
| `POST` | `/logout` | Logout user (clear cookie) | ❌ |

#### **POST /signup**
**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "emailId": "john@example.com",
  "password": "StrongPass@123",
  "age": 25,
  "gender": "male",
  "photoUrl": "https://example.com/photo.jpg",
  "about": "Full-stack developer passionate about web technologies",
  "skills": ["JavaScript", "React", "Node.js", "MongoDB"]
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Registration Successful",
  "user": { /* user object */ }
}
```

#### **POST /login**
**Request Body:**
```json
{
  "emailId": "john@example.com",
  "password": "StrongPass@123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login Successful",
  "user": { /* user object */ }
}
```

---

### **👤 Profile Routes (`/profile`)**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/profile/view` | View logged-in user profile | ✅ |
| `PATCH` | `/profile/edit` | Edit profile fields | ✅ |
| `PATCH` | `/profile/password` | Change password | ✅ |
| `GET` | `/profile/targetUser/:id` | Get public profile of another user | ✅ |

**Editable Fields:**
- `firstName`, `lastName`, `age`, `gender`
- `about`, `photoUrl`, `skills`

#### **PATCH /profile/edit**
**Request Body:**
```json
{
  "firstName": "John",
  "about": "Updated bio",
  "skills": ["JavaScript", "TypeScript", "React"]
}
```

---

### **🤝 Connection Request Routes (`/request`)**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/request/send/:status/:toUserId` | Send connection request | ✅ |
| `POST` | `/request/review/:status/:requestId` | Review connection request | ✅ |

**Status Values:**
- **Send:** `interested`, `ignored`
- **Review:** `accepted`, `rejected`

#### **POST /request/send/interested/:toUserId**
**Response (201):**
```json
{
  "success": true,
  "message": "John interested in Jane's profile",
  "data": { /* request object */ }
}
```

---

### **👥 User & Feed Routes (`/user`, `/feed`)**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/feed?page=1&limit=10` | Get suggested users (priority-based) | ✅ |
| `GET` | `/user/connections` | Get accepted connections | ✅ |
| `GET` | `/user/requests/received` | Get received connection requests | ✅ |
| `GET` | `/user/smart-matches` | Get skill-based matches with scores | ✅ |
| `GET` | `/user/search?query=name&page=1` | Search users by name | ✅ |

#### **Feed Priority System:**
1. **Gold Members** - Highest priority (shown first)
2. **Silver Members** - Medium priority
3. **Normal Users** - Standard priority

**Pagination:**
- Default: `page=1`, `limit=10`
- Maximum limit: `50` users per page

#### **GET /user/smart-matches**
Uses **Jaccard Similarity Algorithm** to calculate skill match percentage.

**Response (200):**
```json
{
  "success": true,
  "totalMatches": 15,
  "matches": [
    {
      "_id": "user_id",
      "firstName": "Jane",
      "lastName": "Smith",
      "matchScore": 85,
      "skills": ["React", "Node.js"],
      /* other user fields */
    }
  ]
}
```

---

### **💬 Chat Routes (`/chat`)**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/chat/:targetUserId` | Fetch chat history with connected user | ✅ |

**Note:** Real-time messaging is handled via Socket.IO events (see [Socket.IO Events](#-socketio-events))

---

### **💳 Payment Routes (`/payment`)**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/payment/create-checkout-session` | Create Stripe checkout session | ✅ |
| `POST` | `/payment/webhook` | Stripe webhook for payment confirmation | ❌ (Webhook) |

#### **Membership Plans:**

| Plan | Price | Duration | Features |
|------|-------|----------|----------|
| **Silver** | ₹499 | 3 months |  Profile priority boost, Silver Highlight, DevConnect Silver badge |
| **Gold** | ₹999 | 6 months | Highest Profile priority, Gold Highlight, DevConnect Gold badge |

#### **POST /payment/create-checkout-session**
**Request Body:**
```json
{
  "planType": "Gold"
}
```

**Response (200):**
```json
{
  "url": "https://checkout.stripe.com/...",
  "savePayment": { /* payment object */ }
}
```

---

### **🧠 AI Chatbot Routes (`/ai`)**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/ai/chat` | Ask DevConnect AI assistant | ❌ |

#### **POST /ai/chat**
**Request Body:**
```json
{
  "message": "What features does DevConnect offer?"
}
```

**Response (200):**
```json
{
  "reply": "DevConnect helps developers connect, chat, and collaborate..."
}
```

**Limitations:**
- Maximum message length: 300 characters
- Responses are limited to DevConnect-related queries

---

## 🔌 Socket.IO Events

### **Client → Server Events**

| Event | Payload | Description |
|-------|---------|-------------|
| `joinChat` | `{ targetUserId: "user_id" }` | Join a private chat room |
| `sendMessage` | `{ targetUserId: "user_id", newMsg: "text" }` | Send a chat message |
| `checkOnlineStatus` | `{ targetUserId: "user_id" }` | Check if a user is online |

### **Server → Client Events**

| Event | Payload | Description |
|-------|---------|-------------|
| `receiveMessage` | `{ senderId: "user_id", message: "text" }` | Receive new message in chat |
| `userStatusChanged` | `{ userId: "user_id", online: true/false }` | User went online/offline |
| `onlineStatus` | `{ userId: "user_id", online: true/false }` | Response to status check |

### **Connection Flow:**
```javascript
// Client-side example
socket.emit('joinChat', { targetUserId: 'abc123' });
socket.emit('sendMessage', { targetUserId: 'abc123', newMsg: 'Hello!' });

socket.on('receiveMessage', (data) => {
  console.log(`${data.senderId}: ${data.message}`);
});
```

---

## 🗄️ Database Models

### **User Model**
```javascript
{
  firstName: String (required, 3-20 chars),
  lastName: String (3-20 chars),
  emailId: String (unique, validated),
  password: String (hashed with bcrypt),
  age: Number (18-150),
  gender: Enum ["male", "female", "other"],
  photoUrl: String (validated URL),
  about: String (max 1000 chars),
  skills: Array of Strings (max 20 skills),
  memberships: {
    Silver: { expiresAt: Date, active: Boolean },
    Gold: { expiresAt: Date, active: Boolean }
  },
  timestamps: true
}
```

**Methods:**
- `getJwt()` - Generate JWT token
- `getHash(password)` - Hash password
- `isPasswordValid(password)` - Verify password

---

### **ConnectionRequest Model**
```javascript
{
  fromUserId: ObjectId (ref: User),
  toUserId: ObjectId (ref: User),
  status: Enum ["interested", "ignored", "accepted", "rejected"],
  timestamps: true
}
```

**Indexes:**
- Compound unique index on `(fromUserId, toUserId)`

**Pre-save Validation:**
- Prevents sending requests to self

---

### **Chat Model**
```javascript
{
  participants: [ObjectId] (2 users),
  messages: [
    {
      senderId: ObjectId (ref: User),
      text: String,
      timestamps: true
    }
  ],
  timestamps: true
}
```

---

### **Payment Model**
```javascript
{
  userId: ObjectId (ref: User),
  paymentId: String,
  orderId: String (required),
  status: String (required),
  amount: Number (required),
  currency: String (required),
  receipt: String,
  notes: {
    firstName: String,
    lastName: String,
    emailId: String,
    membership_type: Object,
    expiryDate: Date
  },
  timestamps: true
}
```

---

## 🛡️ Middleware

### **1. userAuth (JWT Authentication)**
**File:** `middlewares/auth.js`

**Functionality:**
- Validates JWT token from HTTP-only cookie
- Fetches user from database
- Attaches `req.user` to request object
- Returns `401` if token is missing or invalid

---

### **2. socketAuth (Socket.IO Authentication)**
**File:** `middlewares/socketAuth.js`

**Functionality:**
- Parses cookies from WebSocket handshake
- Validates JWT token
- Attaches `socket.user` to socket instance
- Rejects connection if authentication fails

---

### **3. errorHandler (Global Error Handler)**
**File:** `middlewares/errorHandler.js`

**Handles:**
- **Validation Errors** (400) - Mongoose validation failures
- **Duplicate Entries** (400) - MongoDB unique constraint violations
- **Generic Errors** (400) - Catches all other errors

**Response Format:**
```json
{
  "success": false,
  "errors": "Error message"
}
```

---

## 🔐 Authentication System

### **Authentication Flow:**

```
┌─────────────┐
│   Signup    │
└──────┬──────┘
       │
       ▼
┌─────────────────────────┐
│ Password hashed (bcrypt)│
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│   User created in DB    │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│   JWT token generated   │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│ Token stored in HTTP-   │
│    only cookie          │
└─────────────────────────┘
```

### **Cookie Configuration:**
```javascript
{
  httpOnly: true,              // Prevents XSS attacks
  sameSite: "none" (prod),     // Cross-site cookie
  secure: true,                // HTTPS only
  maxAge: 8 hours,             // Token expiry
  path: "/"
}
```

### **Password Requirements:**
- Must be a strong password (enforced by `validator.isStrongPassword`)
- Hashed with bcrypt using 10 salt rounds

---

## 💳 Payment Integration

### **Stripe Payment Flow:**

```
1. User selects membership (Silver/Gold)
   ↓
2. Frontend calls /payment/create-checkout-session
   ↓
3. Backend creates Stripe Checkout session
   ↓
4. User redirected to Stripe payment page
   ↓
5. User completes payment
   ↓
6. Stripe sends webhook to /payment/webhook
   ↓
7. Backend verifies webhook signature
   ↓
8. Payment status updated in DB
   ↓
9. User membership activated
   ↓
10. Expiry date calculated and stored
```

### **Membership Duration Stacking:**
- If user has **active membership**: New purchase extends expiry date
- If user has **expired membership**: New purchase starts from current date
- Multiple purchases stack durations

**Example:**
```
Current date: Jan 1, 2025
Gold expiry: Feb 1, 2025 (active)
User buys Gold again (6 months)
New expiry: Aug 1, 2025
```

### **Webhook Security:**
- Validates webhook signature using `STRIPE_WEBHOOK_SECRET`
- Prevents duplicate processing
- Only processes `checkout.session.completed` events

---

## ⚠️ Error Handling

### **Error Types:**

| Error Type | Status Code | Description |
|------------|-------------|-------------|
| **Validation Error** | 400 | Invalid input data (Mongoose validation) |
| **Duplicate Entry** | 400 | Unique constraint violation |
| **Authentication Error** | 401 | Missing or invalid JWT token |
| **Not Found** | 404 | User or resource not found |
| **Server Error** | 500 | Unexpected server errors |

### **Example Error Response:**
```json
{
  "success": false,
  "errors": "First name must be at least 3 characters"
}
```

---

## 📊 API Summary

| Category | Endpoints | Description |
|----------|-----------|-------------|
| **Authentication** | 3 | Signup, Login, Logout |
| **Profile** | 4 | View, Edit, Password change, View others |
| **Connections** | 2 | Send requests, Review requests |
| **Users** | 5 | Feed, Connections, Requests, Smart matches, Search |
| **Chat** | 1 | Fetch chat history |
| **Payment** | 2 | Checkout session, Webhook handler |
| **AI** | 1 | AI chatbot |
| **Total** | **18** | **Complete REST API** |

---

## 🎯 Core Highlights

✅ **Modular Architecture** - Clean separation of concerns  
✅ **Secure Authentication** - JWT + HTTP-only cookies  
✅ **Real-time Communication** - Socket.IO with multi-tab support  
✅ **Smart Algorithms** - Skill-based matching, Priority feed  
✅ **Payment Integration** - Stripe with webhook automation  
✅ **AI-Powered** - Google Gemini AI assistant  
✅ **Scalable** - MongoDB aggregation, pagination support  
✅ **Production-Ready** - Error handling, CORS, validation  

---

## 👨‍💻 Author

**Ritesh Gite**  
Full Stack Developer | MERN Stack Specialist

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/riteshgite)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/ritesh-gite)

---

## 📄 License

This project is licensed under the MIT License.

---

**⭐ If you found this project helpful, please give it a star!**
