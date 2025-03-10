const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserModel = require('../models/users')
const nullality = require('../utils/nullality')
const { JWT_SECRET, JWT_SECRET_EXPIRY } = require('../utils/config')

const loginController = async(req, res)=> {
    try {
        const { email, passwd } = req.body
        const nullaled = nullality({email, passwd})

        if (nullaled.nullaled){
            return res.status(400).json({
                message: "Non nullable fields haven't been assigned a value",
                fields: nullaled.results,
                code: 61116
            })
        }
        console.log('payload has data')

        const user_from_db = await UserModel.scope('loginData').findByPk(email)
        if (user_from_db === null || user_from_db === undefined){
            console.log('user does not exist')
            return res.status(404).json({
                message: "Unknown User"
            })
        }
        console.log('user exists')
        
        console.log('about to compare passwd hash')
        const passwdCorrect = await bcrypt.compare(passwd, user_from_db.passwdHash)
        console.log('passwd hash compare completed')

        if (!(passwdCorrect)){
            console.log('passwords do not match')
            return res.status(401).json({
                message: "Incorrect password"
            })
        }
        console.log('passwords match')

        console.log('about to generate payload for jwt')
        const userForToken = {
            email,
            fname: user_from_db.get('fname'),
            lname: user_from_db.get('lname')
        }
        console.log('payload for jwt generated')

        console.log('about to generate jwt')
        const token = jwt.sign(userForToken, JWT_SECRET, {
            expiresIn: JWT_SECRET_EXPIRY
        })
        console.log('jwt generated')

        return res.status(200).json({
            token
        })



        
    }catch(e){
        console.log('error loging in')
        return res.status(500).json({
            message: 'error loging in',
            code: 61117
        })
    }


}


module.exports = loginController;