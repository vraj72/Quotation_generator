var xhr = new XMLHttpRequest();


function validate() {

		var usrn = document.getElementById("username").value;
		var pass = document.getElementById("password").value;

		if(usrn.length == 0)
			{
					   Swal.fire("Enter Username");
					return false;
			}
			else if(pass.length == 0)
				{
					  Swal.fire("Enter Password");
					return false;
			}

		var a = {
			'username': usrn,
			'password': pass
		}
		xhr.open('POST', 'http://localhost:8081/login', true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(JSON.stringify(a));
		console.log("send");
		var res = (JSON.stringify(xhr.responseText));
		console.log("responseText "+res);
		console.log(xhr);

		

		xhr.onload = function() {
    		if (xhr.status === 200) {

	    	var d = new Date();
			d.setTime(d.getTime() + (1*24*60*60*1000));
			var expires = "expires="+ d.toUTCString();
			document.cookie = "username=" + usrn + ";" + expires + ";";//save in cookie
			var decodedCookie = decodeURIComponent(document.cookie); //decode from cookie
			console.log("written to cookie"+decodedCookie);

			 Swal.fire(
			    "Successfully Login",
			    "Create New Quotation with site_name",
			    "success"
			); 

			setTimeout(function(){window.location="Homepage.html"; }, 2000);
	    	



			// alert("Successfully Login");
			
    	}
    else{
    	Swal.fire({
			  type: 'error',
			  title: 'Invalid Username/Password',
			  text: 'Enter correct Creadentials!',
			});
    	// alert("Invalid Username/Password");
    	// Swal.fire("Invalid Username/Password", "Enter correct Creadentials", "error");
		}
  	}

  	xhr.onerror = function(){
  		 Swal.fire({
			  type: 'question',
			  title: 'Oops...Check network',
			  text: 'Something went wrong!',
			});
	}
}
