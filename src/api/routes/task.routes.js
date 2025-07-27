import {Router} from "express"
import { createTask, deleteTask, getAllTasks, getTaskById, markTaskAsCompleted, markTaskAsIncompleted, modifyTask } from "../controllers/task.controller.js"
import { validateId, validateToken } from "../middlewares/middlewares.js"

const router = Router()

router.get("/", validateToken, getAllTasks)

router.get("/:id", validateToken, validateId, getTaskById)

router.post("/addTask", validateToken, createTask)

router.delete("/removeTask/:id", validateToken, validateId, deleteTask)

router.put("/markTaskAsCompleted/:id", validateToken, validateId, markTaskAsCompleted)

router.put("/markTaskAsIncompleted/:id", validateToken, validateId, markTaskAsIncompleted)

router.put("/modifyTask/:id", validateToken, validateId, modifyTask)

export default router