var client = require('./trial.js');

client.index({  
  index: 'user',
  type: 'zaid',
  id:'1',
  body: {
    "Title" : "Spah",
    "Note" : "Jain",
    "Date" : "234"
  }
},function(err,resp,status) {
    console.log(resp);
});