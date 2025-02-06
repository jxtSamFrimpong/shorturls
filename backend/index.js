const express = require('express')
const cors = require('cors')

//data models
const shorturls = require('./src/models/shorturls')

//initialize app
const app = express()

//node middlewares
app.use(express.json())
app.use(cors())

//import custom middlewares
const unknownEndpoint = require('./src/middlewares/UnknownEndpoint')
const requestLogger = require('./src/middlewares/RequestLogger')
const validateBodyForNewURLs = require('./src/middlewares/ValidateBodyForNewURLs')
const validateBodyForUpdateURLs = require('./src/middlewares/ValidateBodyForUpdateURLs')
const validateExistenceOfShortURL = require('./src/middlewares/ValidateExistenceOfShortURL')

//set some of custom middlewares as default
app.use(requestLogger)

app.get('/api/urls', (req, res) => {
    //Get All short Urls
    //TODO: to get all short urls for a specific user
    //TODO: only return urls, redact other fields such as stats
    res.json(shorturls)
  })

app.get('/api/urls/:shortenedurl', (req, res)=> {
    const urlToSearch = req.params.shortenedurl
    console.log('url to search', urlToSearch)

    try{
        const shorturl = shorturls[`${urlToSearch}`]

        console.log('searching for url within shotend urls', shorturls[`${urlToSearch}`])
        console.log('short url returned', shorturl)

        if (shorturl){
            console.log(true)
            console.log('url retrieved', shorturl)
            shorturls[`${urlToSearch}`].clickCount = shorturls[`${urlToSearch}`].clickCount + 1
            return res.status(200).json({
                url: shorturls[`${urlToSearch}`].url
            })
        }
        else{
            return res.status(404).json({
                message: "Not Found, Short URL hasn't been created yet or permanently deleted"
            })
        }
    }
    catch(e){
        console.log('error getting url to search from data', urlToSearch, e)
        return res.status(500).json({
            message: e
        })
    }
    
})

//TODO: type for linktree links
app.post('/api/urls', [validateBodyForNewURLs, validateExistenceOfShortURL], (req, res)=> {
    const body = req.body
    const { url, shorturl } = req.body
    if (req.shortExists){
        return res.status(409).json({
            message: "SHORT URL already exists"
        })
    }
    shorturls[`${shorturl}`] = {
        url,
        clickCount: 0,
        uniqueClicks: null,
        description: null,
        socialShares: 0,
        type: null,
        dateCreated: null,
        dateLastUpdated: null,
        dateLastFetched: null,
        dateExpiry: null,
        userId: null,
        premieredLink: false,
        categories: [],
        customTag: [],
        publicLink: true,
        whitelistOrigins: null,
        blackListOrigins: null
    }
    return res.status(200).json({
        "url": url,
        "shorturl": shorturl
    })
})

app.put('/api/urls/:shorturl', [validateBodyForUpdateURLs, validateExistenceOfShortURL], (req, res) => {
    if (!req.shortExists){
        console.log('does the shorturl exist ?', req.shortExists)
        return res.status(404).json({
            message: "SHORT URL doesn't exist"
        })
    }
    const oldurl = shorturls[`${req.params.shorturl}`].url
    shorturls[`${req.params.shorturl}`].url = req.body.newurl

    return res.status(200).json({
        message: "success",
        oldurl: oldurl,
        newurl: shorturls[`${req.params.shorturl}`].url
    })
} )

app.delete('/api/urls/:shorturl', [validateExistenceOfShortURL, ], (req, res)=> {
    if (!req.shortExists){
        return res.status(404).json({
            message: "resource doesnt exist"
        })
    }
    shorturls[`${req.params.shorturl}`] = undefined

    return res.status(200).json({
        message: "success"
    })
})

app.get('/api/urlstats/:shorturl', [validateExistenceOfShortURL], (req, res)=> {
    if (!req.shortExists){
        return res.status(404).json({
            message: "URL doesnt exist"
        })
    }
    return res.status(200).json({
        clickCount: shorturls[`${req.params.shorturl}`].clickCount,
        uniqueClicks: shorturls[`${req.params.shorturl}`].uniqueClicks,
        url: shorturls[`${req.params.shorturl}`].url



    })
})






const PORT = 3001

app.use(unknownEndpoint)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})