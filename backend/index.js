const app = require('./app')
const sequelize = require('./src/utils/database')
const { PORT } = require('./src/utils/config')


sequelize.authenticate().then(()=>{
    console.log('Connection to the database has been established successfully.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}
).catch(e => {
    console.log('application failed to start, couldn\'t connect to db')
})