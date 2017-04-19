
$(document).ready(function() {

	var stepsList = [];
	var variablesList = [];
	var sodiumAmount = new Variable(2.0, "Amount of sodium");
	var bariumAmount = new Variable(5.0, "Amount of barium");
	var stepOne = new Step(["Pour", "mL of sodium. Mix in", "mg of barium."], [sodiumAmount, bariumAmount], [1.0, 3.0], 1);
	var stepTwo = new Step(["Obtain", "mg of magnesium. Mix in another", "mg of barium."], [sodiumAmount, bariumAmount], [2.0, 1.0], 2);
	stepsList.push(stepOne);
	stepsList.push(stepTwo);
	variablesList.push(sodiumAmount);
	variablesList.push(bariumAmount);

	displayModal();
	displaySteps();

	$(document).on("click", "#submit-vars", function(){
		document.getElementById("myModal").style.display = "none";

		var node = document.getElementById("mainContainer");
		while (node.hasChildNodes()) {
		    node.removeChild(node.lastChild);
		}

		displaySteps();
		var newModal = document.createElement("div");
		newModal.id = "myModal";
		newModal.setAttribute("class", "modal");
		document.getElementById("mainContainer").appendChild(newModal);
		displayModal();
	});

	$(document).on("click", ".var", function() {
		console.log("here");
		document.getElementById("myModal").style.display = "block";
	});

	$(document).on("click", ".edit-var", function() {
		var editableText = $(this);
		editableText.blur(editableTextBlurred);
	});

	$(document).on("click", ".close", function() {
		document.getElementById("myModal").style.display = "none";
	});


	window.onclick = function(event) {
		if (event.target == document.getElementById("myModal")) {
			document.getElementById("myModal").style.display = "none";
		}
	}

	function editableTextBlurred() {
		var elementId = this.id.split("_");
		var variableNum = elementId[1];
		var stepNum = elementId[2];
		for (var m = 0; m < stepsList[stepNum].getVars().length; m++) {
			if (stepsList[stepNum].getVars()[m].getName() == variablesList[variableNum].getName()) {
				variablesList[variableNum].setValue(parseFloat(this.value) / (stepsList[stepNum].getFactors()[m]));
			}
		}

		displayModal();
	}

	function displayModal() {
		var node = document.getElementById("modal-content");
		if (node != null) {
			while (node.hasChildNodes()) {
			    node.removeChild(node.lastChild);
			}	
		}
		else {  
			var modalDiv = document.createElement("div");
			modalDiv.setAttribute("class", "modal-content");
			modalDiv.id = "modal-content";
			document.getElementById("myModal").appendChild(modalDiv);
		}

		var divClose = document.createElement("SPAN");
		divClose.setAttribute("class", "close");
		divClose.innerHTML = "&times;";
		document.getElementById("modal-content").appendChild(divClose);
		var headerOne = document.createElement("div");
		headerOne.innerHTML = "<h1> Variable List </h1>";
		document.getElementById("modal-content").appendChild(headerOne);

		for (var i = 0 ; i<variablesList.length; i++) {
			var divModal = document.createElement("div");
			var html_string = "<h2> Variable " + (i+1).toString() + ": " + variablesList[i].getName() + "</h2>";
			html_string = html_string + "<br>";
			for (var j = 0; j<stepsList.length; j++) {
					html_string = html_string + "Step " + (j+1).toString() + ": ";
					var indexOfValue;
					for (var k = 0; k  < stepsList[j].getVars().length; k++) {
						if (stepsList[j].getVars()[k].getName() == variablesList[i].getName()) {
							indexOfValue = k;
							}
					}
					html_string = html_string + "<textarea class='edit-var' rows='1' id='var_"+i.toString() + "_" + j.toString() + "'>" + (stepsList[j].getVarValue(indexOfValue)).toString() + "</textarea>";
					html_string = html_string + "<br>";
			}
			html_string += "<br>";
			html_string += "<br>";
			divModal.innerHTML = html_string;
			document.getElementById("modal-content").appendChild(divModal);
		}
		var btn = document.createElement("BUTTON");        // Create a <button> element
		var t = document.createTextNode("Done");       // Create a text node
		btn.appendChild(t); 
		btn.id="submit-vars";                             // Append the text to <button>
		document.getElementById("modal-content").appendChild(btn);  
	}

	function displaySteps() {

		for (var n = 0 ; n<stepsList.length; n++) {
			var divNew = stepsList[n].display();
			document.getElementById("mainContainer").appendChild(divNew);
		}
	}
});

