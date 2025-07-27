import { Router } from "express"

const router = Router()

router.post("/api/user/login", loginUser)

router.post("/api/user/register", registerUser)