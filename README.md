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
- **nodemon**

---

## 📌 Endpoints Overview

### 🔐 Auth

| Method | Endpoint           | Description       |
|--------|--------------------|-------------------|
| POST   | `/api/user/register` | Register a new user |
| POST   | `/api/user/login`    | Login and get token  |

### 📋 Tasks (Protected routes - require JWT)

| Method | Endpoint                        | Description                |
|--------|----------------------------------|----------------------------|
| GET    | `/api/user/tasks/`               | Get all tasks for user     |
| GET    | `/api/user/tasks/:id`            | Get specific task by ID    |
| POST   | `/api/user/tasks/addTask`             | Create new task            |
| DELETE | `/api/user/tasks/removeTask/:id`      | Delete a task              |
| PUT    | `/api/user/tasks/markTaskAsCompleted/:id` | Mark task as done      |
| PUT    | `/api/user/tasks/markTaskAsIncompleted/:id` | Mark task as not done |
| PUT    | `/api/user/tasks/modifyTask/:id`      | Update task name           |

---