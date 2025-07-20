import express from "express"
import environments from "./src/api/config/environments.js"
import { connection } from "./src/api/database/db.js"

const app = express()

const PORT = environments.port

app.get("/", (req, res) => {
    res.send("Welcome to my To-Do List's API")
})

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`)
})
