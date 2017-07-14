$(document).ready(function(){

	
	$("#login_button").click(function loadDoc(){
		console.log("Login Clicked");
		var id_val = $("#id").val();
		var password_val = $("#password").val();
		if( id_val != "" && password_val != ""){
			var url_send = "/login";

    		var id = $('#id').val();
    		var password = $('#password').val();
    		var req_type = "login"

    		$('#data_add').val('');
        	$('#title_add').val('');
    		
    		var json_data = {
    			"id" : id,
    			"password" : password,
    			"req_type" : req_type 
    		};
    		console.log(json_data);

    		$.ajax({
        		url: url_send,
        		data: json_data,
        		type: 'POST',
        		
        		//jsonpCallback: 'callback', // this is not relevant to the POST anymore
        		success: function (data) {
            		console.log(data);
            		if(data.custom_response == "found"){
        				console.log("got in");
        				window.location.href='/';
        			}
        		
        			else {
        				$("#status").text("Sorry, either id or password was wrong!");
        			}

        		},

        		error: function (xhr, status, error) {
            		console.log('Error: ' + error.message);
            		
        		},
    		});	
		}
		else{
			$("#status").text("Sorry, either of the fields were left blank.");
			$("#id").val("");
			$("#password").val("")
		}
	});
	
	$("#signup_button").click(function(){
		console.log("Submit Clicked");
		var id_val = $("#id").val();
		var password_val = $("#password").val();
		var response_obj;
		if( id_val != "" && password_val != ""){
			var url_send = "/login";

    		var id = $('#id').val();
    		var password = $('#password').val();
    		var req_type = "submit"
    		
    		$('#data_add').val('');
        	$('#title_add').val('');

    		var json_data = {
    			"id" : id,
    			"password" : password,
    			"req_type" : req_type
    		};
    		console.log(json_data);

    		$.ajax({
        		url: url_send,
        		data: json_data,
        		type: 'POST',
        		
        		//jsonpCallback: 'callback', // this is not relevant to the POST anymore
        		success: function (data) {
            		console.log(data);
            		if(data.custom_response == "not_found"){
        				console.log("got in");
        				window.location.href='/';
        			}
        		
        			else {
        				$("#status").text("Sorry, user already exists.");
        			}

        		},

        		error: function (xhr, status, error) {
            		console.log('Error: ' + error.message);
            		
        		},
    		});	
    		
		}
		else{
			$("#status").text("Sorry, either of the fields were left blank.");
			$("#id").val("");
			$("#password").val("")
		}


	});
});