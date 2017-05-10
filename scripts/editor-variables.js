
$(document).ready(function() {
	var editorContent = Storage.getContent(window.location.hash.slice(1));

	displayModal();
	displaySteps();


	$(document).on("click", ".var", function() {
		document.getElementById("myModal-vars").style.display = "block";
		displayModal();
		$('#myModal-vars').animate({width:"500px"});
		$('#mainContainer').animate({left:"500px"});
	});


	$(document).on("click", ".edit-var", function() {
		var editableText = $(this);
		var elementId = this.id.split("_");
		var variableNum = elementId[1];
		var stepNum = elementId[2];
		for (var j = 0; j<editorContent.steps.length; j++) {
					var indexOfValue = null;
					for (var k = 0; k  < editorContent.steps[j].getVars().length; k++) {
						if (editorContent.steps[j].getVars()[k].getName() == editorContent.vars[variableNum].getName()) {
							indexOfValue = k;
							}
					}
					if (indexOfValue != null){
						var toHighlight = "area_" + j.toString() +"_"+ editorContent.vars[variableNum].getName().toString();
						document.getElementById(toHighlight).style.borderColor = '#457796';
						document.getElementById(toHighlight).style.borderWidth = 'thick';
					}
			}


		editableText.blur(editableTextBlurred);
	});

	$(document).on("click", ".close", function() {
		document.getElementById("myModal-vars").style.display = "none";

		updateVariables();
		var newModal = document.createElement("div");
		newModal.id = "myModal-vars";
		newModal.setAttribute("class", "modal");
		document.getElementsByTagName("BODY")[0].appendChild(newModal);
		displayModal();
		$('#mainContainer').animate({left:0});
		$('#myModal-vars').animate({width:0});

	});

	$(document).on("click", ".edit-amount", function() {
		var editableTextAmount = $(this);
		var elementId = this.id.split("_");
		var variableNum = elementId[1];
		for (var j = 0; j<editorContent.steps.length; j++) {
					var indexOfValue = null;
					for (var k = 0; k  < editorContent.steps[j].getVars().length; k++) {
						if (editorContent.steps[j].getVars()[k].getName() == editorContent.vars[variableNum].getName()) {
							indexOfValue = k;
							}
					}
					if (indexOfValue != null){
						var toHighlight = "area_" + j.toString() +"_"+ editorContent.vars[variableNum].getName().toString();
						document.getElementById(toHighlight).style.borderColor = '#457796';
						document.getElementById(toHighlight).style.borderWidth = 'thick';
					}
			}

		editableTextAmount.blur(editableTextAmountBlurred);
	});


	$(document).on("click", ".edit-factor", function() {
		var editableTextFactor = $(this);
		var elementId = this.id.split("_");
		var variableNum = elementId[1];
		var stepNum = elementId[2];
		var toHighlight = "area_" + stepNum.toString() +"_"+ editorContent.vars[variableNum].getName().toString();
		document.getElementById(toHighlight).style.borderColor = '#457796';
		document.getElementById(toHighlight).style.borderWidth = 'thick';

		editableTextFactor.blur(editableTextFactorBlurred);
	});

	window.onclick = function(event) {
		if (event.target == document.getElementById("myModal-vars")) {
			document.getElementById("myModal-vars").style.display = "none";


			updateVariables();
			var newModal = document.createElement("div");
			newModal.id = "myModal-vars";
			newModal.setAttribute("class", "modal");
			document.getElementsByTagName("BODY")[0].appendChild(newModal);
			displayModal();
			$('#mainContainer').animate({left:0});
			$('#myModal-vars').animate({width:0});
			}
	}

	function editableTextAmountBlurred() {
		var elementId = this.id.split("_");
		var variableNum = elementId[1];
		editorContent.vars[variableNum].setValue(parseFloat(this.value));

		var elementId = this.id.split("_");
		var variableNum = elementId[1];
		for (var j = 0; j<editorContent.steps.length; j++) {
					var indexOfValue = null;
					for (var k = 0; k  < editorContent.steps[j].getVars().length; k++) {
						if (editorContent.steps[j].getVars()[k].getName() == editorContent.vars[variableNum].getName()) {
							indexOfValue = k;
							}
					}
					if (indexOfValue != null){
						var toHighlight = "area_" + j.toString() +"_"+ editorContent.vars[variableNum].getName().toString();
						document.getElementById(toHighlight).style.borderColor = '#CFCFCF';
						document.getElementById(toHighlight).style.borderWidth = 'thin';
					}
			}

		displayModal();
		updateVariables();
	}

	function editableTextBlurred() {
		var elementId = this.id.split("_");
		var variableNum = elementId[1];
		var stepNum = elementId[2];

		for (var j = 0; j<editorContent.steps.length; j++) {
					var indexOfValue = null;
					for (var k = 0; k  < editorContent.steps[j].getVars().length; k++) {
						if (editorContent.steps[j].getVars()[k].getName() == editorContent.vars[variableNum].getName()) {
							indexOfValue = k;
							}
					}
					if (indexOfValue != null){
						var toHighlight = "area_" + j.toString() +"_"+ editorContent.vars[variableNum].getName().toString();
						document.getElementById(toHighlight).style.borderColor = '#CFCFCF';
						document.getElementById(toHighlight).style.borderWidth = 'thin';
					}
		}
		for (var m = 0; m < editorContent.steps[stepNum].getVars().length; m++) {
			if (editorContent.steps[stepNum].getVars()[m].getName() == editorContent.vars[variableNum].getName()) {
				editorContent.vars[variableNum].setValue(parseFloat(this.value) / (editorContent.steps[stepNum].getFactors()[m]));
			}
		}

		displayModal();
		updateVariables();
	}

	function editableTextFactorBlurred() {
		var elementId = this.id.split("_");
		var variableNum = elementId[1];
		var stepNum = elementId[2];

		var toHighlight = "area_" + stepNum.toString() +"_"+ editorContent.vars[variableNum].getName().toString();
		document.getElementById(toHighlight).style.borderColor = '#CFCFCF';
		document.getElementById(toHighlight).style.borderWidth = 'thin';
		for (var q = 0; q < editorContent.steps[stepNum].getVars().length; q++) {
			if (editorContent.steps[stepNum].getVars()[q].getName() == editorContent.vars[variableNum].getName()) {
				editorContent.steps[stepNum].setFactor(q, parseFloat(this.value));
			}
		}

		displayModal();
		updateVariables();
	}


	function displayModal() {
		var node = document.getElementById("modal-content-vars");
		if (node != null) {
			while (node.hasChildNodes()) {
			    node.removeChild(node.lastChild);
			}
		}
		else {
			var modalDiv = document.createElement("div");
			modalDiv.setAttribute("class", "modal-content-vars");
			modalDiv.id = "modal-content-vars";
			document.getElementById("myModal-vars").appendChild(modalDiv);
		}

		var divClose = document.createElement("SPAN");
		divClose.setAttribute("class", "close");
		divClose.innerHTML = "&times;";
		document.getElementById("modal-content-vars").appendChild(divClose);
		var headerOne = document.createElement("div");
		headerOne.innerHTML = "<h1> Variable List </h1>";
		document.getElementById("modal-content-vars").appendChild(headerOne);

		for (var i = 0 ; i<editorContent.vars.length; i++) {
			var divModal = document.createElement("div");
			var html_string = "<h2> Variable " + (i+1).toString() + ": " + editorContent.vars[i].getName() + "</h2>";
			html_string = html_string + "<br>";
			html_string = html_string + "<b>Amount: </b> " + "<textarea class='edit-amount' rows='1' id='var_"+i.toString() + "'>" + editorContent.vars[i].getValue().toString() + "</textarea>";
			html_string = html_string + "<br>";
			for (var j = 0; j<editorContent.steps.length; j++) {
					var indexOfValue = null;
					for (var k = 0; k  < editorContent.steps[j].getVars().length; k++) {
						if (editorContent.steps[j].getVars()[k].getName() == editorContent.vars[i].getName()) {
							indexOfValue = k;
						}
					}
					if (indexOfValue != null){
						html_string = html_string + "<b> Step " + (j+1).toString() + ": </b>";
						html_string = html_string + "<textarea class='edit-var' rows='1' id='var_"+i.toString() + "_" + j.toString() + "'>" + (editorContent.steps[j].getVarValue(indexOfValue)).toString() + "</textarea>";
						html_string = html_string + " (scaling factor: ";
						html_string = html_string + "<textarea class='edit-factor' rows='1' cols='1' id='var_"+i.toString() + "_" + j.toString() + "'>" + (editorContent.steps[j].getFactors()[indexOfValue]).toString() + "</textarea>";
						html_string = html_string + ")";
						html_string = html_string + "<br>";
					}
			}
			html_string += "<br>";
			html_string += "<br>";
			divModal.innerHTML = html_string;
			document.getElementById("modal-content-vars").appendChild(divModal);
		}
	}

	function displaySteps() {
		var node = document.getElementById("mainContainer");
		while (node.hasChildNodes()) {
		    node.removeChild(node.lastChild);
		}

		for (var n = 0 ; n<editorContent.steps.length; n++) {
			var divNew = editorContent.steps[n].display();
			document.getElementById("mainContainer").appendChild(divNew);
		}
	}

	function updateVariables() {
		var variables = document.getElementsByClassName("var");
		for (var i = 0; i < variables.length; i++) {
			var elementId = variables[i].id.split("_");
			var stepNum = elementId[1];
			var variableName = elementId[2];
			var variableNum = -1;

			for (var j = 0; j < editorContent.steps[stepNum].getVars().length; j++) {
				if (editorContent.steps[stepNum].getVars()[j].getName() == variableName) {
					variableNum = j;
				}
			}

			variables[i].innerHTML = editorContent.steps[stepNum].getVarValue(variableNum); 
		}
	}

	// Everything related to adding variables and/or steps

	$(document).on("click", "#add-step", function() {
		document.getElementById("myModal-add").style.display = "block";
		for (var i = 0; i < editorContent.steps.length+1; i++) {
			var dropdown = document.getElementById("step-num");
			var option = document.createElement("option");
			option.text=(i+1).toString();
			option.value=(i+1).toString();
			dropdown.add(option);
		}

		for (var j = 0; j <editorContent.vars.length; j++) {
			var dropdown = document.getElementById("existing-variables");
			var option = document.createElement("option");
			option.text="Variable " + (j+1).toString() + ": " + editorContent.vars[j].getName();
			option.value= j.toString();
			dropdown.add(option);
		}
	});


	window.onclick = function(event) {
		if (event.target == document.getElementById("myModal-add")) {
			document.getElementById("myModal-add").style.display = "none";
		}
	}

	var stepAdded = new Step([], [], [], 0);
	var lastVariableAdded = 0;

	$(document).on("click", ".close", function() {
		document.getElementById("myModal-add").style.display = "none";
	});

	$(document).on("click", "#submit-add", function() {
		document.getElementById("myModal-add").style.display = "none";
	});

	$(document).on("click", "#add-var", function() {
		if (stepAdded.getContent().length == 0) {
			var e = document.getElementById("step-num");
			stepAdded.setNumber(parseInt(e.options[e.selectedIndex].value));
		}

		var textSoFar = document.getElementById("step-content").value;
		var textSoFarCut = textSoFar.substring(lastVariableAdded, textSoFar.length);
		if (document.getElementById('existing-var').checked) {
			var newFactor = parseFloat(document.getElementById("existing-var-fac").value);
			var e = document.getElementById("existing-variables");
			var varNum = parseInt(e.options[e.selectedIndex].value);
			var newVariable = editorContent.vars[varNum];
			stepAdded.appendChunk(textSoFarCut, newVariable, newFactor);
			console.log(stepAdded.getVars());

			document.getElementById("step-content").value = textSoFar + " " + (newVariable.getValue()*newFactor).toString() + " ";

			document.getElementById("existing-var-fac").value = "";
			document.getElementById("existing-var").checked = false;

		} else if (document.getElementById('new-var').checked) {
			var newName = document.getElementById("new-var-name").value;
			var newValue = parseFloat(document.getElementById("new-var-val").value);
			var newFactor = parseFloat(document.getElementById("new-var-fac").value);
			var newVariable = new Variable(newValue, newName);
			editorContent.vars.push(newVariable);

			stepAdded.appendChunk(textSoFarCut, newVariable, newFactor);
			document.getElementById("step-content").value = textSoFar + " " + (newValue*newFactor).toString() + " ";

			document.getElementById("new-var-name").value = "";
			document.getElementById("new-var-val").value = "";
			document.getElementById("new-var-fac").value = "";
			document.getElementById("new-var").checked = false;

			$("#existing-variables").empty();
			for (var j = 0; j <editorContent.vars.length; j++) {
				var dropdown = document.getElementById("existing-variables");
				var option = document.createElement("option");
				option.text="Variable " + (j+1).toString() + ": " + editorContent.vars[j].getName();
				option.value= j.toString();
				dropdown.add(option);
			}
		}

		document.getElementById("step-content").focus;
		lastVariableAdded = document.getElementById("step-content").value.length; 
	});

	$(document).on("click", "#submit-add", function() {

		var textSoFar = document.getElementById("step-content").value;
		if (stepAdded.getContent().length == 0) {
			var e = document.getElementById("step-num");
			stepAdded.setNumber(parseInt(e.options[e.selectedIndex].value));
		}
		if (textSoFar.length != lastVariableAdded) {
			var textSoFarCut = textSoFar.substring(lastVariableAdded, textSoFar.length);
			stepAdded.appendText(textSoFarCut);
		}


		var stepsListContent = editorContent.steps;
		if(stepAdded.getNumber() > editorContent.steps.length) {
			editorContent.steps.push(stepAdded);
		}
		else {
			stepsListContent.splice(stepAdded.getNumber()-1, 0, stepAdded);
			stepsListContent.join();
			editorContent.steps = stepsListContent;
		}

		appendStepDisplay(stepAdded);
		// Clear dropdown options for step number when close
		$("#step-num").empty();
		$("#existing-variables").empty();
		document.getElementById("step-content").value="";
		stepAdded = new Step([], [], [], 0);
		lastVariableAdded = 0;
	});

	function appendStepDisplay(stepAdded) {
		var stepNum = stepAdded.getNumber();
		document.getElementById("mainContainer").insertBefore(stepAdded.display(), document.getElementById("mainContainer").children[stepNum-1]);
		for (var i = stepNum; i < editorContent.steps.length; i++) {
			var currentHTML = document.getElementById("mainContainer").children[i].innerHTML;
			var otherPortion = currentHTML.split("</b>")[1];
			editorContent.steps[i].setNumber(i+1);
			document.getElementById("mainContainer").children[i].innerHTML = "<b> Step "+ (i+1).toString() + " : </b>" + otherPortion;
		}

		var variables = document.getElementsByClassName("var");
		for (var i = 0; i < variables.length; i++) {
			var elementId = variables[i].id.split("_");
			var oldStepNum = elementId[1];
			var variableName = elementId[2];
			var variableNum = -1;

			if (oldStepNum >= stepNum) {
				variables[i].id = "area_" + (parseInt(oldStepNum) + 1).toString() + "_" + variableName; 
			}

		}
	}
});
