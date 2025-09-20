# 📋 Task_Distributor App

A full-stack role-based task management system where **Admins** can create **Agents** and assign tasks to them by uploading a CSV file. Built using **React**, **Tailwind CSS**, **Express.js**, **MongoDB**, **Multer**, and **JWT**.

---

## ✨ Features

- 🔐 Role-Based Authentication (JWT)
  - Admin and Agent login system
- 🧑‍💼 Admin Dashboard:
  - Create agent accounts
  - Upload task lists via CSV
  - Assign tasks to agents automatically
- 📋 Agent Dashboard:
  - View assigned tasks
  - Task status view
- 📄 CSV Upload with Multer
- 💻 Responsive UI using Tailwind CSS
- ⚙️ RESTful API with Express & MongoDB

---

## 🛠️ Tech Stack

### Frontend:
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)

### Backend:
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Multer](https://github.com/expressjs/multer)
- [JWT](https://jwt.io/)
- [CSV Parser (e.g. `xlsx` or `csv-parser`)](https://www.npmjs.com/package/xlsx)

---

## 🚀 How to Run

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Saurabh-singhx/Task_Distributor
cd Task_Distributor


# Go to backend folder
cd backend

# Install backend dependencies
npm install

# Create a .env file (check .env.example for reference)
# Example:
# PORT=8002
# MONGODB_URI=mongodb://localhost:27017/task_distributor
# JWT_SECRET=your_secret_key

# Run backend server
npm run dev

# Go back to project root
cd ..

# Go to frontend folder
cd frontend

# Install frontend dependencies
npm install

# Create a .env file (check .env.example for reference)
# Example:
# VITE_API_URL=http://localhost:8002

# Run frontend
npm run dev

##📝 Test Login Credentials

You can use these accounts to quickly test the app:

| Role  | Email               | Password |
|-------|---------------------|----------|
| Admin | saurabh44@mail.com  | 123456   |
| Agent | saurabh@mail.com    | 123456   |


---










