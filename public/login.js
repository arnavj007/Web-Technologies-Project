function formValidation() {

	var pass = document.getElementById("pass");
	var uname = document.getElementById("uname");

	if (pass_validation(pass, 7, 12)) {
		if (uname_validation(uname)) {
			return true;
		}
	}

	return false;
}

function pass_validation(pass, mx, my) {
	var pass_len = pass.value.length;
	if (pass_len == 0 || pass_len > my || pass_len < mx) {
		alert("Password length should be between " + mx + " to " + my + " characters");
		pass.focus();
		return false;
	}
	return true;
}

function uname_validation(uname) {
	var letters = /^[A-Za-z]+$/;
	if (uname.value.match(letters)) {
		return true;
	}
	else {
		alert('Username must have alphabets only');
		uname.focus();
		return false;
	}
}