const validateBodyForUpdateURLs = (req, res, next)=> {
    const shorturl = req.params.shorturl
    const newurl = req.body.newurl

    if (shorturl == null || shorturl == undefined || shorturl == ''){
        return res.status(400).json({
            message: "Provide ShortURL"
        })
    }
    if (newurl == null || newurl == undefined || newurl == ''){
        return res.status(400).json({
            message: "Provide New URL"
        })
    }
    next()
}

module.exports = validateBodyForUpdateURLs;