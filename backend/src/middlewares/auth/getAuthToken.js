const getAuthToken = (req) => {
    const authorization = req.get('authorization')
    // console.log('vearer retrieved', authorization)
    console.log('bearer retrieved successfully')
    if (authorization && authorization.startsWith('Bearer ')){
        return authorization.replace('Bearer ', '')
    }
    return null
}

module.exports = getAuthToken;