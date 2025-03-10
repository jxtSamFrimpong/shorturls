const sequelize = require('./database')
const health_statuses = require('./statuses')

const sync_db = async()=> {
    try {
        await sequelize.sync()
        console.log('DB synced successfully');
        health_statuses.isDBSynced = true
    }
    catch (e){
        console.log('DB failed to sync', e)
    }
}


module.exports = sync_db