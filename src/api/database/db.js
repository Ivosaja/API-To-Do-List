import mysql from "mysql2/promise"
import environments from "../config/environments.js"

const { database } = environments

export const connection = mysql.createPool({
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password
})

