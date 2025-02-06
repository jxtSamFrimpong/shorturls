const shorturls = {
    "amblical": {
        url: "example.com",
        clickCount: 0,
        uniqueClicks: 0,
        stats: {
            referrerInformation: null,
            geoLocation: null,
            userAgent: null,
            ipAddress: null,
            dateOfVisit: null,
            deviceType: null,
            browserType: null,
            clickThroughRate: null, //READ MORE ON THIS IMPLEMENTATION
            bounceRate: null, //READ MORE ON THIS IMPLEMENTATION
        },
        description: null,
        socialShares: 0,
        backlinks: [], //READ MORE ON THIS IMPLEMENTATION
        type: "direct", //ENUM direct or linkSet
        dateCreated: null,
        dateLastUpdated: null,
        dateLastFetched: null,
        dateExpiry: null,
        editHistory: [],
        userId: null,
        paymentTier: null, 
        premieredLink: false,
        premieres: {
            datePremiered: null,
            premieredMessage: [], /* should be its own table
            with its own ids and premieredMessageOrderNumber
            premeir message can be a text, picture, video
            */
        },
        /* PAYMENT TIER should be tied to the user and not the link, 
        but affects many properties of he link, 
        free users cant create linkSet links, 
        have a max number of links to create and more */
        categories: [], /*  SHOULD BE AN ENUM
        comma separated list of predefined categories
        exception: would not be its own table, would be part of shorturls
        */
        customTag: [], /* FOR categories not in category
        comma separated list of custom tags,
        exception: would not be its own table, would be part of shorturls
        */
       publicLink: true,
       whitelistOrigins: {

       },
       blackListOrigins: {},
       rateLimits: 10 /*
       to be used to implement rate limiting based on the user payment tier, 
       default is 100rpm, 
       can increased up to the limit of the user
       would be set on both user table and short url's table */
    },
    "diamond": {
        url: "web3.com",
        clickCount: 0,
        type: "direct",
        dateCreated: null,
        dateLastUpdated: null,
        dateLastFetched: null,
        userId: null,
        paymentTier: null
    },
    "google": {
        url: "http://www.google.com/",
        clickCount: 0,
        type: "direct",
        dateCreated: null,
        dateLastUpdated: null,
        dateLastFetched: null,
        userId: null,
        paymentTier: null
    }
}

module.exports = shorturls