var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var elasticsearch=require('elasticsearch');

var client = new elasticsearch.Client( {
  hosts: ['http://localhost:9200']
});

app.use(bodyParser());

app.use('/Public',express.static(__dirname + '/public'));

//------------------------------------------------------
app.get('/login', function(req, resp) {
  resp.sendFile('/Public/html/login.html' , {root : __dirname});
});


app.get('/', function(req, resp) {
  resp.sendFile('/index.html' , {root : __dirname});
});

app.get('/data', function(req, resp) {
  client.search({
  index: 'user',
  type: 'notes'
},function (error, response, status) {
    if (error){
      console.log("search error: "+error)
    }
    else {
        resp.send(response.hits.hits);
    }
});	
});

//---------------------------------------------------------
app.post('/', function(req, resp){
  
	client.index({
  index: 'user',
  type: 'notes',
  body: req.body
	},function(err,resp,status) {
    console.log(resp);
	  });
  console.log("----- Req.body-----");
  console.log(req.body);
  console.log("----- Req.body-----");
  resp.send("done");
});

app.listen(1235, function(){
	console.log("Server is online")
});
