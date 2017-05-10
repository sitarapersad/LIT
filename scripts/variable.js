/**
 * Variable represents a variable in a protocl step.
 *
 */

var Variable = function (val, name) {
	this.value = val;
	this.name = name;

	this.setValue = function (newValue) {
		this.value = newValue;
	}

	this.getValue = function () {
		return this.value;
	}

	this.getName = function () {
		return this.name;
	}

	this.setName = function (newName) {
		this.name = newName;
	}
}
