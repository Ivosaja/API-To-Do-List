import mysql from "mysql2/promise"
import { database } from "../config/environments.js"

export const connection = mysql.createPool({
    host: database.host,
    database: database.name,
    user: database.name,
    password: database.password
})

