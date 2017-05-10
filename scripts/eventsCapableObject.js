var EventCapableObject = function () {
	this.eventHandlers = {};
};

EventCapableObject.prototype.emitEvent = function (eventName, optionalParameter) {
	// TODO: check the object types of 'eventName' and 'optionalParameter' for proper function...
	if (!this.eventHandlers[eventName] || this.eventHandlers[eventName] == []) {
		return;
	}
	for (var i = 0; i < this.eventHandlers[eventName].length; i++)
	{
		this.eventHandlers[eventName][i](optionalParameter);
	}
};

EventCapableObject.prototype.addEventListener = function (eventName, callback) {
	if (!eventName || !callback) {
		log("Error"); return;
	}
	// TODO: check the object types of 'eventName' and 'callback' for proper function...

	if (!Array.isArray(this.eventHandlers[eventName])) {
		this.eventHandlers[eventName] = [];
	}
	this.eventHandlers[eventName].push(callback);
};
