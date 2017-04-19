
$(document).ready(function() {
	$(document).on("click", "#import", function() {
		document.getElementById("myModal").style.display = "block";
	});

	window.onclick = function(event) {
		if (event.target == document.getElementById("myModal")) {
			document.getElementById("myModal").style.display = "none";
		}
	}

	$(document).on("click", ".close", function() {
		document.getElementById("myModal").style.display = "none";
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
			document.location.href = "http://web.mit.edu/anitaliu/www/LIT/editor.html";
		}
		else {
			alert("You need to select at least one protocol!");
		}
	});
});

