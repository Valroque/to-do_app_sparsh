var client = require('./trial.js');

client.search({
  index: 'user',
  type: 'zaid',
},function (error, response, status) {
    if (error){
        console.log("search error: "+error);
    }
    else {
        response.hits.hits.forEach(function(hit){
          console.log(hit);
        })
    }
});
