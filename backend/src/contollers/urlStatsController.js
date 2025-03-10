const ShortUrl = require('../models/shorturls')
const nullality = require('../utils/nullality')

const urlStatsController = async(req, res) => {
    const shorturl = req.params.shorturl
    const nullaled = nullality({shorturl})    
    if (nullaled.nullaled){
        return res.status(400).json({
            message: "Invalid shorturl given",
            code: 61130
        })
    }
    const urlstat = await ShortUrl.scope('stats').findByPk(shorturl)

    if (!urlstat){
        return res.status(404).json({
            message: "ShortURL not Found"
        })
    }
    console.log('retrieved stats', urlstat)
    return res.status(200).json(urlstat)
}

module.exports = urlStatsController;