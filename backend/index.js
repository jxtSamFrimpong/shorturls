const express = require('express')
const app = express()
app.use(express.json())

const shorturls = {
    "amblical": "example.com",
    "diamond": "web3.com",
    "google": "http://www.google.com/"
}

app.get('/shorturls', (req, res) => {
    //Get All short Urls
    //TODO: to get all short urls for a specific user
    res.json(shorturls)
  })

app.get('/:shortenedurl', (req, res)=> {
    const urlToSearch = req.params.shortenedurl
    console.log('url to search', urlToSearch)

    try{
        const shorturl = shorturls[`${urlToSearch}`]

        console.log('searching for url within shotend urls', shorturls[`${urlToSearch}`])
        console.log('short url returned', shorturl)

        if (shorturl ){
            console.log(true)
            console.log('url retrieved', shorturl)
            // return res.json(
            //     {
            //         url: shorturl
            //     }
            // )
            return res.status(309).redirect(shorturl)
        }
    }
    catch(e){
        console.log('error getting url to search from data', urlToSearch)
    }
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})