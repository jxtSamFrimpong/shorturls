const shorturls = require('../models/shorturls')

const validateExistenceOfShortURL = (req, res, next) => {
    console.log('inside validate existence')
    console.log('all short urls', shorturls)
    if (shorturls[`${req.params.shorturl}`]){
        console.log('existence of shorts:', shorturls[`${req.params.shorturl}`].url)
        req.shortExists = true
        console.log('new shortExists', req.shortExists)
    }
    if ((req.path == '/api/urls' || req.path == '/api/urls/') && req.method == 'POST'  && shorturls[`${req.body.shorturl}`]){
        console.log('existence of shorts:', shorturls[`${req.body.shorturl}`].url)
        req.shortExists = true
        console.log('new shortExists', req.shortExists)
        
    }
    next()
}

module.exports = validateExistenceOfShortURL;