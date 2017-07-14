$(document).bind("contextmenu", function (event) {
    event.preventDefault();    
});



$(document).ready(function(){

$('#data_add').click(function(e){
    	var curr_usr_str = document.cookie;
      var curr_usr_json = {"id" : curr_usr_str.substring(3,curr_usr_str.length)};

      $.ajax({
            url: '/delete',
            data: curr_usr_json,
            type: 'POST',

            success: function (data) {
              console.log("done!");
            },

            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
                
            },
        });

});	
/*
$('#delete_acc').click(function(e){
    
    window.location.href='/login';
});*/

$('#logout').click(function(e){
    window.location.href='/login';
});

$("#submit_note_button").click(function f(){
			var url = "/user";
      var curr_usr_str = document.cookie;
      var curr_usr_json = curr_usr_str.substring(3,curr_usr_str.length);


    		var data_note = $('#data_add').val();
    		var data_title = $('#title_add').val();
    		var date_date = new Date();
    		
    		var json_data = {
          "id" : curr_usr_json,
    			"Title" : data_title,
    			"Note" : data_note,
    			"Date": date_date
    		};
    		console.log(json_data);
    		$.post(url, json_data).done(function (req, resp) {
        		console.log(resp);
            //alert(resp);
    		});

    		$('#data_add').val('');
        $('#title_add').val('');

});


$("#load_data_button").click(function loadDoc() {

      var curr_usr_str = document.cookie;
      var curr_usr_json = {"id" : curr_usr_str.substring(3,curr_usr_str.length)};
  
      $.ajax({
            url: '/data',
            data: curr_usr_json,
            type: 'POST',
            
            //jsonpCallback: 'callback', // this is not relevant to the POST anymore
            success: function (data) {
                //console.log(data);
                
                var length = data.length;
                //console.log(data[0]);
                
                for (i=0;i<length;i++){
        
                  var str = '<li> <div id="data_title'+ i +'" class="data_title" >' + data[i]._source.Title + '</div> <div id="data_note'+ i +'" class="data_note" >' + data[i]._source.Note + '</div> <div id="data_date'+ i +'" class="data_date">' + data[i]._source.Date + '</div> </li>';
                  $("#demo").append(str);
                    
                } 

                $(".data_title").click( function(){
                  console.log("clicked");
                  $(this).siblings('.data_note').slideToggle("slow");
                  $(this).siblings('.data_date').slideUp("slow");
                });

                $(".data_note").click( function(){
                  $(this).siblings('.data_date').slideToggle("slow");
                });

                $(".data_title").mousedown(function(event) {
                  if (event.which == 3) {
              
                    if (confirm('Do you wan\'t to delete this note?')) {
                      var id_title = $(this).attr('id');
                      var id = id_title.substring(id_title.length-1);
                      console.log(id);
                      $(this).siblings('.data_date').hide();
                      $(this).siblings('.data_note').hide();
                      $(this).hide();
                  }
            
                  }
                });
            },

            error: function (xhr, status, error) {
                console.log('Error: ' + error.message);
                
            },
        });
       
      var x = document.getElementById("demo");
      
      
      $("#demo").empty();
      $("#title").val("");
      
  });

});