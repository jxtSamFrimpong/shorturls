const nullality = require('../../utils/nullality')
const {getFormattedDate, validateAndFormatDate} = require('../../utils/dateFormatters')
const UserModel = require('../../models/users')

const validateBodyForNewURLs = async(req, res, next) => {
    try{
        console.log('grabbing payload')
    const {
        shorturl,
        url,
        dateCreated,
        dateLastUpdated,
        dateLastFetched,
        userId: id,
        categories,
        customTag
    } = req.body;
    console.log('checking for non nullable fields')
    const nullaled = nullality({shorturl, url, userId: id})
    console.log('checked for non nullable fields', nullaled)
    if (nullaled.nullaled){
        res.status(400).json({
            message: "Non nullable Fields must be initialized",
            fields: nullaled.results
        })
    }
    
    
    req.body.dateCreated = dateCreated ? validateAndFormatDate(dateCreated): getFormattedDate()
    req.body.dateLastUpdated = dateLastUpdated ? validateAndFormatDate(dateLastUpdated): getFormattedDate()
    req.body.dateLastFetched= dateLastFetched ? validateAndFormatDate(dateCreated): getFormattedDate()

    const user_payment_tier = await UserModel.scope('addShortURL').findByPk(id)
    const now = new Date()
    const futureDate = new Date(now);
    switch(user_payment_tier){
        case 'free':
            futureDate.setDate(now.getDate() + 90);
            req.body.dateExpiry = validateAndFormatDate(futureDate)
            req.body.rateLimits = 10
            break;
        case 'classic': 
            futureDate.setDate(now.getDate() + 270);
            req.body.dateExpiry = validateAndFormatDate(futureDate)
            req.body.rateLimits = 50
            break;
        case 'premium':
            req.body.dateExpiry = null
            req.body.rateLimits = null
        default:
            futureDate.setDate(now.getDate() + 90);
            req.body.dateExpiry = validateAndFormatDate(futureDate)
            req.body.rateLimits = 10
    }

    //setting defaults
    req.body.categories = categories || {}
    req.body.customTag = customTag || {}
    

    
    next()
    }
    catch(e){
        console.log('error validating payload')
        return res.status(500).json({
            message: 'error validating payload',
            code: 61125
        })
    }
}

module.exports = validateBodyForNewURLs;