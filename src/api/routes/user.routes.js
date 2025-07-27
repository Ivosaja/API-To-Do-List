import { Router } from "express"

const router = Router()

router.post("/login", loginUser)

router.post("/register", registerUser)

export default router;