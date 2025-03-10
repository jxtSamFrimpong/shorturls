const ShortUrl = require('../../models/shorturls')
const { Op } = require('sequelize')

const getAllShortURLS = async(req, res) => {
    //Get All short Urls
    //TODO: to get all short urls for a specific user
    //TODO: only return urls, redact other fields such as stats
    try{
        const allShortUrls = await ShortUrl.scope('fetchAllURLs').findAll({
            where: {
                userId: {
                    [Op.eq]: req.token.email
                }
            }
        })
        if(!allShortUrls){
            return res.status(404).json({
                message: "URLS Not Found for User"
            })
        }
        return res.status(200).json(allShortUrls)
    }catch(e){
        console.error("error fetching all urls", e)
        return res.status(500).json({
            message: "error fetching all urls",
            code: 61128,
            error: e
        })
    }
}


module.exports = getAllShortURLS