var client = require('./trial.js');

client.delete({
	index: 'user', 
	type: 'zaid', 
	id: 'AV0_tW-20y6eDCBQUuQz'
},function(err,resp,status) {  
  console.log(err);
  console.log("delete :\n" + resp.body);
});