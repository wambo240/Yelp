//'use strict';

const yelp = require('yelp-fusion');
const functions = require('firebase-functions');
const cors = require('cors')({origin: true});

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'ssMQfPkzr-JuIny0bnkK9zbQ_ynmV12-3OV_FIVchHexvP_9Dso-WAO0VWCZyATbV9FGcqe8DqLukwVWxgFcTfb_IFhXjI0e49RKitMQ5n8hAvqWOMvZ1rtLPHXTX3Yx';

const client = yelp.client(apiKey);

exports.helloWorld = functions.https.onRequest((req, res) => {
  functions.logger.info("Hello World!", {structuredData: true});

  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', '*');

  
   if (req.method === 'OPTIONS') {
     res.end();
    }
    else{
    res.status(200).send({data: "{msg: Hello Kumar}"});
    }
});

exports.yelpSearch = functions.https.onRequest((req, res) => {
  functions.logger.info("Hello yelp!", {structuredData: true});
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', '*');

  
   if (req.method === 'OPTIONS') {
     res.end();
    }
  else{

    var str_term = req.body.data.term;
    var str_location = req.body.data.location
    functions.logger.info("term: "+  str_term+ " location:"+str_location, {structuredData: true});
    
    const searchRequest = {
      term: str_term,
      location: str_location
    };
    client.search(searchRequest).then(response => {
      const result = response.jsonBody.businesses;
      const prettyJson = JSON.stringify(result, null, 4);
      res.status(200).send({data: prettyJson});
      return prettyJson;
    }).catch(e => {
      console.log(e);
      res.status(400).send({data: "{msg: error!}"});
      return e;
    });
  }
});


