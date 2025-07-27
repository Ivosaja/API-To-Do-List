import { getUserByEmail, createNewUser} from "../models/user.model.js"

export const registerUser = async (req, res) => {
    try{
        const { name, email, password } = req.body
        if(!name || !email || !password){
            return res.status(400).json({
                message: "Error in the request. All fields must be valid"
            })
        }

        const sqlQueryCheck = 'SELECT * FROM users WHERE userEmail = ?'
        const [resultQueryCheck] = await connection.query(sqlQueryCheck, [email])

        if(resultQueryCheck.length > 0){
            return res.status(409).json({
                message: "The email already exists. Try with another"
            })
        }

        const passwordHashed = await bcrypt.hash(password, 10)

        const sqlQuery = `INSERT INTO users (userName, userEmail, userPassword) VALUES (?, ?, ?)`
        const [resultQuery] = await connection.query(sqlQuery, [name, email, passwordHashed])

        res.status(201).json({
            message: `Creation successfully! The user with ID: ${resultQuery.insertId} was created successfully`
        })

    } catch(error){
        console.error(error)
        res.status(500).json({
            message: "Internal server error creating new user in database"
        })
    }
}


export const loginUser = async(req, res) => {
    try{
        const { email, password } = req.body
        if(!email || !password){
            return res.status(400).json({
                message: "Error in the request. All the fields must be valid"
            })
        }

        const sqlQuery = 'SELECT * FROM users WHERE userEmail = ?'
        const [result] = await connection.query(sqlQuery, [email])

        if(result.length === 0){
            return res.status(404).json({
                message: "The user was not found"
            })
        }

        // Getting only the first result of the select (the user)
        const user =  result[0]

        const passwordCompared = await bcrypt.compare(password, user.userPassword)
        if(!passwordCompared){
            return res.status(400).json({
                message: "The password is invalid"
            })
        }

        // Creating the JWT token (signing it)
        const token = jwt.sign({id: user.idUser}, SECRET, {expiresIn: '1h'})

        res.status(200).json({
            message: "The user has successfully logged in ",
            token: token
        })


    } catch (error){
        res.status(500).json({
            message: "Internal server error when the user tries to log in"
        })
    }
}