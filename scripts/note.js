/**
 * Note represents a document created by an owner and stored.
 *
 * The note is identified by an immutable (randomly generated) ID
 * and by a mutable user-designated name
 *
 * The note can be shared with a mutable set of Users.
 *
 */

var Note = function (initialData)
{
	EventCapableObject.call(this);

	// Randomly generate an identifier (ID)
	if (initialData.ID) this.ID = initialData.ID;
	else this.ID = initialData.owner + StringGenerator.randomAlphaNumericString(10);

	// Owner (an instance of the User class) of the document
	this.owner = initialData.owner;
	this.name = initialData.name;

	if (initialData.sharedUsers) this.sharedUsers = initialData.sharedUsers;
	else this.sharedUsers = [];

	if (initialData.createDate) this.createDate = initialData.createDate;
	else this.createDate = 0;

	if (initialData.modifiedDate) this.modifiedDate = initialData.modifiedDate;
	else this.modifiedDate = 0;

	if (initialData.parentFolder) this.parentFolder = initialData.parentFolder;
	else this.parentFolder = null;

	if (initialData.recycled) this.recycled = initialData.recycled;
	this.recycled = false;

	return this.ID;
};

Note.prototype = Object.create(EventCapableObject.prototype);
Note.prototype.constructor = Note;

Note.prototype.serialize = function () {
	var serializedObject = {};
	serializedObject.ID = this.ID;
	serializedObject.recycled = this.recycledObject;
	serializedObject.owner = this.owner;
	serializedObject.name = this.name;
	serializedObject.sharedUsers = this.sharedUsers;
	serializedObject.createDate = this.createDate;
	serializedObject.modifiedDate = this.modifiedDate;
	serializedObject.recycled = this.recycled;
	return serializedObject;
};

/*
* Given a valid User object, user, adds this user to the set of
* shared owners
*/
Note.prototype.shareFile = function (user) {
	this.sharedUsers.push(user);
	this.emitEvent("changed");
};

/*
* Change the name of the note to newName
*/
Note.prototype.updateName = function (newName) {
	this.name = newName;
	this.emitEvent("changed");
};

Note.prototype.recycle = function () {
	this.recycled = true;
	this.emitEvent("changed");
};

Note.prototype.isRecycled = function () {
	return this.recycled;
};

Note.prototype.restore = function () {
	this.recycled = false;
	this.emitEvent("changed");
};
