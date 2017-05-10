/**
 * Step represents a step in a protocol with editable variables.
 *
 *  text is an array containing the text of the step split by when variables occur. vars is an array containing variables, factors is an array containing 
 factors that variables are multiplied by. num represents the step number of this step.
 */

 var Step = function(text, vars, factors, num) {
 	this.content = text;
 	this.variables = vars;
 	this.number = num;
 	this.scales = factors;

 	this.display = function() {
 		var div = document.createElement("div");
 		div.setAttribute("class", "step");
 		var html_string = "<b> Step "+ this.number.toString() + " : </b>";
 		if (this.content.length == 1) {
 			html_string = html_string + this.content[0];
 			if (this.variables.length != 0) {
 				html_string = html_string + " <textarea class='var' id='area_"+(this.number-1).toString() + "_" + this.variables[0].getName().toString() +"' rows='1' cols='3'>" + (this.variables[0].getValue()*this.scales[0]).toString() + "</textarea> ";
 			}
 			div.innerHTML = html_string;
 		}
 		else {
 			for (var i = 0; i < this.content.length-1; i++) {
	 			html_string = html_string + this.content[i] + " <textarea class='var' id='area_"+(this.number-1).toString() + "_" + this.variables[i].getName().toString() +"' rows='1' cols='3'>" + (this.variables[i].getValue()*this.scales[i]).toString() + "</textarea> ";
	 		}
	 		html_string = html_string + text[text.length-1];
	 		div.innerHTML = html_string;
 		}
 		return div;
 	}

 	this.setNumber = function(stepNum) {
 		this.number = stepNum;
 	}

 	this.getNumber = function() {
 		return this.number;
 	}

 	this.getVars = function() {
 		return this.variables;
 	}

 	this.getVarValue = function(index) {
 		return (this.variables[index]).getValue() * this.scales[index];
 	}

 	this.getFactors = function() {
 		return this.scales;
 	}

 	this.setFactor = function(index, newVal) {
 		this.scales.splice(index, 1, newVal);

 	}

 	this.appendChunk = function(text, variable, factor) {
 		this.content.push(text);
 		this.variables.push(variable);
 		this.scales.push(factor)
 	}

 	this.appendText = function(text) {
 		this.content.push(text);
 	}

 	this.getContent = function() {
 		return this.content;
 	}
 }