var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var elasticsearch=require('elasticsearch');
var cookieParser = require('cookie-parser');
var client = new elasticsearch.Client( {
  hosts: ['http://localhost:9200']
});

app.use(bodyParser());
app.use(cookieParser());
app.use('/Public',express.static(__dirname + '/public'));


//-----------------Get Requests--------------------------


app.get('/login', function(req, resp) {
  resp.sendFile('/Public/html/login.html' , {root : __dirname});
});

app.get('/app', function(req, resp) {
  resp.sendFile('/index.html' , {root : __dirname});
});

app.get('/logout', function(req, resp) {
  resp.clearCookie("id").sendFile('/Public/html/login.html' , {root : __dirname});
});


//-----------------Post Requests-------------------------



app.post('/data/update', function(req, resp){
  
  for(i=0;i<req.body.size;i++){
    client.index({
      index: 'user',
      type: req.body.id,
      id: req.body.notes[i].id,
      body: {
        "Title" : req.body.notes[i].Title,
        "Note" : req.body.notes[i].Note,
        "Date" : req.body.notes[i].Date
      }
      },function(err,resp,status) {
        if(err){console.log(err)};
      });
  }

});

app.post('/data/delete', function(req, res) {
  client.delete({
    index: 'user', 
    type: req.body.type, 
    id: req.body.id
    },function(err,resp,status) {  
      if(err){
        console.log(err);
      } else {
        res.send("successful");
      }
    });
});

app.post('/data/retrieve', function(req, resp) {
  client.search({
    index: 'user',
    type: req.body.id
    },function (error, response, status) {
      if (error){
        console.log("search error: "+error)
      }
      else {
        resp.send(response.hits.hits);
      }
  }); 
});

app.post('/data/insert', function(req, resp){
   
  var data = {"Title" : req.body.Title,
              "Note" : req.body.Note,
              "Date": req.body.Date
              }

	client.index({
  index: 'user',
  type: req.body.id,
  body: data
	},function(err,resp,status) {
    if(err){console.log(err)};
	  });

  resp.send("done");

});

app.post('/login', function(req, resp){
  
  var obj = { "id" : req.body.id, "password" : req.body.password };
  var user = { "password" : req.body.password };  

  client.search({
  index: 'login',
  type: obj.id,
  body: {
    query: {
      match: {"password" : obj.password}
    },
  }
  },function (error, response, status) {
      
    if(error){
      console.log(error); 
    }

    else{
      console.log(response);

      if (response.hits.total == 0){ 
      
        if(req.body.req_type == "submit"){
        
          console.log("\nSubmit request Recceived");
        
          client.index({
            index: 'login',
            type: obj.id,
            id : obj.id,
            body: user
            },function(err1,resp1,status1) {
                console.log(resp1);
          });

          resp.cookie('id', obj.id).send({"custom_response": "not_found"});
        }
        else{
          resp.send({"custom_response": "not_found"});
        }
      }
    
      else {
        if(req.body.req_type == "login"){
            //resp.send({"custom_response": "found"});
            resp.cookie('id', obj.id).send({"custom_response": "found"});
        }
        else{
            resp.send({"custom_response": "found"});
        }
      }
    }
  });
});

app.listen(1235, function(){
	console.log("Server is online")
});
