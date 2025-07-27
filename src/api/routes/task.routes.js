import {Router} from "express"

const router = Router()

router.get("/tasks", getAllTasks)

router.get("/task/:id", getTaskById)

router.post("/addTask", createTask)

router.delete("/removeTask/:id", deleteTask)

router.put("/markTaskAsCompleted/:id", markTaskAsCompleted)

router.put("/markTaskAsIncompleted/:id", markTaskAsIncompleted)

router.put("/modifyTask/:id", updateTask)

export default router