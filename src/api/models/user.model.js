import { connection } from "../database/db.js"

export const getUserByEmail = async (email) => {
    const sqlQuery = 'SELECT * FROM users WHERE userEmail = ?'
    return await connection.query(sqlQuery, [email])
}

export const createNewUser = async (name, email, passwordHashed) => {
    const sqlQuery = `INSERT INTO users (userName, userEmail, userPassword) VALUES (?, ?, ?)`
    return await connection.query(sqlQuery, [name, email, passwordHashed])
}