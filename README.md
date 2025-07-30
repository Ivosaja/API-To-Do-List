# 📝 To-Do List REST API

This is a full-featured RESTful API for a To-Do List application. Built with **Node.js**, **Express**, and **MySQL**, it includes secure user authentication via **JWT** and a complete task management system.

---

## 🚀 Features

- User registration and login with hashed passwords (bcrypt)
- **JWT authentication** (1-hour token)
- Secure endpoints with token validation middleware
- **CRUD operations** for tasks (Create, Read, Update, Delete)
- Mark tasks as completed or incompleted
- Follows the **MVC architecture**
- Clean and modular codebase

---

## 📁 Folder Structure

```bash
├── package.json
├── package-lock.json
├── README.md
├── server.js
└── src
    └── api
        ├── config
        │   └── environments.js
        ├── controllers
        │   ├── task.controller.js
        │   └── user.controller.js
        ├── database
        │   └── db.js
        ├── middlewares
        │   └── middlewares.js
        ├── models
        │   ├── task.model.js
        │   └── user.model.js
        └── routes
            ├── index.js
            ├── task.routes.js
            └── user.routes.js

```

---

## 📦 Tech Stack

- **Node.js**
- **Express**
- **MySQL**
- **bcrypt**
- **jsonwebtoken**
- **dotenv**

---