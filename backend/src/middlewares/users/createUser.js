const checkNullalityOfNonNullableFields = require('../../utils/nullality')
const { getFormattedDate, validateAndFormatDate } = require('../../utils/dateFormatters')
const dateComparator = require('../../utils/dateComparator')

const validateUserCreationBody = (req, res, next)=> {
    const { paymentTier, rateLimits, dateCreated, fname, lname, passwd, email } = req.body

    const nullality = checkNullalityOfNonNullableFields({fname, lname, passwd, email})
    if ( nullality.nullaled ){
        console.log("Non-Nullable fields have not been initialized", nullality.results)
        return res.status(400).json({
            message: 'Non-Nullable fields have not been initialized',
            fields: nullality.results
        })
    }

    switch(paymentTier){
        case 'free':
            if (rateLimits > 20){
                console.log('rate limits for free tier users cannot be more than 20')
                return res.status(400).json({
                    message: 'wrong value rate limits: free tier user'
                })
            }
            break;
        case 'classic': 
            if (rateLimits > 80){
                console.log('rate limits for classis tier users cannot be more than 80')
                return res.status(400).json({
                    message: 'wrong value rate limits: classic tier user'
                })
            }
            break;
        case 'premium': 
            if (rateLimits > 200){
                console.log('rate limits for premium users cannot be more than 200')
                return res.status(400).json({
                    message: 'wrong value rate limits: premium tier user'
                })
            }
            break;
        case null:
            req.body.paymentTier = 'free'
            req.body.rateLimits = 20
            break;
        case undefined:
            req.body.paymentTier = 'free'
            req.body.rateLimits = 20
            break;
        default:
            if (paymentTier !== null || paymentTier !== undefined){
                console.log('unacceptable paymentTier: ', paymentTier)
                return res.status(400).json({
                    message: 'unacceptable paymentTier, should be either of free, classic or premium',
                    paymentTier
                })
            }
    }
    
    if (rateLimits === null || rateLimits === undefined){
        switch (paymentTier){
            case 'free': 
                req.body.rateLimits = 20
                break;
            case 'classic':
                req.body.rateLimits = 80
                break;
            case 'premium':
                req.body.rateLimits = 200
                break;
            default:
                req.body.rateLimits = 20
        }
    }

    if (dateCreated === null || dateCreated === undefined){
        req.body.dateCreated = getFormattedDate()
    }
    else {
        try {
            req.body.dateCreated = validateAndFormatDate(dateCreated);
            if (dateComparator(req.body.dateCreated)){
                console.log('date is not in the future')
            }else{
                return res.status(400).json({
                    message: "Date is in the future"
                })
            }
        }catch(e){
            console.log('validate and formate date error', e)
            return res.status(500).json({
                message: e
            })
        }
    }

    next()


}


module.exports = validateUserCreationBody;

