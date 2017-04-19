
$(document).ready(function() {
		var appendToPath = "file:///C:/Users/annsu/LIT/";

	function changeURL(newUrl) {
        console.log(appendToPath + newUrl);
        document.location.href = appendToPath + newUrl;
    }

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
			changeURL('editor.html');
		}
		else {
			alert("You need to select at least one protocol!");
		}
	});
});

