var username = getCookie("username");
document.getElementById('Title_invoice').contentEditable='true';
var create_b = document.getElementById("create_b");
var json_data = {
	username : username
}
console.log("json "+JSON.stringify(json_data));

if (username == "") {
	document.getElementById('login_a').innerHTML ="Log IN";
	var span_login = document.getElementById('span_login');
	var reg_span='<a class="nav_a" href="">Register</a>';
	span_login.innerHTML += reg_span;
} 
else {
  	document.getElementById('login_a').innerHTML ="Log OUT";
  	var span_login = document.getElementById('span_login');
	var reg_span='<a class="nav_a" href="">Profile</a>';
	span_login.innerHTML += reg_span;
}



//add feild

var div_holding_feilds = document.getElementById('div_holding_feilds');
var i=1;
function addFeild_fun(){	

	var addField='<br><h5>'+(i+1)+' .</h5><div id="Feild_'+i+'" style="display:flex; flex-direction: row;"><div style="width: 50%;"><input class="inputTitlef" type="text" placeholder="Item" style="width: 100%;"><br><textarea class="inputTitlef" placeholder="Additional Description" style="height: 100px; resize: none; width: 90%; padding-top: 20px;" ></textarea></div><div style="width: 12%; padding-left:3%;"><input class="inputTitlef" type="text" placeholder="0.00 " style="width: 100%;"></div><div style="width: 10%; padding-left:2%;"><input class="inputTitlef" type="text" placeholder="1" style="width: 100%;"></div><div style="width: 15%; padding-left:6%;"><h5>0.00</h5></div><div style="width: 12%; padding-left:2%;"><input class="inputTitlef" type="text" placeholder="13%" style="width: 100%;"></div></div>';
	div_holding_feilds.innerHTML +=addField;
	var text = $('#Feild_'+(i-1)+' :input').text($("#item").value); //to get values of particular id feild
	console.log(text);
	i=i+1;
	
}

var id_list = [['i_name_s','name_s'],['i_email_s','email_s'],['i_address_s','address_s'],['i_phn_s','phn_s'],['i_name_r','name_r'],['i_email_r','email_r'],['i_address_r','address_r'],['i_phn_r','phn_r']];

function getValues(){
	var t;

	for(i=0;i<id_list.length;i++)
	{
		if(t=validate_custom(id_list[i][0]))
		{
			json_data[id_list[i][1]] = t;
			console.log("json "+JSON.stringify(json_data));
		}
		else break;
	}

}

function validate_custom(id){
	var value=document.getElementById(id).value;
	// console.log(obj.value);
	if( value == "")
	{
		alert("Enter"+id);
		document.getElementById(id).focus();
		return false;
	}
	else return value ;
}
