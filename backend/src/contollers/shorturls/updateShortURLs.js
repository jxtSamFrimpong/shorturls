const nullality = require('../../utils/nullality')
const ShortUrl = require('../../models/shorturls')
const deleteNullObjectKeys = require('../../middlewares/deleteNullObjectKeys')

const updateShortURLs = async(req, res) => {
    try{
        const shorturl = req.params.shorturl
        const nullaled = nullality({shorturl})
    
        if (nullaled.nullaled){
            return res.status(400).json({
                message: "Invalid shorturl given",
                code: 61120
            })
        }
        //TODO code to update shorturl: only authenticated and authorized(person who owns a url) should be able to update it

        const { url, description, type, categories, customTag, publicLink } = req.body

        const currentShortUrl = await ShortUrl.findByPk(shorturl)
        //console.log('current shorturl', currentShortUrl)
        if(!currentShortUrl){
            return res.status(404).json({
                message: "ShortURL not found"
            })
        }
        const updatedShortUrl = await currentShortUrl.update(deleteNullObjectKeys({ url, description, type, categories, customTag, publicLink }))
        console.log('updated shorturl', updatedShortUrl)
        return res.status(200).json({
            message: "updated successfully",
            status: "success"
        })



    }catch(e){
        console.log('error updating shorturl', e)
        //error handlers to handle the different types of errors
        return res.status(500).json({
            message: "Error Updating shorturl",
            code: 61121
        })
    }
}


module.exports = updateShortURLs;