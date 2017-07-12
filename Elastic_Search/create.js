var client = require('./trial.js');

client.indices.create({  
  index: 'user'
},function(err,resp,status) {
  if(err) {
    console.log(err);
  }
  else {
    console.log("create :\n",resp);
  }
});