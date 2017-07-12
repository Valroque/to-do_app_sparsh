var client = require('./trial.js');

client.indices.delete({index: 'user'},function(err,resp,status) {  
  console.log("delete :\n",resp);
});