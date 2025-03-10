const ShortUrl = require('../../models/shorturls')

const addNewShortURLs = async(req, res, next) => {
    try{ 
        const {
            shorturl,
            url,
            clickCount,
            uniqueClicks,
            description,
            socialShareCount,
            type,
            dateCreated,
            dateLastUpdated,
            dateLastFetched,
            dateExpiry,
            userId,
            premieredLink,
            categories,
            customTag,
            publicLink,
            rateLimits
        } = req.body
        
        
        const new_shorturl = await ShortUrl.build(req.body)
    
        const saved_new_shorturl = await new_shorturl.save()

        return res.status(201).json(saved_new_shorturl)

    }catch(e){
        // console.log('error creating short url', e)
        // return res.status(500).json({
        //     message: e
        // })
        next(e)
    }
}


module.exports = addNewShortURLs;