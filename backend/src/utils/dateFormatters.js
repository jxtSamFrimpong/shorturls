const getFormattedDate = ()=> {
    const now = new Date(); 
    console.log('date generated: ', now.toISOString().replace("T"," ").substring(0, 19))
    return now.toISOString().replace("T"," ").substring(0, 19);
  }

const validateAndFormatDate = (givenDate) => {
    const given_date = new Date(givenDate)
    if (isNaN(given_date.getTime())){
        throw new Error('InvalidDateError')
    }

    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    if (regex.test(givenDate)){
        if (givenDate instanceof Date){
            return givenDate
        }
        else{
            return new Date(givenDate).toISOString().replace("T"," ").substring(0, 19)
        }
        
    }
    else {
        return given_date.toISOString().replace("T"," ").substring(0, 19);
    }
}


module.exports = {
    validateAndFormatDate,
    getFormattedDate
}
