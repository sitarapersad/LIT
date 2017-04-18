var sodium_amount = 2;

$(document).ready(function() {
	var span = document.getElementsByClassName("close");
	var modal = document.getElementById("myModal");
	var submit = document.getElementById("submit-vars");
	$(".var").focus(varClicked);
	$(".edit-var").focus(editVarClicked);

	span.onclick = function() {
		modal.style.display = "none";
	}

	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}

	submit.onclick = function() {
		modal.style.display = "none";

		var sodiumDisplay = document.getElementById("display-sodium-1");
		sodiumDisplay.innerHTML = sodium_amount;
		var magDisplay = document.getElementById("display-sodium-2");
		magDisplay.innerHTML = 2*sodium_amount;
	}

	function varClicked() {
		modal.style.display = "block";
		var sodiumDisplay = document.getElementById("sodium-var-1");
		sodiumDisplay.innerHTML = sodium_amount;
		var magDisplay = document.getElementById("sodium-var-2");
		magDisplay.innerHTML = 2*sodium_amount;
	}

	function editVarClicked() {
		var editableText = $(this);
		editableText.blur(editableTextBlurred);
	}

	function editableTextBlurred() {
		if(this.id == "sodium-var-1") {
			sodium_amount = parseFloat(document.getElementById("sodium-var-1").value);
			var sodiumDisplay = document.getElementById("sodium-var-1");
			sodiumDisplay.innerHTML = sodium_amount;
			var magDisplay = document.getElementById("sodium-var-2");
			magDisplay.innerHTML = (2*sodium_amount).toString();
		}
		else {
			sodium_amount = parseFloat(document.getElementById("sodium-var-2").value)/2.0;
			var sodiumDisplay = document.getElementById("sodium-var-1");
			sodiumDisplay.innerHTML = sodium_amount;
			var magDisplay = document.getElementById("sodium-var-2");
			magDisplay.innerHTML = 2*sodium_amount;
		}
	}

});
