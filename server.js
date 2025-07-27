import express from "express"
import environments from "./src/api/config/environments.js"
import { validateId, validateToken } from "./src/api/middlewares/middlewares.js"
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

app.get("/api/user/tasks", validateToken, )


app.get("/api/user/task/:id", validateToken, validateId, )


app.post("/api/user/addTask", validateToken ,)

app.delete("/api/user/removeTask/:id", validateToken, validateId, )

app.put("/api/user/markTaskAsCompleted/:id", validateToken, validateId, )

app.put("/api/user/markTaskAsIncompleted/:id", validateToken, validateId, )

app.put("/api/user/modifyTask/:id", validateToken, validateId, )

////////////////////
// User Endpoints //

app.use("/api/user", userRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`)
})
