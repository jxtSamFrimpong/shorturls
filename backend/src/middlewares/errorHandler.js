const errorHandler = (err, req, res, next)=> {
    try{
        console.log("tpeof", typeof err)
        console.log("error kes", Object.keys(err))
        console.log("error name", err.name)
        // console.log("error errors", err.errors)
        console.log("contains checker", Object.keys(err).includes("errors"))
        if (typeof err === "string"){
            console.error('error', err)
            return res.status(500).json({
                message: err,
                code: 61126
            })
        }
        if (Object.keys(err).includes("name")){
            console.log("there is name in object")
            switch (err.name){
                case 'SequelizeUniqueConstraintError':
                    const alreadyExistingObjs = err.errors.map((i)=> {
                        // console.error('error details',i)
                        return {
                            type: i.type,
                            value: i.value,
                            path: i.path
                        }
                    })
                    return res.status(409).json({
                        message: "Key Already Exist",
                        code: 61127,
                        data: alreadyExistingObjs
                    })
            }
        }
        if (Object.keys(err).includes("errors")){
            console.log("there is errors in the obect")
            return res.status(500).json(
                {
                    message: "Operation Failed",
                    data: err.errors.map((i)=> {
                        // console.error('error details',i)
                        return {
                            errorType: i.type,
                            value: i.value,
                            path: i.path
                        }
                    })
                }
            )
        }
        console.log("none")
        // console.error('error', err)
        //     return res.status(500).json({
        //         message: err,
        //         code: 61127
        //     })

    }catch(e){
        //console.error('Am error was thrown while handling another error', e)
        console.error("An error was thrown while handling another error", e)
        res.status(500).send('An error was thrown while handling another error')
    }

    next(err)
}

module.exports = errorHandler;