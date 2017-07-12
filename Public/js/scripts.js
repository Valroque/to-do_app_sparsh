$(document).ready(function(){

$('#data_add').submit(function(e){
    	return false;
});	


$("#submit_note_button").click(function f(){
			var url = "/";

    		var data_note = $('#data_add').val();
    		var data_title = $('#title_add').val();
    		var date_date = new Date();
    		
    		var json_data = {
    			"Title" : data_title,
    			"Note" : data_note,
    			"Date": date_date
    		};
    		console.log(json_data);
    		$.post(url, json_data).done(function (req, resp) {
        		alert(resp);
    		});

    		$('#data_add').val('');
        $('#title_add').val('');

});


$("#load_data_button").click(function loadDoc() {

  var xhttp;

  if (window.XMLHttpRequest) {
    // code for modern browsers
    xhttp = new XMLHttpRequest();
  } else {
    // code for IE6, IE5
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }


  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var x = document.getElementById("demo");
      var obj = JSON.parse(this.responseText);
      var length = Object.keys(obj).length;
      
      $("#demo").empty();
      $("#title").val("");
      //$("#demo").append('<li>Note : </li>');

      //console.log(typeof(obj));
      for (i=0;i<length;i++){
      	//var str = '<b> Title: </b>' + obj[i]._source.Title; + '<b> Note: </b>' + obj[i]._source.Note + '<b> Date: </b>' + obj[i]._source.Date;
		    var str = '<li> <div id="data_title'+ i +'" onclick="clicked(this.id)">' + obj[i]._source.Title + '</div> <div id="data_note'+ i +'" onclick="clicked(this.id)" class="hide1">' + obj[i]._source.Note + '</div> <div id="data_date'+ i +'" class="hide2">' + obj[i]._source.Date + '</div> </li>';
        $("#demo").append(str);
        console.log(str);
      
      } 
      //console.log(this);
      /*
      for(i=0;i<length;i++){
       
        $("#data_title" + i).click(function(){
            console.log("clicked" + 3);
            $("#data_note" + 3).slideToggle("slow");
        });
        $("#data_note" + 3).click(function(){
            console.log("clicked" + 3);
            $("#data_date" + 3).slideToggle("slow");
        });
      }*/
    }
    
  };

  xhttp.open("GET","http://localhost:1235/data", true);
  xhttp.send();

});

function clicked(id){
console.log("ghost");
/*
$("#"+id).lick(function(){
            console.log("clicked" + 3);
            $("#data_"+typeto+id.slice(-1)).slideToggle("slow");
        });
}*/
}

});