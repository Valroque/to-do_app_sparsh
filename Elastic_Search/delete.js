var client = require('./trial.js');

client.indices.delete({index: 'login'},function(err,resp,status) {  
  console.log(err);
  console.log("delete :\n",resp);
});