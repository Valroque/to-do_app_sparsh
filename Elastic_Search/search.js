var client = require('./trial.js');

client.search({
  index: 'user',
  type: 'Sparsh',
  body: {
    "query": {
      "bool": {
        "should": [
          { "match": { "titl":  "War and Peace" }},
          { "match": { "author": "Leo Tolstoy"   }}
        ]
      }
    },
  }
},function (error, response) {
    if (error){
      console.log("search error: "+error)
    }
    else {
      /*console.log("--- Response ---");
      console.log(response);
      console.log("--- Hits ---");*/
      console.log(JSON.stringify(response));
      response.hits.hits.forEach(function(hit){
        console.log(hit);
      })
    }
});
