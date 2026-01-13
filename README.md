# 🚀 DevTinder – Backend API Documentation

---

## 🔐 Auth Router (`/auth`)

| Method | Endpoint | Description |
|------|---------|------------|
| POST | /auth/signup | Register a new user |
| POST | /auth/login | Login user and issue JWT |
| POST | /auth/logout | Logout user (clear cookie) |
| POST | /auth/forgot-password | Send password reset link |
| POST | /auth/reset-password | Reset password using token |

---

## 👤 Profile Router (`/profile`)

| Method | Endpoint | Description |
|------|---------|------------|
| GET | /profile/view | View logged-in user profile |
| PATCH | /profile/edit | Edit allowed profile fields |
| PATCH | /profile/password | Change user password |
| DELETE | /profile/delete | Delete user account |

---

## 🤝 Connection Request Router (`/request`)

| Method | Endpoint | Description |
|------|---------|------------|
| POST | /request/send/interested/:userId | Send connection request |
| POST | /request/send/ignored/:userId | Ignore a user |
| POST | /request/review/accepted/:requestId | Accept connection request |
| POST | /request/review/rejected/:requestId | Reject connection request |

---

## 👥 User Router (`/user`)

| Method | Endpoint | Description |
|------|---------|------------|
| GET | /user/feed | Get suggested users |
| GET | /user/connections | Get accepted connections |
| GET | /user/requests/received | Get received requests |
| GET | /user/requests/sent | Get sent requests |

---

## 💬 Chat Router (`/chat`)

| Method | Endpoint | Description |
|------|---------|------------|
| GET | /chat/:matchId | Fetch chat history |
| POST | /chat/:matchId/message | Send a message |

---

## 🧠 Skills Router (`/skills`)

| Method | Endpoint | Description |
|------|---------|------------|
| GET | /skills | Get all skills |
| POST | /skills | Add new skill (admin only) |

---

## 📂 Projects Router (`/projects`)

| Method | Endpoint | Description |
|------|---------|------------|
| POST | /projects | Add a project |
| GET | /projects/:userId | Get user projects |
| PATCH | /projects/:projectId | Update project |
| DELETE | /projects/:projectId | Delete project |

---

## 🔔 Notifications Router (`/notifications`)

| Method | Endpoint | Description |
|------|---------|------------|
| GET | /notifications | Get notifications |
| PATCH | /notifications/read | Mark notifications as read |

---

## 🚫 Safety Router (`/safety`)

| Method | Endpoint | Description |
|------|---------|------------|
| POST | /safety/block/:userId | Block a user |
| POST | /safety/report/:userId | Report a user |
| GET | /safety/blocked-users | Get blocked users list |

---

## 🛠️ Admin Router (`/admin`)

| Method | Endpoint | Description |
|------|---------|------------|
| GET | /admin/users | Get all users |
| DELETE | /admin/users/:userId | Delete a user |
| GET | /admin/reports | View reported users |

---

## ✅ Summary

- Total Routers: 10  
- Total APIs: 40+  
- Architecture: Modular Express Router  
- Authentication: JWT + HTTP-only cookies  

---

## 👨‍💻 Author

**Ritesh Gite**  
Backend Developer | MERN Stack
