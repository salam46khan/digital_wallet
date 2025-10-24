# 💳 Digital Wallet System

A secure, modular, and role-based **Digital Wallet System** backend API (similar to **Bkash** or **Nagad**) built with **Express.js** and **Mongoose**.  

---
🔗 **Live Demo**: [Digital Wallet System](https://digital-wallet-system-gray.vercel.app/)  
---
🔗 **Video Explanation**: [Video](https://drive.google.com/file/d/1QlOOu4nop7rdql_DAPjTQEb3cokARZr5/view?usp=sharing)  
---


## 🎯 Project Overview

The **Digital Wallet System** is a backend API designed to handle wallet-based financial services. It enables **users, agents, and admins** to perform core wallet operations under a secure and role-based access control system.  

Every user or agent automatically gets a **wallet with ৳50 initial balance** upon registration. Users can top-up, withdraw, and send money to others, while agents can manage **cash-in and cash-out** operations. Admins (and Super Admins) can monitor and control the overall system, ensuring that all transactions are trackable and secure.  

---

## ✨ Features

### 👤 Users
- Register & Login (JWT authentication)  
- Auto wallet creation with default balance  
- Add money (Top-up)  
- Withdraw money  
- Send money to another user  
- View own transaction history  

### 🧑‍💼 Agents
- Cash-in (add money to any user wallet)  
- Cash-out (withdraw money from user wallet)   

### 👨‍💻 Admin / Super Admin
- View all users, agents, wallets, and transactions  
- Block/unblock wallets  
- Approve/suspend agents  

### 🔐 Security
- JWT-based authentication  
- Role-based route protection  
- Secure password hashing with **bcrypt**  

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js, TypeScript  
- **Database**: MongoDB, Mongoose  
- **Authentication**: JWT  
- **Validation**: Zod  
- **Other Tools**: bcrypt, dotenv, cors  

---

## 📌 API Endpoints

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| `POST` | `/api/v1/user/register` | Register new user/agent (auto wallet create) | Public |
| `POST` | `/api/v1/auth/login` | Login and get JWT token | Public |
| `POST` | `/api/v1/auth/refresh-token` | refresh token | User |
| `POST` | `/api/v1/user/id` | Update user admin and supper admin can update Role | Current User / Admin|
| `GET` | `/api/v1/user/my-transactions` | user can see his won transaction history | User|
| `POST` | `/api/v1/wallet/add` | user can add money | User|
| `POST` | `/api/v1/wallet/withdraw` | user can withdraw money | User|
| `POST` | `/api/v1/wallet/send` | user can sent money to others | User|
| `POST` | `/api/v1/wallet/cash-in` | agent can cash in to user | Agent|
| `POST` | `/api/v1/wallet/cash-out` | user can sent money to agent | Agent / User |
| `POST` | `/api/v1/wallet/update/id` | admin can update wallet | Admin / Supper Admin |
| `GET` | `/api/v1/admin/users` | admin can see all users | Admin / Supper Admin |
| `GET` | `/api/v1/admin/agents` | admin can see all agents | Admin / Supper Admin |
| `GET` | `/api/v1/admin/wallets` | admin can see all wallets | Admin / Supper Admin |
| `GET` | `/api/v1/admin/transactions` | admin can see all transactions | Admin / Supper Admin |
