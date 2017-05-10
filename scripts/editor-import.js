
$(document).ready(function() {
	$(document).on("click", "#import", function() {
		document.getElementById("myModal-import").style.display = "block";
	});

	window.onclick = function(event) {
		if (event.target == document.getElementById("myModal-import")) {
			document.getElementById("myModal-import").style.display = "none";
		}
	}

	$(document).on("click", ".close", function() {
		document.getElementById("myModal-import").style.display = "none";
	});

	$(document).on("click", "#submit-import", function() {
		var checkedValue = null;
		var inputElements = document.getElementsByClassName('check');
		for(var i=0; inputElements[i]; ++i){
      		if(inputElements[i].checked){
           		checkedValue = inputElements[i].value;
           		break;
      		}
		}

		if (checkedValue != null) {
			Storage.resetNote(window.location.hash.slice(1));
			window.location.reload();
		}
		else {
			alert("You need to select at least one protocol!");
		}
	});
});
