# 🍬 Sweet Shop Management System

A full-stack web application for managing and purchasing sweets online.  
Built using **React + Vite** for the frontend, **Node.js + Express** for the backend, and **MongoDB Atlas** for cloud data storage.

---

## 🚀 Features

### 👨‍💼 Admin
- Secure authentication with JWT
- Add, update, or delete sweets
- Manage inventory and pricing
- View all available sweets dynamically

### 🍭 Customer
- Register and log in securely
- Browse sweets with images and tags
- Purchase sweets (stock updates instantly)
- Light and Dark mode UI

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React, Vite, Context API |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Auth | JWT (JSON Web Tokens), bcryptjs |
| Styling | Custom CSS, CSS variables for theme switching |
| Testing | Jest, Supertest (TDD ready structure) |

---

## 🗂 Project Structure
```
sweet-shop/
├── backend/
│ ├── src/
│ │ ├── auth/
│ │ ├── sweets/
│ │ ├── middleware/
│ │ ├── utils/
│ │ ├── models/
│ │ ├── config/
│ │ └── server.js
│ ├── package.json
│ └── scripts/createAdmin.js
│
├── frontend/
│ ├── src/
│ │ ├── auth/
│ │ ├── components/
│ │ ├── context/
│ │ ├── hooks/
│ │ ├── pages/
│ │ └── styles/
│ ├── package.json
│ ├── vite.config.js
│ └── index.html
│
└── README.md
```
```yaml

---

## ⚙️ Setup Instructions

### 1️⃣ Backend Setup
```bash
cd backend
npm install
npm run dev

```
### Create a .env file inside backend/:
```bash
PORT=5000
MONGODB_URI=<your-mongodb-atlas-uri>
JWT_SECRET=<your-secret-key>
```

### Run your server:
```bash
npm run dev
```
### 2️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Create .env in frontend/:
```bash
VITE_API_URL=http://localhost:5000
```

Visit http://localhost:5173

## 🧠 My AI Usage
- Which AI tools I used

- - ChatGPT (GPT-5)

### How I used them

- I used ChatGPT to help design the project folder structure and initial setup commands (both frontend and backend).

- Generated boilerplate code for key files such as:

- Express server setup, environment validation, MongoDB connection

- React context for authentication and theme management

- Sweet management CRUD logic and UI layout

- Used it to improve UI styling for the product cards and dark mode adjustments.

- Helped me write clean commit messages for each file and generate documentation like this README.

### Reflection

- Using ChatGPT significantly accelerated my setup and structure planning.
- It allowed me to maintain a consistent coding style, spot logical gaps early, and focus more on refining functionality rather than boilerplate.
- However, I still had to manually adjust logic, validation, and API integration to ensure correctness and security.
- Overall, it felt like pairing with a smart coding assistant rather than replacing my own work.
