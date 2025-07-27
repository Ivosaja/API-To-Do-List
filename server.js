import express from "express"
import environments from "./src/api/config/environments.js"
import { taskRoutes, userRoutes } from "./src/api/routes/index.js"

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

app.use("/api/user/tasks", taskRoutes)

////////////////////
// User Endpoints //

app.use("/api/user", userRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`)
})
