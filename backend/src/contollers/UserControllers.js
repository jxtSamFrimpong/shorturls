const bcrypt = require('bcrypt')
const {USER_PASS_SALT_ROUNDS} = require('../utils/config')
const UserModel = require('../models/users')

const getUsers = async(req, res)=> {
    try{
        const users_in_db = await UserModel.scope('flatData').findAll()

        if (!(users_in_db === undefined || users_in_db === null)){
            console.log('users_from_db', users_in_db)
            return res.json(users_in_db)
        }
        return res.status(500).json({
            message: "there is an issue with getting data from db",
            code: 61114
        })
    }catch(e){
        console.log("there is an issue with getting data in db", e)
        return res.status(500).json({
            message: e,
            code: 61115
        })
    }
}


const getUser = async(req, res)=> {
    try{
        const id = req.params.id
    if (!req){
        return res.status(400)
    }

const user_from_db = await UserModel.findByPk(id)
    if (user_from_db === null || user_from_db === undefined ){
        console.log('User not found', user_from_db)
        return res.status(404).json({
            message: "User not found",
            id: req.params.id
        })
    }
    return res.status(200).json(user_from_db)
    }
    catch(e){
        console.log('getting particular error gone wrone', e)
        res.status(500).send({
            message:  e
        })
    }    
}

const  createUser = async(req, res)=> {
    const { paymentTier, rateLimits, dateCreated, fname, lname, passwd, email } = req.body

    try {
        console.log('about to hash password for user: ', email,USER_PASS_SALT_ROUNDS)
        const passwdHash = await bcrypt.hash(passwd, USER_PASS_SALT_ROUNDS)
        console.log('hashed password successful')

        const new_user_body = { paymentTier, rateLimits, dateCreated, fname, lname, passwdHash, id: email }
        
        //create user model(object)
        const new_user = await UserModel.scope('flatData').build(new_user_body)
        if (!(new_user instanceof UserModel)){
            console.log('built new_user is not an instance of the user model', new_user)
            return res.status(500).json({
                message: "error creating new user",
                code: 61112
            })
        }
        console.log('success creating new user body')

        const {id, ...new_user_to_save} = new_user_body
        console.log('new user to save', new_user_body)
        
        const saved_new_user = await new_user.save()
        console.log('success saving new user')
        
        return res.status(201).json(saved_new_user.toJSON())
    }catch(e){
        console.log("error creating user")
        return res.status(500).json({
            message: e,
            code: 61113
        })
    }
}




module.exports = {
    getUser,
    getUsers,
    createUser
};