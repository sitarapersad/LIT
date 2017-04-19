
$(document).ready(function() {

	var stepsList = [];
	var variablesList = [];
	var agAmount = new Variable(1.0, "Grams of agarose");
	var bariumAmount = new Variable(15.0, "Milligrams of barium");
	var stepOne = new Step(["Measure", "g of agarose. Mix in", "mg of barium."], [agAmount, bariumAmount], [1.0, 3.0], 1);
	var stepTwo = new Step(["Mix agarose power with", "mL 1xTAE in a microwaveable flask. Mix in another", "mg of barium."], [agAmount, bariumAmount], [100.0, 1.0], 2);
	var stepThree = new Step(["Microwave for 1-3 minutes."], [], [], 3);
	var stepFour = new Step(["Let solution cool down."], [], [], 4);
	var stepFive = new Step(["Add EtBr at", "microL of stock solution."], [agAmount], [2.0], 5);
	stepsList.push(stepOne);
	stepsList.push(stepTwo);
	stepsList.push(stepThree);
	stepsList.push(stepFour);
	stepsList.push(stepFive);
	variablesList.push(agAmount);
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
		document.getElementById("myModal").style.display = "block";
	});

	$(document).on("click", ".edit-var", function() {
		var editableText = $(this);
		editableText.blur(editableTextBlurred);
	});

	$(document).on("click", ".close", function() {
		document.getElementById("myModal").style.display = "none";
	});

	$(document).on("click", ".edit-amount", function() {
		var editableTextAmount = $(this);
		editableTextAmount.blur(editableTextAmountBlurred);
	});


	$(document).on("click", ".edit-factor", function() {
		var editableTextFactor = $(this);
		editableTextFactor.blur(editableTextFactorBlurred);
	});

	window.onclick = function(event) {
		if (event.target == document.getElementById("myModal")) {
			document.getElementById("myModal").style.display = "none";
		}
	}

	function editableTextAmountBlurred() {
		var elementId = this.id.split("_");
		var variableNum = elementId[1];
		variablesList[variableNum].setValue(parseFloat(this.value));

		displayModal();
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

	function editableTextFactorBlurred() {
		var elementId = this.id.split("_");
		var variableNum = elementId[1];
		var stepNum = elementId[2];
		for (var q = 0; q < stepsList[stepNum].getVars().length; q++) {
			if (stepsList[stepNum].getVars()[q].getName() == variablesList[variableNum].getName()) {
				stepsList[stepNum].setFactor(q, parseFloat(this.value));
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
			html_string = html_string + "<b>Amount: </b> " + "<textarea class='edit-amount' rows='1' id='var_"+i.toString() + "'>" + variablesList[i].getValue().toString() + "</textarea>";
			html_string = html_string + "<br>";
			for (var j = 0; j<stepsList.length; j++) {
					var indexOfValue = null;
					for (var k = 0; k  < stepsList[j].getVars().length; k++) {
						if (stepsList[j].getVars()[k].getName() == variablesList[i].getName()) {
							indexOfValue = k;
							}
					}
					if (indexOfValue != null){
						html_string = html_string + "<b> Step " + (j+1).toString() + ": </b>";
						html_string = html_string + "<textarea class='edit-var' rows='1' id='var_"+i.toString() + "_" + j.toString() + "'>" + (stepsList[j].getVarValue(indexOfValue)).toString() + "</textarea>";
						html_string = html_string + " (with scaling factor: ";
						html_string = html_string + "<textarea class='edit-factor' rows='1' cols='1' id='var_"+i.toString() + "_" + j.toString() + "'>" + (stepsList[j].getFactors()[indexOfValue]).toString() + "</textarea>";
						html_string = html_string + ")";
						html_string = html_string + "<br>";
					}
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

