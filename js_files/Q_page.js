var username = getCookie("username");
// document.getElementById('Title_invoice').contentEditable='true';
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


var feild_i=1;
function addFeild_fun(){	

	var div_holding_feilds = document.getElementById('div_holding_feilds');

	var addField='<br><h5>'+(feild_i+1)+' .</h5><div id="Feild_'+feild_i+'" onkeyup="update_total('+feild_i+');" onpaste="update_total('+feild_i+');" oninput="update_total('+feild_i+');" style="display:flex; flex-direction: row;"><div style="width: 50%;"><input class="inputTitlef" type="text" placeholder="Item" style="width: 100%;"><br><textarea class="inputTitlef" placeholder="Additional Description" style="height: 100px; resize: none; width: 90%; padding-top: 20px;" ></textarea></div><div style="width: 12%; padding-left:3%;"><input class="inputTitlef" id="rate" type="text" placeholder="0.00 " style="width: 100%;"></div><div style="width: 10%; padding-left:2%;"><input class="inputTitlef" id="quantity" type="text" placeholder="1" style="width: 100%;"></div><div id="amount_f" style="width: 15%; padding-left:6%;"><h5>0.00</h5></div><div style="width: 12%; padding-left:2%;"><input class="inputTitlef" id="tax" type="text" placeholder="13%" style="width: 100%;"></div></div>';
	// div_holding_feilds.innerHTML +=addField;
	// var text = $('#Feild_'+(feild_i-1)+' :input').text($("#item").value); //to get values of particular id feild
	// console.log(text);
	// var doc = new DOMParser().parseFromString(addField, "text/xml");

	// document.getElementById('div_holding_feilds').appendChild(doc);
	div_holding_feilds.insertAdjacentHTML('beforeend', addField);
	feild_i+=1;
	
}

var id_list = [['i_name_s','name_s'],['i_email_s','email_s'],['i_address_s','address_s'],['i_phn_s','phn_s'],['i_name_r','name_r'],['i_email_r','email_r'],['i_address_r','address_r'],['i_phn_r','phn_r'],['i_i_number','i_serial_number'],['i_date','date'],['i_due','term']];

function getValues(){
	var t;
	var value=document.getElementById('Title_invoice').innerHTML;
	if( value.length == 0)
	{
		Swal.fire({
			  type: 'warning',
			  title: 'Enter Title'
			});
		document.getElementById(id).focus();
		return ;
	}
	else {
		json_data['title'] = value;
	}


	for(i=0;i<id_list.length;i++)
	{
		if(t=validate_custom(id_list[i][0]))
		{
			json_data[id_list[i][1]] = t;
			console.log("json "+JSON.stringify(json_data));
		}
		else break;
	}
	update_total();
}

function validate_custom(id){
	var value=document.getElementById(id).value;
	// console.log(obj.value);
	if( value == "")
	{
		// alert("Enter"+id);
		document.getElementById(id).focus();
		Swal.fire({
			  type: 'warning',
			  title: 'Enter '+id,
			});
		
		return false;
	}
	else if(id.includes('email')) {
		return 	ValidateEmail(value);
	}
	else if(id.includes('phn')) {
		return 	Validatephone(value);
	}
	else return value ;
	
}


function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return mail;
  }
    Swal.fire({
			  type: 'warning',
			  title:"You have entered an invalid email address!" ,
			});
    return false;
}

function Validatephone(phn)
{
  var phoneno = /^\d{10}$/;
  if ((phn.match(phoneno)))
    {
      return phn;
        }
      else
        {
        Swal.fire({
			  type: 'warning',
			  title:"You have entered an invalid Phone Number!" ,
			});
        return false;
        }
}


function update_total(j)
{
	
	var feildId = "Feild_"+j;
	var div_feild = document.getElementById(feildId).getElementsByTagName("*");
	var amount =0;
	amount = (Number(div_feild.quantity.value)*Number(div_feild.rate.value));
	amount += (amount/100)*(Number(div_feild.tax.value));
	amount = amount.toFixed(2);
	div_feild.amount_f.innerHTML =amount;
	console.log(feildId , div_feild);
	update_final();
	
}

function update_final()
{
	var total =0 , subtotal=0;
	for(j=0;j<feild_i;j++)
	{
		var feildId = "Feild_"+j;
		var div_feild = document.getElementById(feildId).getElementsByTagName("*");
		var amount =0;
		amount = (Number(div_feild.quantity.value)*Number(div_feild.rate.value));
		subtotal=subtotal+amount;
		total=total+Number(div_feild.amount_f.innerHTML);

	}
	console.log(total,subtotal);
	document.getElementById('sub').innerHTML='Subtotal : ₹  '+subtotal.toFixed(2);	
	document.getElementById('tot').innerHTML='Total : ₹  '+total.toFixed(2);
	document.getElementById('tax_f').innerHTML='Tax('+((total-subtotal)*100/(subtotal)).toFixed(2)+'%)  : ₹  '+(total-subtotal).toFixed(2);
}