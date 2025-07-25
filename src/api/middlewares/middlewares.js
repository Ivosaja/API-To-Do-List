/////////////////
// Middlewares //

import jwt from "jsonwebtoken"
import environments from "../config/environments.js"

const SECRET = environments.secret

const validateId = (req, res, next) => {
    const {id} = req.params
    if(!id || isNaN(id) || parseInt(id) <= 0){
        return res.status(400).json({
            message: "Error in the request, the ID must be valid"
        })
    }

    req.params.id = parseInt(id, 10)
    next()
}

const validateToken = (req, res, next) => {
    // Authorization: Bearer token//
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(401).json({
            message: "Token not found"
        })
    }

    const token = authHeader.split(' ')[1]
    try{
        const decodedToken  = jwt.verify(token, SECRET)
        req.user = decodedToken
        next()

    } catch (error){
        return res.status(403).json({
            message: "The token is invalid or it has expired"
        })
    }
}

export {
    validateId, // -> Route's middleware
    validateToken // -> Route's middleware
}