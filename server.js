import express from "express"
import environments from "./src/api/config/environments.js"
import { connection } from "./src/api/database/db.js"

const app = express()

const PORT = environments.port

////////////////
// Middlewares//

app.use(express.json())


app.get("/", (req, res) => {
    res.send("Welcome to my To-Do List's API")
})

////////////////////
// Task Endpoints //

app.get("/api/user/tasks/:idUser", async (req, res) => {
    try{
        const {idUser} = req.params
        if(!idUser || isNaN(Number(idUser))){
            return res.status(400).json({
                message: "Error in the request. The user ID must be valid"
            })
        }

        const sqlQuery = `SELECT * FROM tasks WHERE idUser = ?`
        const [tasks] = await connection.query(sqlQuery, [idUser])

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
        res.status(500).json({
            message: "Internal server error creating new task by a specific user"
        })
    }
})

app.delete("/api/user/removeTask/:idTask", async (req, res) => {
    try{
        const {idTask} = req.params
        if(!idTask || isNaN(Number(idTask))){
            return res.status(400).json({
                message: "Error in the request. The task ID must be valid"
            })
        }

        const sqlQuery = `DELETE FROM tasks WHERE idTask = ?`
        const [result] = await connection.query(sqlQuery, [idTask])

        res.status(204).json({
            message: `The task with ID: ${idTask} was deleted successfully`,
            payload: result
        })

    } catch(error){
        res.status(500).json({
            message: "Internal server error removing a task from a specific user"
        })
    }
})

app.put("/api/user/completeTask/:idTask", async (req, res) => {
    try{
        const {idTask} = req.params
        if(!idTask || isNaN(Number(idTask))){
            return res.status(400).json({
                message: "Error in the request. The task ID must be valid"
            })
        }
        
        const sqlQuery = `UPDATE tasks SET status = 1 WHERE idTask = ?`
        const [result] = await connection.query(sqlQuery, [idTask])

        if(result.affectedRows === 0){
            return res.status(404).json({
                message: `The task with ID: ${idTask} was not found`
            })
        }

        if(result.changedRows === 0){
            return res.status(200).json({
                message: `The task with ID: ${idTask} was found but it has already been completed`
            })
        }
        res.status(200).json({
            message: `The task with ID: ${idTask} was completed successfully`,
            payload: result
        })

    } catch (error){
        res.status(500).json({
            message: "Internal server error changing the status of a task"
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

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`)
})
