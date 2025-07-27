import express from "express"
import environments from "./src/api/config/environments.js"
import { connection } from "./src/api/database/db.js"
import { validateId, validateToken } from "./src/api/middlewares/middlewares.js"
import { userRoutes } from "./src/api/routes/index.js"

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

app.get("/api/user/tasks", validateToken, async (req, res) => {
    try{
        const {id} = req.user

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


app.get("/api/user/task/:id", validateToken, validateId, async (req, res) => {
    try{
        const idUser = req.user.id
        const idTask = req.params.id

        const sqlQuery = `SELECT * FROM tasks WHERE idUser = ? AND idTask = ?`
        const [task] = await connection.query(sqlQuery, [idUser, idTask])

        if(task.length === 0){
            return res.status(404).json({
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


app.post("/api/user/addTask", validateToken ,async (req, res) => {
    try{
        const idUser = req.user.id
        const {nameTask} = req.body
        if(!nameTask){
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

app.delete("/api/user/removeTask/:id", validateToken, validateId, async (req, res) => {
    try{
        const idUser = req.user.id
        const idTask = req.params.id

        const sqlQuery = `DELETE FROM tasks WHERE idUser = ? AND idTask = ?`
        const [result] = await connection.query(sqlQuery, [idUser, idTask])

        res.status(204).json({
            message: `The task with ID: ${idTask} was deleted successfully`,
            payload: result
        })

    } catch(error){
        console.error(error)
        res.status(500).json({
            message: "Internal server error removing a task from a specific user"
        })
    }
})

app.put("/api/user/markTaskAsCompleted/:id", validateToken, validateId, async (req, res) => {
    try{
        const idUser = req.user.id
        const idTask = req.params.id
        
        const sqlQuery = `UPDATE tasks SET status = 1 WHERE idUser = ? AND idTask = ?`
        const [result] = await connection.query(sqlQuery, [idUser, idTask])

        if(result.affectedRows === 0){
            return res.status(404).json({
                message: `The task with ID: ${idTask} was not found`
            })
        }

        if(result.changedRows === 0){
            return res.status(200).json({
                message: `The task with ID: ${idTask} was found but it has already been marked as completed`
            })
        }
        res.status(200).json({
            message: `The task with ID: ${idTask} was marked as completed successfully`,
        })

    } catch (error){
        console.error(error)
        res.status(500).json({
            message: "Internal server error marking the status of a task as completed"
        })
    }
})

app.put("/api/user/markTaskAsIncompleted/:id", validateToken, validateId, async(req, res) => {
    try{
        const idUser = req.user.id
        const idTask = req.params.id

        const sqlQuery = 'UPDATE tasks SET status = 0 WHERE idUser = ? AND idTask = ?'
        const [result] = await connection.query(sqlQuery, [idUser, idTask])

        if(result.affectedRows === 0){
            return res.status(404).json({
                message: `The task with ID: ${idTask} was not found`
            })
        }

        if(result.changedRows === 0){
            return res.status(200).json({
                message: `The task with ID: ${idTask} was found but it has already been marked as incompleted`
            })
        }

        res.status(200).json({
            message: `The task with ID: ${idTask} was marked as incompleted successfully`
        })

    } catch(error){
        console.error(error)
        res.status(500).json({
            message: "Internal server error marking the status of a task as incompleted"
        })
    }
})

app.put("/api/user/modifyTask/:id", validateToken, validateId, async(req, res) => {
    try{
        const idUser = req.user.id
        const idTask = req.params.id
        const {nameTask} = req.body
        if(!nameTask){
            return res.status(400).json({
                message: "Error in the request. The task name must be valid"
            })
        }

        const sqlQuery = 'UPDATE tasks SET nameTask = ? WHERE idUser = ? AND idTask = ?'
        const [result] = await connection.query(sqlQuery, [nameTask, idUser, idTask])

        if(result.affectedRows === 0){
            return res.status(404).json({
                message: `The task with ID: ${idTask} was not found`
            })
        }

        if(result.changedRows === 0){
            return res.status(200).json({
                message: `The task with ID: ${idTask} was found but it has already had the same data`
            })
        }

        res.status(200).json({
            message: `The task with ID: ${idTask} was modified successfully`
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

app.use("/api/user", userRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`)
})
