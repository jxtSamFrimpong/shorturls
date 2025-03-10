const deleteNullObjectKeys = (obj)=> {
    const objKeys = Object.keys(obj)


    objKeys.map(i => {
        if (obj[`${i}`] === null || obj[`${i}`] === undefined){
            delete obj[`${i}`]
        }
    })
    console.log('obj without nulls',obj)
    return obj
}

module.exports = deleteNullObjectKeys;