const health_statuses = require('../utils/statuses')

const healthController = (req, res)=> {
    console.log('health-controller received: ', health_statuses)
    const relevantStatuses = Object.keys(health_statuses)
    
    const relevantStatusesFailed = relevantStatuses.filter(i => health_statuses[i] == false )

    if (relevantStatusesFailed.length > 0){
        return res.status(500).json({
            "message": `health checks failed for ${relevantStatusesFailed}`
        })
    }
    return res.status(200).send('healthy');

}


module.exports = healthController;