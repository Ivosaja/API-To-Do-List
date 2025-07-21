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

app.get("/api/user/:id", async (req, res) => {
    try{
        const {id} = req.params
        if(!id || isNaN(Number(id))){
            return res.status(400).json({
                message: "Error in the request. The user ID must be valid"
            })
        }

        const sqlQuery = `SELECT * FROM tasks WHERE idUser = ?`
        const [rows] = await connection.query(sqlQuery, [id])

        if(rows.length === 0){
            return res.status(200).json({
                message: "There is any task available"
            })
        }

        res.status(200).json({
            payload: rows,
            message: rows.length
        })

    } catch (error){
        res.status(500).json({
            message: "Internal server error creating new user in database"
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
