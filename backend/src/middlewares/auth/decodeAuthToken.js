const getAuthToken = require('./getAuthToken')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../../utils/config')

const decodeAuthToken = async(req, res, next)=> {
    try{
        console.log('req to be sent to get auth token')
        const retrievedToken = getAuthToken(req)
        if (retrievedToken === null){
            return res.status(401).json({
                message: "Provide a Token",
                code: 61118
            })
        }

        const decodedAuthToken = jwt.verify(retrievedToken, JWT_SECRET)
        console.log('token verified successfully')

        if (!decodedAuthToken.email){
            return res.status(401).json({
                message: "Invalid token"
            })
        }
        req.token = decodedAuthToken;
    }catch(e){
        if (e.name = 'TokenExpiredError'){
            return res.status(401).json({
                message: 'Expired Token'
            })
        }
        return res.status(500).json({
            message: e,
            code: 61119
        })
    }

    next()

}


module.exports = decodeAuthToken;