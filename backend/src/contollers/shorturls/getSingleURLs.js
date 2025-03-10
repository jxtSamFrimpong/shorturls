const nullality = require('../../utils/nullality')
const { getFormattedDate } = require('../../utils/dateFormatters')
const ShortUrl = require('../../models/shorturls')

const getSingleURLs = async(req, res) => {
    try {
        const shorturl = req.params.shorturl 
        const nullaled = nullality({shorturl})
    
        if (nullaled.nullaled){
            return res.status(400).json({
                message: "Invalid shorturl given",
                code: 61120
            })
        }

        //TODO: code for getting single url goes here, only authenticated and authorized users
        //TODO: implement unique clicks
        const oneShortUrl = await ShortUrl.findByPk(shorturl)
        if(!oneShortUrl){
            return res.status(404).json({
                message: "Short URL Not found"
            })
        }

        const newClickCount = oneShortUrl.clickCount + 1
        const newDateLastFetched = getFormattedDate()
        const updateBody = {
            clickCount: newClickCount,
            dateLastFetched: newDateLastFetched
        }
        console.log('about to update with new clickcounts and last fetch date')

        const updatedShortUrl = await oneShortUrl.update(updateBody)
        console.log('updated successfully', updatedShortUrl)

        return res.status(200).json(updatedShortUrl)
        
    }
    catch (e) {
        console.log('error getting url to search from data', e)
        return res.status(500).json({
            message: e,
            code: 61124
        })
    }

}


module.exports = getSingleURLs;