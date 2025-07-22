/////////////////
// Middlewares //

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

export {
    validateId // -> Route's middleware
}