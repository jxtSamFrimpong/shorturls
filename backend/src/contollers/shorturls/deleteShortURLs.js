const ShortUrl = require('../../models/shorturls')
const nullality = require('../../utils/nullality')

const deleteShortURLs = async(req, res) => {
    // if (!req.shortExists) {
    //     return res.status(404).json({
    //         message: "resource doesnt exist"
    //     })
    // }
    // shorturls[`${req.params.shorturl}`] = undefined

    // return res.status(200).json({
    //     message: "success"
    // })
    try{
        const shorturl = req.params.shorturl
        const nullaled = nullality({shorturl})
    
        if (nullaled.nullaled){
            return res.status(400).json({
                message: "Invalid shorturl given",
                code: 61122
            })
        }
        //TODO code for deleting shorturl: only authenticated and authorized user should be able to delete url
        const currentShortUrl = await ShortUrl.findByPk(shorturl)
        if(!currentShortUrl){
            return res.status(404).json({
                message: "URL Not found",
                status: "error"
            })
        }

        const deletedUrls = await currentShortUrl.destroy()
        console.log('delete rows', deletedUrls)

        return res.status(204).json({
            message: "deleted",
            status: "success"
        })
    }
    catch(e){
        console.log('error deleting shorturl', e)
        return res.status(500).json({
            message: "error deleting shorturl",
            code: 61123
        })
    }

}


module.exports = deleteShortURLs;