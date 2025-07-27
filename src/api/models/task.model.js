import { connection } from "../database/db.js";

export const selectAllTasks = async (id) => {
    const sqlQuery = `SELECT * FROM tasks WHERE idUser = ?`
    return await connection.query(sqlQuery, [id])
}

export const selectTaskById = async (idUser, idTask) => {
    const sqlQuery = `SELECT * FROM tasks WHERE idUser = ? AND idTask = ?`
    return await connection.query(sqlQuery, [idUser, idTask])
}

export const insertTask = async (nameTask, idUser) => {
    const sqlQuery = `INSERT INTO tasks (nameTask, idUser) VALUES (?, ?)`
    return await connection.query(sqlQuery, [nameTask, idUser])
}

export const removeTask = async (idUser, idTask) => {
    const sqlQuery = `DELETE FROM tasks WHERE idUser = ? AND idTask = ?`
    return await connection.query(sqlQuery, [idUser, idTask])
}

export const updateTaskStatusToTrue = async (idUser, idTask) => {
    const sqlQuery = `UPDATE tasks SET status = 1 WHERE idUser = ? AND idTask = ?`
    return await connection.query(sqlQuery, [idUser, idTask])
}

export const updateTaskStatusToFalse = async (idUser, idTask) => {
    const sqlQuery = 'UPDATE tasks SET status = 0 WHERE idUser = ? AND idTask = ?'
    return await connection.query(sqlQuery, [idUser, idTask])
}

export const updateNameTask = async (nameTask, idUser, idTask) => {
    const sqlQuery = 'UPDATE tasks SET nameTask = ? WHERE idUser = ? AND idTask = ?'
    return await connection.query(sqlQuery, [nameTask, idUser, idTask])
}