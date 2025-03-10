const checkNullalityOfNonNullableFields = obj => {
    const results = Object.keys(obj).filter(item => {
      console.log(obj[`${item}`] === null || obj[`${item}`] === undefined);
      if (obj[`${item}`] === null || obj[`${item}`] === undefined) {
        return true;
      } else {
        return false;
      }
    });
  
    return {
      results,
      nullaled: results.length > 0,
    };
  };

module.exports = checkNullalityOfNonNullableFields;