import { Router } from "express"

const router = Router()

router.get("/api/user/login", loginUser)

router.post("/api/user/register", registerUser)