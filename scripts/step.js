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
 		var html_string = "<b> Step "+ num.toString() + " : </b>";
 		for (var i = 0; i < text.length-1; i++) {
 			html_string = html_string + text[i] + " <textarea class='var' id='area_"+(this.number-1).toString() + "_" + vars[i].getName().toString() +"' rows='1' cols='3'>" + (vars[i].getValue()*factors[i]).toString() + "</textarea> ";
 		}
 		html_string = html_string + text[text.length-1];
 		div.innerHTML = html_string;
 		return div;
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
 }