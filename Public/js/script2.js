$(document).bind("contextmenu", function (event) {
    event.preventDefault();    
});

$(document).ready(function(){

  $('#logout').click(function(e){
    window.location.href='/login';
  });

  $("#submit_note_button").click(function f(){
			var url = "/data/insert";
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


  $("#load_data_button").click(function() {

    
    var button_str = $(load_data_button).html();
    var curr_usr_str = document.cookie;
    var curr_usr = curr_usr_str.substring(3,curr_usr_str.length);
    var curr_usr_json = {"id" : curr_usr_str.substring(3,curr_usr_str.length)};

    if(button_str == "View Your Notes"){
      $(load_data_button).html("Refresh !!");
    }

      $.ajax({
        url: '/data/retrieve',
        data: curr_usr_json,
        type: 'POST',
            
        success: function (data) {
          var length = data.length;
                
          for (i=0;i<length;i++){
            var str = 
                  '<li>'+
                  '<textarea db_id="' + data[i]._id + '" id="data_title'+ i +'" class="data_title" ></textarea>' +
                  '<textarea id="data_note'+ i +'" class="data_note" ></textarea>'+
                  '<textarea id="data_date'+ i +'" class="data_date"></textarea>'+
                  '</li>';


            $("#demo").append(str);
            $('#data_title'+i).val(data[i]._source.Title);
            $('#data_note'+i).val(data[i]._source.Note);
            $('#data_date'+i).val(data[i]._source.Date);
                    
          } 
          
          $(".data_title").click( function(){
            $(this).siblings('.data_note').slideToggle("slow");
            $(this).siblings('.data_date').slideUp("slow");
          });

          $(".data_note").click( function(){
            $(this).siblings('.data_date').slideToggle("slow");
          });

          $(".data_title").mousedown(function(event) {
            
            if (event.which == 3){
              
              if (confirm('Do you wan\'t to delete this note?')) {
                  
                //$(this).siblings('.data_date').hide();
                //$(this).siblings('.data_note').hide();
                //$(this).hide();
                  
                var clicked_id = $(this).attr('db_id');
                del_ajaxcall(clicked_id,curr_usr);

                $(this).siblings('.data_date').remove();
                $(this).siblings('.data_note').remove();
                $(this).remove();
              }
            }
          });
        },

        error: function (xhr, status, error) {
          console.log('Error: ' + error.message);
        },
      });
          
      $("#demo").empty();
      $("#title").val("");
      
  });
 

  $("#save_data_button").click(function() {     
    var curr_usr_str = document.cookie;
    var curr_usr = curr_usr_str.substring(3,curr_usr_str.length);
    var arr = [];
    var length = $('.data_title').length;

    for(i=0;i<length;i++){
      var id = $('#data_title'+i).attr('db_id');
        arr.push({
          'id' : id,
          'Title' : $('#data_title'+i).val(),
          'Note' : $('#data_note'+i).val(),
          'Date' : $('#data_date'+i).val()
        });
    }

    var update = {  'id' : curr_usr,
                    'size' : length,
                    'notes' : arr
                  };

    console.log(update);
          
    $.ajax({
      url: '/data/update',
      data: update,
      type: 'POST',

      success: function (data) {
        console.lod("updated");
      },

      error:function (xhr, status, error){
        console.log('Error: ' + error.message);
      },
    });

  });

  

  function del_ajaxcall(title,user){
    
    $.ajax({
      type: 'POST',
      url: 'data/delete',
      data: {'type' : user,
            'id' : title
            },
      success: function (data) {
        console.log("done!");
      },

      error: function (xhr, status, error) {
        console.log('Error: ' + error.message);  
      },
    });

  }

});