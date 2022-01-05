$(document).ready(function () {
	$("#dummy").hide();
	$("#semail").hide();
	$("#suser").hide();
    $("#spass").hide();
    $("#submit").click(function () {
        var upassword = $("#pass").val();
        var uemail = $("#email").val();
		var uname = $('#user').val();
        var emailpatt = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

		if (uname.length == 0){
			$('#suser').show();
			$('#user').focus();
			return false;
		}
		else{
			$('#suser').hide();
		}

		if ((!uemail.match(emailpatt))) {
            $("#semail").show();
            $("#email").focus();
            return false;
        }
        else{
            $("#semail").hide();
		}

        if (upassword.length < 7 || upassword.length > 12) {
            $("#spass").show();
            $("#pass").focus();
			return false;
        }
        else {
            $("#spass").hide();
        }
    });
});