$( document ).ready(function(){

	var displayResources = $("#getResultDiv");
	$(".prev-btn").hide();
	$(".next-btn").hide();
	$(".search-container").hide();

	$("#allUsers").click(function(event){
		event.preventDefault();
		ajaxGet();
		$(".prev-btn").show();
		$(".next-btn").show();
		$(".search-container").show();

	});

	var page =1;
	var pagelimit = 5;
	var totalrecord =20;
	$(".prev-btn").on("click", function(){
			if(page > 1)
			{
				page--;
				ajaxGet();

			}
			console.log("previous page is " + page);
	});

	$(".next-btn").on("click", function(){
		if(page*pagelimit < totalrecord)
		{
			page++;
			ajaxGet();
		}
		console.log("Next page is " +page);

	});

	$("body").on('click', '#tblUSer .Delete', function(e){
				/*e.preventDefault();
			    e.stopPropagation();*/
			   // setInterval("ajaxDelete();", 1000);
	
		var id = "";
			
           	if($('input[id="checked"]').is(":checked"))
            	{
		            var rowEl = $(this).closest('tr');
					id = rowEl.find('.id').text();
              		$(this).parents("tr").remove();
                }
                else              
                	if($('input[name="record"]').attr('checked', false))
                	{
                		alert("plesae select check box before Delete");
                	}

		//console.log(txt);
		ajaxDelete(id);
    });

    $("body").on("click", "#tblUSer .Edit", function (row, sid) {

	    	
            row = $(this).closest("tr")
            sid = row.find(".id").text();
            row.find(".Update").show();
            row.find(".Cancel").show();
            row.find(".Delete").hide();
            $(this).hide();
            // sid = $("#txtSearch").val();	 	
	   	 getForUpdate(sid);
        });

    $("body").on("click", "#tblUSer .Cancel", function (row) {
            row = $(this).closest("tr");
            row.find(".Edit").show();
            row.find(".Delete").show();
            row.find(".Update").hide();
            $(this).hide();
        });

   	 $("body").on('click', '#tblUSer .Update', function(){

   	 	setInterval("ajaxUpdate();", 1000);

			var id = "";		 	
		 	
            if($('input[name="record"]').is(":checked"))
        	{	
        		
          		var rowEl = $(this).closest('tr');
        		id = rowEl.find('.id').text();        		  		
            }
             else              
               if($('input[name="record"]').attr('checked', false))
               	{
               		alert("plesae select check box before Update");
               	}
               //	getForUpdate(id);
		//console.log(txt);
		ajaxUpdate(id);
    });

   	 
   	 $("#search").on("click", function(sid){

	   	 sid = $("#txtSearch").val();	 	
	   	 getForUpdate(sid);
	   	 return false;
   	 });

	function ajaxGet(){
		
   		 displayResources.text("Loading data...");

		$.ajax({
			type : "GET",
			url  : "/api/users/all",
			data : {
					page: page,
					pagelimit: pagelimit
				  },
			dataType: 'JSON',  
			success: function(result)
			{
			//	console.log(result);
			//totalrecord = result.success.totalrecord;
				var output =
          		 "<table  id='tblUSer' class='table table-border table-striped table-hover' border='1' style='margin-top:20px; width:250px; h'>"+
         		 "<thead style='background-color: lightblue;'><tr><th>Select</th><th>Image</th><th>Id</th><th>First Name</th><th>Last Name</th>"+
        		 "<th>Email Id</th><th>Gender</th><th>contact No</th><th>Subject</th><th>Action</th></tr></thead><tbody>";
           				for (var i in result) {

          				output +=
          					"<tr><td><input type='checkbox' id='checked' name='record'>" +
          					"</td><td><img src="+result[i].imageURL+" class ='img' width='55' height='50' " +
            				"</img></td><td class='id'>"+
           					 result[i]._id +
            				"</input></td><td>" +
           					 result[i].firstname +
           					 "</td><td>" +
           					 result[i].lastname +
           					 "</td><td>"+
            				 result[i].email +
           					 "</td><td>"+
            				 result[i].gender +
            				"</td><td>"+
            				 result[i].contact +
           					 "</td><td>"+
            				 result[i].subject +
            				"</td><td>"+
	            
	            "<a class='Edit' href='javascript:;'><b>Edit</b></a>"+ '&nbsp;'+
	            "<a class='Update' href='javascript:;' style='display:none'><b>Update</b></a>"+ '&nbsp;' +
                "<a class='Cancel' href='javascript:;' style='display:none'><b>Cancel</b></a>"+ '&nbsp;' +
	            "<a class='Delete' href='javascript:;'><b>Delete</b></a>" + '&nbsp;' +
	            "</td></tr>";
           // "</td></tr>"; 
        }
        output += "</tbody></table>";

        displayResources.html(output);
        $("table").addClass("table");
        //location.reload();
		},
		error: function(error)
		{
			console.log(error);
		}

		});	
	}

	function ajaxDelete(id){
		//window.location = location.href;
			$.ajax({
				type : "DELETE",
				url : "/api/users/delete/"+id,
				success: function(){
				$("#postResultDiv").html("<h1 style='font-size: 14px; font-style: initial;'>Data successfully deleted with mention ID :-</h1>" +id);
				//location.reload();
				}, 
				error: function(e)
				{
					alert("Error" +e);
					console.log("error" +e);
				} 
				
			});
		}

		function getForUpdate(sid)
		{	
			

			// var mydata = {sid:sid, firstname:firstname, lastname:lastname, email:email, gender:gender, contact:contact, subject:subject, image:image};

			$.ajax({
			type : "GET",
			contentType: "APPLICATION/JSON",
			url  : "/api/users/find/"+sid,
			// data : JSON.stringify(mydata),
			success: function(result)
			{

				console.log(result);


			$("#firstname").val(result.firstname);
			$("#lastname").val(result.lastname);
			$("#email").val(result.email);
			$("input[name='gender']:checked").val(result.gender);
			$("#contact").val(result.contact);
			$("#subject").val(result.subject);
			$("#image").val(result.imageURL);

				/*console.log("Data is " +result);

				var output = "";

				for(var i in result)
				{
					output +="<div><input type='text' name='fn' value="+data[i].firstname+" "+
							"</div>"	
				}
			*/
				/*displayResources.html(output);
				$("#firstname").val(output);*/

				//$("#userForm").html(output);

				/*$("#firstname").append(data.firstname);
				$("#lastname").append(data.lastname);
				$("#email").append(data.email);
				$("#gender").append(data.gender);
				$("#contact").append(data.contact);
				$("#subject").append(data.subject);
				$("#image").append(data.imageURL);*/
			}, 

			error : function(e)
			{
				console.log(e);
			}

			});
		}

		function ajaxUpdate(id){

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

			$.ajax({

				type : "PUT",
				url : "/api/users/update/"+id,
				data : formData,
				dataType: 'JSON',
				cache: false,
	       		contentType: false,
	        	processData: false,
				success : function() {
					$("#postResultDiv").html("<h1 style='font-size: 14px; font-style: initial;''>" + 
					"Data Updated Successfully with mention ID :- " + id + "</h1>");
					location.reload();
			},
			error : function(e) {
				
				console.log("ERROR: " +e);
			}
			});

			resetData();
		}

		function resetData(){
    	$("#firstname").val("");
    	$("#lastname").val("");
    	$("#email").val("");
    	$("#gender").val("");
    	$("#contact").val("");
    	$("#subject").val("");
    	$("#image").val("");
    }

});