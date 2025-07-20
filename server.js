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
// User Endpoints //

app.post("/api/user/register", async (req, res) => {
    try{
        const { name, email, password } = req.body
        if(!name || !email || !password){
            return res.status(400).json({
                message: "Error in the request. All fields must be valid"
            })
        }
        
        const sqlQuery = `INSERT INTO usuarios (userName, userEmail, userPassword) VALUES (?, ?, ?)`
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
