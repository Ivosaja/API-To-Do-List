import { insertTask, removeTask, selectAllTasks, selectTaskById, updateNameTask, updateTaskStatusToFalse, updateTaskStatusToTrue } from "../models/task.model.js"

export const getAllTasks = async (req, res) => {
    try{
        const {id} = req.user

        const [tasks] = await selectAllTasks(id)

        if(tasks.length === 0){
            return res.status(200).json({
                message: "There is any task available"
            })
        }

        res.status(200).json({
            payload: tasks,
            message: tasks.length
        })

    } catch (error){
        console.error(error)
        res.status(500).json({
            message: "Internal server error getting all the tasks from a specific user"
        })
    }
}

export const getTaskById = async (req, res) => {
    try{
        const idUser = req.user.id
        const idTask = req.params.id

        const [task] = await selectTaskById(idUser, idTask)

        if(task.length === 0){
            return res.status(404).json({
                message: `The task with ID: ${idTask} does not exist`
            })
        }

        res.status(200).json({
            payload: task
        })

    } catch (error){
        console.error(error)
        res.status(500).json({
            message: "Internal server error getting a task from a specific user"
        })
    }
}

export const createTask = async (req, res) => {
    try{
        const idUser = req.user.id
        const {nameTask} = req.body
        if(!nameTask){
            return res.status(400).json({
                message: "Error in the request. The task and user ID must be valid"
            })
        }

        const [result] = await insertTask(nameTask, idUser)

        res.status(201).json({
            message: `The task with ID: ${result.insertId} was created successfully`
        })

    } catch (error){
        console.error(error)
        res.status(500).json({
            message: "Internal server error creating new task by a specific user"
        })
    }
}

export const deleteTask = async (req, res) => {
    try{
        const idUser = req.user.id
        const idTask = req.params.id

        const [result] = await removeTask(idUser, idTask)

        if(result.affectedRows === 0){
            return res.status(404).json({
                message: `The task with ID: ${idTask} was not found`
            })
        }

        res.status(204).json({
            message: `The task with ID: ${idTask} was deleted successfully`,
            payload: result
        })

    } catch(error){
        console.error(error)
        res.status(500).json({
            message: "Internal server error removing a task from a specific user"
        })
    }
}

export const markTaskAsCompleted = async (req, res) => {
    try{
        const idUser = req.user.id
        const idTask = req.params.id
        
        const [result] = await updateTaskStatusToTrue(idUser, idTask)

        if(result.affectedRows === 0){
            return res.status(404).json({
                message: `The task with ID: ${idTask} was not found`
            })
        }

        if(result.changedRows === 0){
            return res.status(200).json({
                message: `The task with ID: ${idTask} was found but it has already been marked as completed`
            })
        }
        res.status(200).json({
            message: `The task with ID: ${idTask} was marked as completed successfully`,
        })

    } catch (error){
        console.error(error)
        res.status(500).json({
            message: "Internal server error marking the status of a task as completed"
        })
    }
}

export const markTaskAsIncompleted = async(req, res) => {
    try{
        const idUser = req.user.id
        const idTask = req.params.id

        const [result] = await updateTaskStatusToFalse(idUser, idTask)

        if(result.affectedRows === 0){
            return res.status(404).json({
                message: `The task with ID: ${idTask} was not found`
            })
        }

        if(result.changedRows === 0){
            return res.status(200).json({
                message: `The task with ID: ${idTask} was found but it has already been marked as incompleted`
            })
        }

        res.status(200).json({
            message: `The task with ID: ${idTask} was marked as incompleted successfully`
        })

    } catch(error){
        console.error(error)
        res.status(500).json({
            message: "Internal server error marking the status of a task as incompleted"
        })
    }
}

export const modifyTask = async(req, res) => {
    try{
        const idUser = req.user.id
        const idTask = req.params.id
        const {nameTask} = req.body
        if(!nameTask){
            return res.status(400).json({
                message: "Error in the request. The task name must be valid"
            })
        }

        const [result] = await updateNameTask(nameTask, idUser, idTask)

        if(result.affectedRows === 0){
            return res.status(404).json({
                message: `The task with ID: ${idTask} was not found`
            })
        }

        if(result.changedRows === 0){
            return res.status(200).json({
                message: `The task with ID: ${idTask} was found but it has already had the same data`
            })
        }

        res.status(200).json({
            message: `The task with ID: ${idTask} was modified successfully`
        })

    } catch (error){
        console.error(error)
        res.status(500).json({
            message: "Internal server error modifying a task"
        })
    }
}