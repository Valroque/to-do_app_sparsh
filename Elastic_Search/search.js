var client = require('./trial.js');

client.search({
  index: 'user',
  type: 'notes',
  /*body: {
    query: {
      match: { ".+": ".+" }
    },
  }*/
},function (error, response, status) {
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
