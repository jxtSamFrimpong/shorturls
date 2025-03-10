const dateComparator = (my_date)=> {
    //TODO: use typescript to check my_date is a Date
    try{
        const now = new Date()
        const parsed_my_date = new Date(my_date)
        return now.getTime() >= parsed_my_date.getTime()
    }
    catch(e){
        console.log('error checking date', e)
        throw new Error(`Error validating dateCreated ${e}`)
    }
}

module.exports = dateComparator