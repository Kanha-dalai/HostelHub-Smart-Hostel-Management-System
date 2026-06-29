# 🏠 HostelHub – Smart Hostel Management System

A full-stack **Smart Hostel Management System** developed using the **MERN Stack (MongoDB, Express.js, React.js, and Node.js)**. The project provides a secure and efficient platform for managing hostel operations with separate portals for **Students** and **Administrators**.

---

# 📌 Project Overview

HostelHub is designed to simplify hostel management by digitizing various hostel-related activities such as student registration, secure login, hostel information management, leave applications, complaints, and notices.

The system uses **JWT Authentication** for secure user authentication and **bcrypt.js** for password encryption.

---

# ✨ Features

## 👨‍🎓 Student Module

* Student Registration
* Student Login
* Secure JWT Authentication
* View Personal Profile
* View Hostel Details
* Leave Application
* Complaint Submission
* Notice Board
* Logout

---

## 👨‍💼 Admin Module

* Admin Registration
* Admin Login
* Dashboard
* View Student Details
* Manage Hostel Information
* View Complaints
* View Leave Requests
* Publish Notices
* Logout

---

# 🛠 Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios
* CSS3
* Vite

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Authentication

* JSON Web Token (JWT)
* bcrypt.js

---

# 📂 Project Structure

```text
HostelHub
│
├── hostelhub-client
│
└── hostelhub-server
```

---

# 🔐 Authentication Flow

```text
Register
      │
      ▼
Login
      │
      ▼
JWT Token Generation
      │
      ▼
Protected Routes
      │
      ▼
Student Dashboard / Admin Dashboard
```

---

# 📦 Installation

## Clone the Repository

```bash
git clone https://github.com/Kanha-dalai/HostelHub-Smart-Hostel-Management-System.git
```

---

## Install Frontend

```bash
cd hostelhub-client

npm install

npm run dev
```

---

## Install Backend

```bash
cd hostelhub-server

npm install

node server.js
```

---

# ⚙ Environment Variables

Create a **.env** file inside the backend folder.

```env
PORT=5000

MONGO_URL=mongodb://localhost:27017/hostelhubdb

JWT_SECRET=your_secret_key
```

---

# 📁 Database

**Database Name**

```text
hostelhubdb
```

### Collections

```text
users
rooms
complaints
leaves
notices
```

---

# 🚀 Future Enhancements

* Room Allocation System
* Fee Management
* Online Payment Gateway
* Email Notifications
* SMS Notifications
* File Upload
* QR Code Based Hostel Entry
* Mobile Responsive Dashboard
* Analytics Dashboard
* Dark Mode

---

# 🎯 Learning Outcomes

Through this project, I gained practical experience in:

* MERN Stack Development
* React Routing
* REST API Development
* MongoDB Integration
* JWT Authentication
* Password Encryption using bcrypt
* Frontend & Backend Integration
* API Testing using Postman

---

# 👨‍💻 Author

**Kanha Dalai**

MCA Student

GIET University

GitHub: https://github.com/Kanha-dalai

---

# ⭐ Support

If you found this project useful, consider giving it a **⭐ Star** on GitHub.

---

# 📄 License

This project is developed for **educational and learning purposes**.
