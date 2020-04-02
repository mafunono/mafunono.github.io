function validate_blank(field, description) {
	value = document.getElementById(field).value;
	if (value=="") {
		if (focusField==null) focusField = field;
		error_list += (description) ? description + "\n" : field + "\n";
		return false;
		}
	return true;
	}

function validate_zip(field, description) {
	value = document.getElementById(field).value;
	if (!(/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value)) || value=="") {
		if (focusField==null) focusField = field;
		error_list += (description) ? description + "\n" : field + "\n";
		return false;
		}
	return true;
	} // validate_zip()

function validate_ssn(field, description) {
	value = document.getElementById(field).value;
	if (!(/(^\d{9}$)|(^\d{3}-\d{2}-\d{4}$)/.test(value)) || value=="") {
		if (focusField==null) focusField = field;
		error_list += (description) ? description + "\n" : field + "\n";
		return false;
		}
	return true;
	} // validate_ssn()

function validate_email(field, description) {
	value = document.getElementById(field).value;
	if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*\.(\w{2}|(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum))$/.test(value)) || value=="") {
		if (focusField==null) focusField = field;
		error_list += (description) ? description + "\n" : field + "\n";
		return false;
		}
	return true;
	} // validate_email

function validate_phone(field, description) {
	value = document.getElementById(field).value;
	if (!(/^\((\d{3})\)\s?(\d{3})[\s|\.|-](\d{4})((\s+|\s?)([eE][xX][tT]|[xX]?|[eE][xX][tT]\.)(\d{0,5}))?$/.test(value) ||
      /^(\d{3})[\s|\/|\.|-]?(\d{3})[\s|\.|-]?(\d{4})((\s+|\s?)([eE][xX][tT]|[xX]?|[eE][xX][tT]\.)(\d{0,5}))?$/.test(value)) || value=="") {
		if (focusField==null) focusField = field;
		error_list += (description) ? description + "\n" : field + "\n";
		return false;
		}
	return true;
	} // validate_phone

function validate_date(field, description) {
	value = document.getElementById(field).value;
	if (!(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.test(value)) || value=="") {
		if (focusField==null) focusField = field;
		error_list += (description) ? description + "\n" : field + "\n";
		return false;
		}
	return true;
	} // validate_phone
	
function validate_radio_blank(field, description, length) {
	for (i = 0; i < length; i++) {
		var arraychecked=0;
		if (document.getElementById(field+i).checked) {
			arraychecked++;
			break;
			}
		}
	if (arraychecked==0) {
		if (valid && focusField==null) focusField = field;
		error_list += (description) ? description + "\n" : field + "\n";
		return false;
		}   
	return true;
	} // validate_radio_blank()
	
	
function validate_mm(field, description) {
	value = document.getElementById(field).value;
	if (isNaN(value) || parseInt(value)>12) {
		if (focusField==null) focusField = field;
		error_list += (description) ? description + "\n" : field + "\n";
		return false;
		}
	return true;
	}

function validate_yy(field, description) {
	value = document.getElementById(field).value;
	if (isNaN(value) || (!eval("/^19\\d{2}$/").test(value) && !eval("/^20\\d{2}$/").test(value))) {
		if (focusField==null) focusField = field;
		error_list += (description) ? description + "\n" : field + "\n";
		return false;
		}
	return true;
	}


function validate_digits_only(field, description, digits) {
	value = document.getElementById(field).value;
	
	if (isNaN(digits)) { // all
		pattern = eval("/^\\d+$/");
		}
	else { // only n digits up to the value of "digits"
		pattern = eval("/^\\d{"+digits+"}$/");
		}
	
	if (!(pattern.test(value)) || value=="") {
		if (focusField==null) focusField = field;
		error_list += (description) ? description + "\n" : field + "\n";
		return false;
		}
	return true;
	} // validate_digits_only()
	
function validate_checkbox_checked(field, description) {
	obj = document.getElementById(field)
	if(!obj.checked) {
		if (focusField==null) focusField = field;
		error_list += (description) ? description + "\n": field + "\n";
		return false;
		}
	return true;
	} //validate_checkbox_checked()

function validate_money(field , description) {
	if(!formatMoney(f.elements[field], description, false))  {
		if (valid) focusField = field;
		this.valid = false;
		error_list += (description) ? description + "\n": field + "\n";
		return false;
		}
	return true;
	} // validate_money()

function formatMoney(fld, description, show_error) {
	var amt=fld.value.ltrim().rtrim();
	var moneyChars="0123456789";
	var cents="00";
	var formatAmt="";
	var errorDesc="";

	// If there is a dollar sign, remove it.
	if (amt.charAt(0) == "$") amt = amt.substring(1,amt.length).ltrim();
	
	// Check for a decimal, and set a flag if there is one in the right place.
	if (amt.indexOf(".") != -1 ) {
		if (amt.indexOf(".") == amt.lastIndexOf(".") && amt.indexOf(".") >= amt.length-3) {
			if (amt.indexOf(".") < amt.length-1) cents = amt.substring(amt.indexOf(".")+1, amt.length);
			if (cents.length==1) cents=cents+"0";
			amt = amt.substring(0,amt.indexOf("."));
			}
		else errorDesc = "Decimal placement error";
		}
	
	// Remove any commas.
	if (errorDesc.length == 0) {
		while (amt.indexOf(",") != -1) {
			amt = amt.substring(0,amt.indexOf(","))+amt.substring(amt.indexOf(",")+1, amt.length);
			}
		}
	
	// Now, check for any invalid characters.  There should not be any characters other than digits.  
	for (var i=0; i<amt.length && errorDesc.length==0; ++i) {
		if (moneyChars.indexOf(amt.charAt(i)) == -1) {
			errorDesc = "Dollar amount contains at least one illegal character.";
			}
		}
	
	if (errorDesc.length==0 && fld.value != "") {
		// The dollar amount now contains only digits, so we can format them.
		if (amt.length == 0) amt="0";
		formatAmt = "."+cents;
		while (amt.length > 3) {
			formatAmt = ","+amt.substring(amt.length-3,amt.length)+formatAmt;
			amt=amt.substring(0,amt.length-3);
			}
		formatAmt = "$"+amt+formatAmt;
		fld.value = formatAmt;
		return true;
		} 
	else {
		if (show_error) {
			alert(errorDesc);
			fld.focus();
			}
		}
	return false;
	} // formatMoney()


// Trim leading spaces from a string
String.prototype.ltrim = function () 
{
	var s=this;
	while (s.charAt(0)==" ") s=s.substring(1,s.length);
	return s;
} // String.prototype.ltrim()

// Trim trailing spaces from a string
String.prototype.rtrim = function () 
{
	var s=this;
	while (s.charAt(s.length-1)==" ") s=s.substring(0, s.length-1);
	return s;
} // String.prototype.rtrim()

// Return the rightmost n characters of a string
String.prototype.left = function (n)
{
	if (n < this.length) {
		return this.substring(0, n);
	} 
	else
	{
		return this;
	}
} // String.prototype.left()

// Return the rightmost n characters of a string
String.prototype.right = function (n) {
	if (n < this.length) 
	{
		return this.substring(this.length-n, this.length);
	} 
	else
	{
		return this;
	}
} // String.prototype.right()