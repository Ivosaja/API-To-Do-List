import express from "express"
import environments from "./src/api/config/environments.js"
import { connection } from "./src/api/database/db.js"
import { validateId } from "./src/api/middlewares/middlewares.js"
import jwt from "jsonwebtoken"

const app = express()

const PORT = environments.port
const SECRET = environments.secret

////////////////
// Middlewares//

app.use(express.json())


app.get("/", (req, res) => {
    res.send("Welcome to my To-Do List's API")
})

////////////////////
// Task Endpoints //

app.get("/api/user/tasks/:id", validateId, async (req, res) => {
    try{
        const {id} = req.params

        const sqlQuery = `SELECT * FROM tasks WHERE idUser = ?`
        const [tasks] = await connection.query(sqlQuery, [id])

        if(tasks.length === 0){
            return res.status(200).json({
                message: "There is any task available"
            })
        }

        res.status(200).json({
            payload: tasks,
            message: tasks.length
        })

    } catch (error){
        console.error(error)
        res.status(500).json({
            message: "Internal server error getting all the tasks from a specific user"
        })
    }
})


app.get("/api/user/task", async (req, res) => {
    try{
        const {idUser, idTask} = req.query
        if(!idTask || isNaN(Number(idTask)) || !idUser || isNaN(Number(idUser))){
            return res.status(400).json({
                message: "Error in the request. The task and user ID must be valid"
            })
        }

        const sqlQuery = `SELECT * FROM tasks WHERE idUser = ? AND idTask = ?`
        const [task] = await connection.query(sqlQuery, [idUser, idTask])

        if(task.length === 0){
            return res.status(200).json({
                message: `The task with ID: ${idTask} does not exist`
            })
        }

        res.status(200).json({
            payload: task
        })

    } catch (error){
        console.error(error)
        res.status(500).json({
            message: "Internal server error getting a task from a specific user"
        })
    }
})


app.post("/api/user/addTask", async (req, res) => {
    try{
        const {nameTask, idUser} = req.body
        if(!nameTask || !idUser || isNaN(Number(idUser))){
            return res.status(400).json({
                message: "Error in the request. The task and user ID must be valid"
            })
        }

        const sqlQuery = `INSERT INTO tasks (nameTask, idUser) VALUES (?, ?)`
        const [result] = await connection.query(sqlQuery, [nameTask, idUser])

        res.status(201).json({
            message: `The task with ID: ${result.insertId} was created successfully`
        })

    } catch (error){
        console.error(error)
        res.status(500).json({
            message: "Internal server error creating new task by a specific user"
        })
    }
})

app.delete("/api/user/removeTask/:id", validateId, async (req, res) => {
    try{
        const {id} = req.params

        const sqlQuery = `DELETE FROM tasks WHERE idTask = ?`
        const [result] = await connection.query(sqlQuery, [id])

        res.status(204).json({
            message: `The task with ID: ${id} was deleted successfully`,
            payload: result
        })

    } catch(error){
        console.error(error)
        res.status(500).json({
            message: "Internal server error removing a task from a specific user"
        })
    }
})

app.put("/api/user/markTaskAsCompleted/:id", validateId, async (req, res) => {
    try{
        const {id} = req.params
        
        const sqlQuery = `UPDATE tasks SET status = 1 WHERE idTask = ?`
        const [result] = await connection.query(sqlQuery, [id])

        if(result.affectedRows === 0){
            return res.status(404).json({
                message: `The task with ID: ${id} was not found`
            })
        }

        if(result.changedRows === 0){
            return res.status(200).json({
                message: `The task with ID: ${id} was found but it has already been marked as completed`
            })
        }
        res.status(200).json({
            message: `The task with ID: ${id} was marked as completed successfully`,
        })

    } catch (error){
        console.error(error)
        res.status(500).json({
            message: "Internal server error marking the status of a task as completed"
        })
    }
})

app.put("/api/user/markTaskAsIncompleted/:id", validateId, async(req, res) => {
    try{
        const {id} = req.params

        const sqlQuery = 'UPDATE tasks SET status = 0 WHERE idTask = ?'
        const [result] = await connection.query(sqlQuery, [id])

        if(result.affectedRows === 0){
            return res.status(404).json({
                message: `The task with ID: ${id} was not found`
            })
        }

        if(result.changedRows === 0){
            return res.status(200).json({
                message: `The task with ID: ${id} was found but it has already been marked as incompleted`
            })
        }

        res.status(200).json({
            message: `The task with ID: ${id} was marked as incompleted successfully`
        })

    } catch(error){
        console.error(error)
        res.status(500).json({
            message: "Internal server error marking the status of a task as incompleted"
        })
    }
})

app.put("/api/user/modifyTask/:id", validateId, async(req, res) => {
    try{
        const {id} = req.params
        const {nameTask} = req.body
        if(!nameTask){
            return res.status(400).json({
                message: "Error in the request. The task name must be valid"
            })
        }

        const sqlQuery = 'UPDATE tasks SET nameTask = ? WHERE idTask = ?'
        const [result] = await connection.query(sqlQuery, [nameTask, id])

        if(result.affectedRows === 0){
            return res.status(404).json({
                message: `The task with ID: ${id} was not found`
            })
        }

        if(result.changedRows === 0){
            return res.status(200).json({
                message: `The task with ID: ${id} was found but it has already had the same data`
            })
        }

        res.status(200).json({
            message: `The task with ID: ${id} was modified successfully`
        })

    } catch (error){
        console.error(error)
        res.status(500).json({
            message: "Internal server error modifying a task"
        })
    }
})

////////////////////
// User Endpoints //

app.post("/api/user/register", async (req, res) => {
    try{
        const { name, email, password } = req.body
        if(!name || !email || !password){
            return res.status(400).json({
                message: "Error in the request. All fields must be valid"
            })
        }
        
        const sqlQuery = `INSERT INTO users (userName, userEmail, userPassword) VALUES (?, ?, ?)`
        const [resultQuery] = await connection.query(sqlQuery, [name, email, password])

        res.status(201).json({
            message: `Creation successfully! The user with ID: ${resultQuery.insertId} was created successfully`
        })

    } catch(error){
        console.error(error)
        res.status(500).json({
            message: "Internal server error creating new user in database"
        })
    }
})


app.post("/api/user/login", async(req, res) => {
    try{
        const { email, password } = req.body
        if(!email || !password){
            return res.status(400).json({
                message: "Error in the request. All the fields must be valid"
            })
        }

        const sqlQuery = 'SELECT * FROM users WHERE userEmail = ? AND userPassword = ?'
        const [result] = await connection.query(sqlQuery, [email, password])

        if(result.length === 0){
            return res.status(404).json({
                message: "The user was not found"
            })
        }

        // Getting only the first result of the select (the user)
        const user =  result[0]

        res.status(200).json({
            message: "The user has successfully logged in "
        })


    } catch (error){
        res.status(500).json({
            message: "Internal server error when the user tries to log in"
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`)
})
