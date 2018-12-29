$( document ).ready(function() {
	
    $("#Submit").click(function(event) {
		
		event.preventDefault();
		ajaxPost();
    //setInterval("ajaxPost()", 1000);
	});

    

    function ajaxPost(){
    		firstname = $("#firstname").val();
    		lastname  = $("#lastname").val();
    		email 	  = $("#email").val();
    		gender 	  = $('input[id="gender"]:checked').map(function(){
                    return $(this).val();
                     }).get();
    		contact	  = $("#contact").val();
    		subject	  = $('input[id="subject"]:checked').map(function(){
                    return $(this).val();
                    }).get();
    					
    		imageURL  = $("#image")[0].files[0];

    		var formData = new FormData();
    		formData.append('firstname', firstname);
    		formData.append('lastname', lastname);
    		formData.append('email', email);
    		formData.append('gender', gender);
    		formData.append('contact', contact);
    		formData.append('subject', subject);
    		formData.append('imageURL', imageURL);
    			
    	
    	// {firstname, lastname, email, gender, contact, subject, imageURL}
    	
    	$.ajax({

      async: true,
			type : "POST",
			url : window.location + "api/users/save",
			data : formData,
			dataType: 'JSON',
			cache: false,
      contentType: false,
      processData: false,
			success : function(user){
				$("#postResultDiv").html("<h1 style='font-size: 14px; font-style: initial;''>" + 
					"Data Saved Successfully! " +
					" " + user.firstname + " " + user.lastname + "</h1>");
       location.reload();
			},
			error : function(e) {  
				alert("Error!");
				console.log("ERROR: ",+e);
			}
		});
    	
    	resetData();
    }

    $('#fn').hide();
    $('#ln').hide();
    $('#emailID').hide();
    $('#sex').hide();
    $('#contactno').hide();
    $('#imageID').hide();
    $('#sub').hide();

	var fn_err = true;
	var ln_err = true;
	var email_err = true;
	var sex_err = true;
	var contact_err =true;
	var image_err = true;
	var sub_err =true;



	$("#firstname").keyup(function(){
		userFN();
	});

	$('#lastname').keyup(function(){
		userLN();
	});

	$('#email').keyup(function(){
		userEmailID();
	});

	$('#contact').keyup(function(){
		userContact();
	});

	$('#Submit').click(function(){

		userGender();

	});

	$('#Submit').click(function(){

		userImage();

	});

	$('#Submit').click(function(){
		userSubject();
	});

	



	function userFN()
	{
		var name = /^[a-zA-Z]+$/;
		var fn = $('#firstname').val();

		if(fn.length == '')
		{
			$('#fn').show();
			$('#fn').html("Please enter First Name");
			$('#fn').focus();
			$('#fn').css("color", "red");

			fn_err = false;
			return  true;
		}
		else
		{
			$("#fn").hide();
		}
		if((fn.length == 0)||(!fn.match(name)))
		{
			$('#fn').show();
  			$('#fn').html("Please enter valid values only");
  			$('#fn').focus();
  			$('#fn').css("color", "red");
  			
  			fn_err = false;
  			return false;
  		}else
  		{
  			$('#fn').hide();
  		}
  		if((fn.length < 3 )||(fn.length > 10))
  		{
  			$('#fn').show();
  			$('#fn').html("Please enter First Name 3 between 10");
  			$('#fn').focus();
  			$('#fn').css("color", "red");
  			
  			fn_err = false;
  			return false;
  		}else{
  			$('#fn').hide();
  		}
	}
	function userLN()
	{
		var name = /^[a-zA-Z]+$/;
		var fn = $('#lastname').val();

		if(fn.length == '')
		{
			$('#ln').show();
			$('#ln').html("Please enter Last name");
			$('#ln').focus();
			$('#ln').css("color", "red");

			ln_err = false;
			return  true;
		}
		else
		{
			$("#ln").hide();
		}
		if((fn.length == 0)||(!fn.match(name)))
		{
			$('#ln').show();
  			$('#ln').html("Please enter valid values only");
  			$('#ln').focus();
  			$('#ln').css("color", "red");
  			
  			ln_err = false;
  			return false;
  		}else
  		{
  			$('#ln').hide();
  		}
  		if((fn.length < 3 )||(fn.length > 10))
  		{
  			$('#ln').show();
  			$('#ln').html("Please enter Last Name 3 between 10");
  			$('#ln').focus();
  			$('#ln').css("color", "red");
  			
  			fn_err = false;
  			return false;
  		}else{
  			$('#ln').hide();
  		}
	}

	function userEmailID(){

		var emailID = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  		var emailId = $('#email').val();

  		if ((emailId.length == 0 )||(!emailId.match(emailID)))
  		{
  			$('#emailID').show();
  			$('#emailID').html("Please enter valid Email Id");
  			$('#emailID').focus();
  			$('#emailID').css("color", "red");
  			
  			email_err = false;
  			return false;
  		}else
  		{
  			$('#emailID').hide();
  		}
	}

	function userGender()
	{
		{
  
  	var gender = $('input[type="radio"]').prop('checked', false);

  	if((gender.length == 0)||(gender.length > 1 ))	
  	{
  		$('#sex').show();
  			$('#sex').html("Please select Gender");
  			$('#sex').focus();
  			$('#sex').css("color", "red");
  			
  			sex_err = false;
  			return false;
  		}else{
  			$('#sex').hide();
  		
  	}
  }


}

function userContact()
{
			var num = /^[0-9]+$/;
	  		var mobile = $('#contact').val();

  		if ((mobile.length == 0 )||(mobile.length > 10 ))
  		{
  			$('#contactno').show();
  			$('#contactno').html("Contact No. must be 10 digit");
  			$('#contactno').focus();
  			$('#contactno').css("color", "red");
  			
  			contact_err = false;
  			return false;
  		}else{
  			$('#contactno').hide();
  		}
  		if (!mobile.match(num))
  		{
  			$('#contactno').show();
  			$('#contactno').html("Please enter valid Contact No:");
  			$('#contactno').focus();
  			$('#contactno').css("color", "red");
  			
  			contact_err = false;
  			return false;
  		}else{
  			$('#contactno').hide();
  		}

}

function userImage()
{
	var image = $('#image').val();
  	var file = $('#image')[0].files[0];

  	if(image.length =='')	
  	{
  		$('#imageID').show();
  			$('#imageID').html("Please select image");
  			$('#imageID').focus();
  			$('#imageID').css("color", "red");
  			
  			image_err = false;
  			return false;
  		}else{
  			$('#imageID').hide();
  		
  	}
  	if(!image.match(/(?:gif|jpg|png|bmp)$/))	
  	{
  		$('#imageID').show();
  			$('#imageID').html("Please select correct format");
  			$('#imageID').focus();
  			$('#imageID').css("color", "red");
  			
  			image_err = false;
  			return false;
  		}else{
  			$('#imageID').hide();
  		
  	}
  	if(Math.round(file.size / (1024 * 1024)) > 2)	
  	{
  		$('#imageID').show();
  			$('#imageID').html("Size of the image should be below 1 mb ");
  			$('#imageID').focus();
  			$('#imageID').css("color", "red");
  			
  			image_err = false;
  			return false;
  		}else{
  			$('#imageID').hide();
  		
  	}
  }

  function userSubject()
  {
  	var sub= $('input[type="checkbox"]').prop('checked', false);
  
  	  if((sub.length == 0))	
  	{
  		$('#sub').show();
  			$('#sub').html("Please select at least one Subject");
  			$('#sub').focus();
  			$('#sub').css("color", "red");
  			
  			sub_err = false;
  			return false;
  		}else{
  			$('#sub').hide();	
  	}

  }


  $('#Submit').click(function(e){

    e.preventDefault();
    e.stopPropagation();

  fn_err = true;
	ln_err = true;
	email_err = true;
	sex_err = true;
	contact_err =true;
	image_err = true;
	sub_err =true;

		userFN();
		userLN();
		userEmailID();
		userContact();
		userImage();

		if((fn_err==true)&&(ln_err==true)&&(email_err==true)&&(sex_err==true)&&(contact_err==true)&&(sub_err==true)&&(image_err==true))
		{
			return true;
		}
		else {
			return false;
		}

	});
    
    function resetData(){
    	$("#firstname").val("");
    	$("#lastname").val("");
    	$("#email").val("");
    	$("#gender").val("");
    	$("#contact").val("");
    	$("#subject").val("");
    	$("#image").val("");
    }
})