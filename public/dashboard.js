function loadJSON() {
	var http_request = new XMLHttpRequest();
	try {
		http_request = new XMLHttpRequest();
	} catch (e) {
		try {
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				alert("Your browser broke!");
				return false;
			}
		}
	}
	http_request.onreadystatechange = function () {
		if (http_request.readyState == 4) {

			var jsonObj = JSON.parse(http_request.responseText);

			document.getElementById("user").innerHTML = jsonObj.name;
		}
	}
	http_request.open("GET", data, true);
	http_request.send();
}

$(document).ready(function () {
	$("#b1").hide();
	$("#b2").hide();

	loadJSON()
});