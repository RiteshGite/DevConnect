# 🎨 DevConnect - Frontend Documentation

A modern, responsive React-based frontend for the DevConnect developer networking platform. Built with cutting-edge technologies for seamless user experience and real-time interactions.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Key Features](#-key-features)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Component Documentation](#-component-documentation)
- [State Management](#-state-management)
- [Routing Structure](#-routing-structure)
- [Socket.IO Integration](#-socketio-integration)
- [Styling Guide](#-styling-guide)
- [Author](#-author)

---

## 🎯 Overview

**DevConnect Frontend** is a feature-rich, responsive web application that enables developers to connect, collaborate, and grow together. The frontend provides an intuitive interface for browsing developer profiles, real-time chatting, smart matching, and membership management

---

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Framework | 18.3+ |
| **Vite** | Build Tool & Dev Server | 5.0+ |
| **React Router DOM** | Client-side Routing | 6.0+ |
| **Redux Toolkit** | State Management | 2.0+ |
| **Axios** | HTTP Client | 1.6+ |
| **Socket.IO Client** | Real-time Communication | 4.6+ |
| **Tailwind CSS** | Utility-first Styling | 3.4+ |
| **DaisyUI** | Component Library | 4.0+ |
| **Lucide React** | Icon Library | Latest |
| **React Hot Toast** | Toast Notifications | 2.4+ |

---

## ✨ Key Features

### **🔐 Authentication & User Management**
- ✅ Secure login and registration
- ✅ Protected routes with automatic redirects
- ✅ Profile creation and editing with live preview
- ✅ Password visibility toggle
- ✅ Form validation with error handling

### **👥 Developer Discovery**
- ✅ Smart feed with membership-based priority (Gold → Silver → Normal)
- ✅ Skill-based smart matching with Jaccard similarity
- ✅ Advanced search with pagination
- ✅ Swipe-style user cards (Interested/Ignore)
- ✅ Real-time feed updates

### **🤝 Connection Management**
- ✅ Send and receive connection requests
- ✅ Accept/reject requests with instant UI updates
- ✅ View all accepted connections
- ✅ Navigate to chat from connections

### **💬 Real-time Chat**
- ✅ Socket.IO-powered instant messaging
- ✅ Multi-tab online status indicators
- ✅ Message history persistence
- ✅ Auto-scroll to latest messages
- ✅ Typing indicators with optimistic UI

### **💳 Membership System**
- ✅ Silver & Gold membership plans
- ✅ Stripe checkout integration
- ✅ Visual membership badges (Crown icons)
- ✅ Days remaining countdown
- ✅ Stackable membership extensions
- ✅ Success/failure payment pages

### **🤖 AI Assistant**
- ✅ Floating AI chatbot powered by Google Gemini
- ✅ Context-aware responses about DevConnect
- ✅ Character limit enforcement (300 chars)
- ✅ Smooth animations and transitions

### **📱 Responsive Design**
- ✅ Mobile-first approach
- ✅ Tablet and desktop optimized
- ✅ Touch-friendly UI elements
- ✅ Adaptive layouts with Tailwind CSS

---

## 📂 Project Structure

```
frontend/
├── 📁 public/
│   ├── DevLogo.png               # App logo
│   └── shark.avif                # Error page image
│
├── 📁 src/
│   ├── 📁 components/
│   │   ├── AIChatbot.jsx         # AI assistant floating chat
│   │   ├── Body.jsx              # Root layout wrapper
│   │   ├── Chat.jsx              # Real-time chat interface
│   │   ├── Connections.jsx       # Accepted connections list
│   │   ├── EditProfile.jsx       # Profile editing form
│   │   ├── Error.jsx             # Error page
│   │   ├── Feed.jsx              # Main user feed
│   │   ├── Footer.jsx            # Footer component
│   │   ├── Landing.jsx           # Landing/home page
│   │   ├── Login.jsx             # Login/signup page
│   │   ├── Membership.jsx        # Membership plans page
│   │   ├── Navbar.jsx            # Navigation bar
│   │   ├── PaymentFail.jsx       # Payment failure page
│   │   ├── PaymentSuccess.jsx    # Payment success page
│   │   ├── Profile.jsx           # User profile view
│   │   ├── ProtectedRoute.jsx    # Auth route guard
│   │   ├── Requests.jsx          # Connection requests page
│   │   ├── Search.jsx            # User search results
│   │   ├── Shimmer.jsx           # Loading skeleton
│   │   ├── SmartMatches.jsx      # Skill-based matches
│   │   └── UserCard.jsx          # Reusable user card
│   │
│   ├── 📁 utils/
│   │   ├── appStore.js           # Redux store configuration
│   │   ├── connections.js        # Connections Redux slice
│   │   ├── constants.js          # App constants (BASE_URL)
│   │   ├── feedSlice.js          # Feed Redux slice
│   │   ├── requests.js           # Requests Redux slice
│   │   ├── socket.js             # Socket.IO connection
│   │   └── userSlice.js          # User Redux slice
│   │
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Global styles
│
├── .env                          # Environment variables
├── .gitignore                    # Git ignore file
├── index.html                    # HTML template
├── package.json                  # Dependencies
├── tailwind.config.js            # Tailwind configuration
├── vite.config.js                # Vite configuration
└── README.md                     # Documentation
```

---

## 🚀 Installation & Setup

### **Prerequisites**
- Node.js (v18 or higher)
- npm or yarn
- Backend server running (see Backend README)

### **Step 1: Clone Repository**
```bash
git clone <repository-url>
cd frontend
```

### **Step 2: Install Dependencies**
```bash
npm install
```

### **Step 3: Configure Environment Variables**
Create a `.env` file in the root directory:
```env
VITE_BACKEND_URL=http://localhost:7777
```

### **Step 4: Start Development Server**
```bash
npm run dev
```

The app will run on: `http://localhost:5173`

### **Step 5: Build for Production**
```bash
npm run build
```

### **Step 6: Preview Production Build**
```bash
npm run preview
```

---

## 🔑 Environment Variables

Create a `.env` file:

```env
# Backend API URL
VITE_BACKEND_URL=http://localhost:7777
```

⚠️ **Note:** Vite requires `VITE_` prefix for environment variables to be accessible in the app.

---

## 🧩 Component Documentation

### **🔐 Authentication Components**

#### **Login.jsx**
**Purpose:** Combined login/signup form with state toggle

**Features:**
- Email and password validation
- Password visibility toggle (Eye/EyeOff icons)
- Error message display
- Automatic redirect after authentication
- Responsive design

**State Management:**
```javascript
const [emailId, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [isSignUpForm, setSignUpForm] = useState(false);
```

---

#### **ProtectedRoute.jsx**
**Purpose:** Prevent authenticated users from accessing login page

**Logic:**
```javascript
if (user) {
  return <Navigate to="/feed" replace />;
}
return <Outlet />;
```

---

### **👤 Profile Components**

#### **Profile.jsx**
**Purpose:** Display and edit user profile

**Features:**
- View current profile information
- Live preview of changes
- Skill management (add/remove)
- Photo URL validation
- AI chatbot integration

---

#### **EditProfile.jsx**
**Purpose:** Form for editing user profile

**Editable Fields:**
- `firstName`, `lastName`
- `age`, `gender`
- `photoUrl`, `about`
- `skills` (array)

**API Call:**
```javascript
axios.patch(
  `${BASE_URL}/profile/edit`,
  { firstName, lastName, age, photoUrl, about, gender, skills },
  { withCredentials: true }
);
```

---

### **🎴 User Discovery Components**

#### **Feed.jsx**
**Purpose:** Main feed showing suggested users

**Features:**
- Priority-based display (Gold > Silver > Normal)
- Shimmer loading effect
- Empty state handling
- Swipe-style card interaction

**Redux Integration:**
```javascript
const feed = useSelector((store) => store.feed);
dispatch(addFeed(res.data?.feed));
```

---

#### **UserCard.jsx**
**Purpose:** Reusable card component for displaying user profiles

**Features:**
- Membership badge display (Gold/Silver crown)
- Dynamic shadow effects based on membership
- Interested/Ignore buttons
- Skills display
- Photo and basic info

**Membership Badge Logic:**
```javascript
const isGold = memberships?.Gold?.active;
const isSilver = memberships?.Silver?.active;
```

---

#### **SmartMatches.jsx**
**Purpose:** Display skill-based matches with similarity scores

**Features:**
- Jaccard similarity algorithm (backend calculates)
- Color-coded match percentages:
  - 🟢 **Green:** 70%+ match
  - 🟡 **Yellow:** 40-69% match
  - 🔴 **Red:** <40% match
- Grid layout with animations
- Lazy loading on button click

**Match Color Function:**
```javascript
const getMatchColor = (score) => {
  if (score >= 70) return "bg-green-500 shadow-green";
  if (score >= 40) return "bg-yellow-400 shadow-yellow";
  return "bg-red-500 shadow-red";
};
```

---

#### **Search.jsx**
**Purpose:** Search users by name with pagination

**Features:**
- Query parameter from URL
- Infinite scroll with "Load More"
- Results deduplication
- Empty state handling

**Pagination Logic:**
```javascript
const [page, setPage] = useState(1);
const [hasMore, setHasMore] = useState(true);

// Detect end of results
if (newUsers.length < 9) {
  setHasMore(false);
}
```

---

### **🤝 Connection Components**

#### **Connections.jsx**
**Purpose:** Display all accepted connections

**Features:**
- List view with avatars
- Skills display
- "Chat" button navigation
- Empty state handling

---

#### **Requests.jsx**
**Purpose:** Manage incoming connection requests

**Features:**
- Accept/Reject buttons
- Instant UI update on action
- Profile preview cards
- Empty state handling

**Redux Update:**
```javascript
dispatch(removeFromRequests(id));
```

---

### **💬 Chat Component**

#### **Chat.jsx**
**Purpose:** Real-time messaging interface

**Features:**
- Socket.IO connection management
- Online/offline status indicator
- Message history loading
- Auto-scroll to bottom
- Optimistic UI updates
- Multi-tab support

**Socket Events:**
```javascript
// Join room
socket.emit("joinChat", { targetUserId });

// Send message
socket.emit("sendMessage", { targetUserId, newMsg });

// Receive messages
socket.on("receiveMessage", (data) => {
  setMessages((prev) => [...prev, data]);
});

// Online status
socket.on("userStatusChanged", (data) => {
  setIsOnline(data.online);
});
```

**Prevent Duplicate Messages:**
```javascript
if (data.senderId?.toString() === userId?.toString()) {
  return prev; // Skip own message
}
```

---

### **💳 Payment Components**

#### **Membership.jsx**
**Purpose:** Display and purchase membership plans

**Features:**
- Silver & Gold plan cards
- Active membership indicators
- Days remaining countdown
- Extend membership option
- Stripe checkout redirect

**Days Calculation:**
```javascript
const getDaysLeft = (expiryDate) => {
  const diff = new Date(expiryDate) - new Date();
  return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
};
```

---

#### **PaymentSuccess.jsx & PaymentFail.jsx**
**Purpose:** Post-payment redirect pages

**Features:**
- Success: Confirmation message + redirect to profile
- Failure: Error explanation + retry option

---

### **🤖 AI Component**

#### **AIChatbot.jsx**
**Purpose:** Floating AI assistant chatbot

**Features:**
- Toggle open/close (🤖/✕)
- Message history
- Character limit (300)
- Loading indicators
- Auto-scroll to bottom
- Gradient UI design

**API Call:**
```javascript
axios.post(
  `${BASE_URL}/ai/chat`,
  { message: currentInput },
  { withCredentials: true }
);
```

---

### **🎨 UI Components**

#### **Navbar.jsx**
**Purpose:** Main navigation bar

**Features:**
- Logo and branding
- Search bar (desktop only)
- Membership crown badges
- User avatar dropdown
- Navigation links:
  - Home, Profile, Smart Matches
  - Connections, Requests, Membership
  - Logout

**Search Functionality:**
```javascript
const handleSearch = (e) => {
  e.preventDefault();
  navigate(`/search?query=${searchText}`);
  setSearchText("");
};
```

---

#### **Footer.jsx**
**Purpose:** Footer with contact and social links

**Features:**
- Brand information
- Contact details (email, phone)
- Social media links (GitHub, LinkedIn)
- Copyright notice

---

#### **Landing.jsx**
**Purpose:** Marketing landing page

**Features:**
- Hero section with CTA
- Feature cards (Connect, Chat, Premium)
- AI chatbot integration
- Responsive design

---

#### **Shimmer.jsx**
**Purpose:** Loading skeleton component

**Features:**
- Customizable count
- Responsive grid layout
- DaisyUI skeleton styling

---

#### **Error.jsx**
**Purpose:** Generic error page

**Features:**
- Friendly error illustration
- Refresh button
- Redirect to feed

---

## 🗂️ State Management

### **Redux Store Structure**

```javascript
{
  user: {
    _id, firstName, lastName, emailId,
    age, gender, photoUrl, about, skills,
    memberships: {
      Silver: { active, expiresAt },
      Gold: { active, expiresAt }
    }
  },
  feed: [ /* array of user objects */ ],
  connections: [ /* array of connection objects */ ],
  requests: [ /* array of request objects */ ]
}
```

---

### **Redux Slices**

#### **userSlice.js**
**Actions:**
- `addUser(userData)` - Set user data
- `removeUser()` - Clear user (logout)

---

#### **feedSlice.js**
**Actions:**
- `addFeed(feedArray)` - Set feed data
- `removeFromFeed(userId)` - Remove user from feed
- `removeFeed()` - Clear feed

---

#### **connections.js**
**Actions:**
- `addConnections(connectionsArray)` - Set connections
- `removeConnections()` - Clear connections

---

#### **requests.js**
**Actions:**
- `addRequests(requestsArray)` - Set requests
- `removeFromRequests(requestId)` - Remove single request
- `removeRequests()` - Clear all requests

---

## 🛤️ Routing Structure

### **Route Configuration**

| Path | Component | Protected | Description |
|------|-----------|-----------|-------------|
| `/` | `Landing` | ❌ | Public landing page |
| `/login` | `Login` | 🔒 Reverse | Login/signup (redirect if logged in) |
| `/feed` | `Feed` | ✅ | Main user feed |
| `/profile` | `Profile` | ✅ | User profile editing |
| `/smart-matches` | `SmartMatches` | ✅ | Skill-based matches |
| `/connections` | `Connections` | ✅ | Accepted connections |
| `/requests` | `Requests` | ✅ | Incoming requests |
| `/chat/:targetUserId` | `Chat` | ✅ | Real-time chat |
| `/search` | `Search` | ✅ | User search results |
| `/membership` | `Membership` | ✅ | Membership plans |
| `/payment-success` | `PaymentSuccess` | ✅ | Payment confirmation |
| `/payment-cancel` | `PaymentFailed` | ✅ | Payment failure |
| `*` | `Error` | ❌ | 404 error page |

---

### **Route Protection**

```javascript
// ProtectedRoute prevents logged-in users from accessing login
<Route element={<ProtectedRoute />}>
  <Route path="login" element={<Login />} />
</Route>

// Body component handles authentication check for all other routes
<Route path="/" element={<Body />}>
  {/* All protected routes nested here */}
</Route>
```

---

## 🔌 Socket.IO Integration

### **Connection Setup**

**File:** `utils/socket.js`

```javascript
import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
  return io(BASE_URL, {
    withCredentials: true, // Send cookies for authentication
  });
};
```

---

### **Usage in Chat Component**

```javascript
const socket = createSocketConnection();
socketRef.current = socket;

// Join chat room
socket.emit("joinChat", { targetUserId });

// Send message
socket.emit("sendMessage", { targetUserId, newMsg });

// Listen for messages
socket.on("receiveMessage", (data) => {
  setMessages((prev) => [...prev, data]);
});

// Cleanup
return () => socket.disconnect();
```

---

## 🎨 Styling Guide

### **Tailwind CSS + DaisyUI**

**Configuration:** `index.css`
```css
@import "tailwindcss";
@plugin "daisyui";
```

---

### **Responsive Breakpoints**

| Breakpoint | Size | Usage |
|------------|------|-------|
| `sm:` | 640px+ | Tablet portrait |
| `md:` | 768px+ | Tablet landscape |
| `lg:` | 1024px+ | Desktop |
| `xl:` | 1280px+ | Large desktop |

---

### **Common Utility Classes**

```javascript
// Buttons
btn btn-primary          // Primary button
btn btn-outline          // Outlined button
btn btn-error            // Error/danger button

// Cards
card bg-base-200         // Card container
card-body                // Card content
card-title               // Card heading

// Badges
badge badge-outline      // Outlined badge
badge badge-secondary    // Secondary color badge

// Loading
loading loading-spinner  // Spinner animation
skeleton                 // Skeleton loader
```

---

### **Membership Styling**

**Gold Member:**
```javascript
border-2 border-yellow-400
shadow-[0_0_25px_rgba(234,179,8,0.7)]
```

**Silver Member:**
```javascript
border-2 border-gray-300
shadow-[0_0_20px_rgba(209,213,219,0.7)]
```

---

## 📊 Summary

| Category | Count | Description |
|----------|-------|-------------|
| **Components** | 21 | Reusable UI components |
| **Pages** | 15 | Routable pages/views |
| **Redux Slices** | 4 | State management modules |
| **Routes** | 14 | Client-side routes |
| **Real-time Features** | 2 | Chat + Online status |
| **API Integrations** | 3 | Backend + Stripe + Gemini |

---

## 🎯 Core Highlights

✅ **Modern React Architecture** - Hooks, functional components, Redux Toolkit  
✅ **Real-time Communication** - Socket.IO with multi-tab support  
✅ **Smart Algorithms** - Skill matching, priority feed  
✅ **Seamless Payments** - Stripe checkout integration  
✅ **AI-Powered** - Google Gemini chatbot  
✅ **Responsive Design** - Mobile-first with Tailwind CSS  
✅ **Production-Ready** - Error handling, loading states, optimistic UI  
✅ **SEO Optimized** - Meta tags, semantic HTML  

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