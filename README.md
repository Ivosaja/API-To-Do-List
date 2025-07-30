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

## 🔧 How to Run Locally

1. Clone this repository
2. Run `npm install`
3. Set up a MySQL database and import schema (see this later)
4. Create a `.env` file with:
    - PORT=theportyouwant
    - SECRET=your_jwt_secret
    - DB_HOST=nameofhost
    - DB_NAME=nameofdatabase
    - DB_USER=youruser
    - DB_PASSWORD=yourdbpassword

5. Run with `npm run dev`
6. Use Postman to test the endpoints

---

## 🧱 Database Setup (Manual Instructions)

To test the app, you have to create the database and tables manually.

### 🔧 Steps:

1. Open MySQL (Workbench or terminal)
2. Create the database (use the name you configured in `.env`):

```sql
CREATE DATABASE your_database_name;
USE your_database_name;
```
3. Create the tables:

```sql
CREATE TABLE users (
  idUser INT AUTO_INCREMENT PRIMARY KEY,
  userName VARCHAR(16) NOT NULL,
  userEmail VARCHAR(255) NOT NULL,
  userPassword VARCHAR(100) NOT NULL
);

CREATE TABLE tasks (
  idTask INT AUTO_INCREMENT PRIMARY KEY,
  nameTask VARCHAR(150) NOT NULL,
  idUser INT NOT NULL,
  status TINYINT(1) DEFAULT 0,
  FOREIGN KEY (idUser) REFERENCES users(idUser) ON DELETE CASCADE
);
```
--- 

## 🔐 Authorization

- All `/api/user/*` task routes require an Authorization header on Postman:
    - Authorization: Bearer <your_token>

---

## 👤 Author

**Ivo Lionel Saja**