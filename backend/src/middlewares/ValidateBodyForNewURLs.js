const validateBodyForNewURLs = (req, res, next) => {
    const { url, shorturl} = req.body;
    if (url == undefined || url == '' || url == null){
        return res.status(400).json({
            message: "Bad Request, Body should contain a URL"
        })
    }
    if (shorturl == undefined || shorturl == null || shorturl == ''){
        return res.status(400).json({
            message: "Bad Reuest, Body should contain a SHORT URL"
        })
    }
    next()
}

module.exports = validateBodyForNewURLs;