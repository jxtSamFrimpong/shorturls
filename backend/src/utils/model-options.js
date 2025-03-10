const modelOptionsGen = (tablename)=> {
    return {
        //schema: 'shorturls',
        schema: 'public',
        tableName: tablename,
        timestamps: false,
        freezeTableName: true
    }
}

module.exports = modelOptionsGen;