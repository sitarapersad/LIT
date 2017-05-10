/**
 * Folder represents a collection of Notes created by an owner and stored.
 *
 * The folder is identified by an immutable (randomly generated) ID
 * and by a mutable user-designated name
 *
 * The note can be shared with a mutable set of Users.
 *
 */

var Folder = function (initialData)
{
	EventCapableObject.call(this);

	if (initialData.ID) this.ID = initialData.ID;
	else this.ID = "Folder_" + initialData.owner + StringGenerator.randomAlphaNumericString(10);

	// Owner (should be an instance of the User class. Right now, it's a string) of the document
	this.owner = initialData.owner;
	this.name = initialData.name;

	if (initialData.sharedUsers) this.sharedUsers = initialData.sharedUsers;
	else this.sharedUsers = [];

	if (initialData.createDate) this.createDate = initialData.createDate;
	else this.createDate = 0;

	if (initialData.modifiedDate) this.modifiedDate = initialData.modifiedDate;
	else this.modifiedDate = 0;

	if (initialData.parentFolder) this.parentFolder	= initalData.parentFolder;
	else this.parentFolder = null;

	if (initialData.recycled) this.recycled = initialData.recycled;
	else this.recycled = false;

	this.folders = {};
	if (initialData.folders) {
		for (var folderKey in initialData.folders) {
			this.addFolder(new Folder(initialData.folders[folderKey]));
		}
	}

	this.files = {};
	if (initialData.files) {
		for (var fileKey in initialData.files) {
			this.addFile(new Note(initialData.files[fileKey]));
		}
	}

	this.templates = {};
	if (initialData.templates) {
		for (var templateKey in initialData.templates) {
			this.addTemplate(new Template(initialData.templates[templateKey]));
		}
	}

	return this.ID;
};

Folder.prototype = Object.create(EventCapableObject.prototype);
Folder.prototype.constructor = Folder;

Object.defineProperty(Folder.prototype, "fileType", {value: "folder"});

Folder.prototype.serialize = function () {
	var serializedObject = {};
	serializedObject.ID = this.ID;
	serializedObject.owner = this.owner;
	serializedObject.name = this.name;
	serializedObject.sharedUsers = this.sharedUsers;
	serializedObject.createDate = this.createDate;
	serializedObject.modifiedDate = this.modifiedDate;
	serializedObject.recycled = this.recycled;

	serializedObject.folders = {};
	serializedObject.files = {};
	serializedObject.templates = {};

	for (var folderKey in this.folders)
	{
		serializedObject.folders[folderKey] = this.folders[folderKey].serialize();
	}

	for (var fileKey in this.files)
	{
		serializedObject.files[fileKey] = this.files[fileKey].serialize();
	}

	for (var templateKey in this.templates)
	{
		serializedObject.templates[templateKey] = this.templates[templateKey].serialize();
	}

	return serializedObject;
};

/*
* Renames the folder given a new name
*/
Folder.prototype.renameFolder = function (newName) {
	this.name = newName;
	this.emitEvent("changed");
};

/*
* Add a note to the folder.
*/
Folder.prototype.addFile = function (addNote)  {
	var key = addNote.ID;
	this.files[key] = addNote;
	addNote.parentFolder = this;
	var self = this;
	addNote.addEventListener("changed", function () {
		self.emitEvent("changed");
	});
	this.emitEvent("changed");
};

/*
* Add another folder to the folder.
*/
Folder.prototype.addFolder = function (addFolder) {
	var key = addFolder.ID;
	this.folders[key] = addFolder;
	addFolder.parentFolder = this;
	var self = this;
	addFolder.addEventListener("changed", function () {
		self.emitEvent("changed");
	});
	this.emitEvent("changed");
};

/*
* Add another folder to the folder.
*/
Folder.prototype.addTemplate = function (addTemplate) {
	var key = addTemplate.ID;
	this.templates[key] = addTemplate;
	addTemplate.parentFolder = this;
	var self = this;
	addTemplate.addEventListener("changed", function () {
		self.emitEvent("changed");
	});
	this.emitEvent("changed");
};

/*
* Delete a note to the folder.
*/
Folder.prototype.deleteFile = function (addNote) {
	var key = addNote.ID;
	delete this.files[key];
	this.emitEvent("changed");
};

/*
* Add another folder to the folder.
*/
Folder.prototype.deleteFolder = function (addFolder) {
	var key = addFolder.ID;
	delete this.folders[key];
	this.emitEvent("changed");
};

/*
* Add another folder to the folder.
*/
Folder.prototype.deleteTemplate = function (addTemplate) {
	var key = addTemplate.ID;
	delete this.templates[key];
	this.emitEvent("changed");
};

/*
* Given a valid User object, user, adds this user to the set of
* shared owners
*/
Folder.prototype.shareFile = function (user) {
	this.sharedUsers.push(user);
	this.emitEvent("changed");
};

/*
* Change the name of the note to newName
*/
Folder.prototype.updateName = function (newName) {
	this.name = newName;
	this.emitEvent("changed");
};

/*
* Returns true if there are subfolders within this folder. Otherwise, false.
*/
Folder.prototype.hasFolders = function () {
	return Object.keys(this.folders).length == 0;
};

/*
* Returns true if there are files within this folder. Otherwise, false.
*/
Folder.prototype.hasFiles = function () {
	return Object.keys(this.files).length == 0;
};

/*
* Returns true if there are templates within this folder. Otherwise, false.
*/
Folder.prototype.hasTemplates = function () {
	return Object.keys(this.templates).length == 0;
};

/*
* Given an ID, return the Folder object corresponding to the ID if it exists
*/
Folder.prototype.getFolder = function (ID) {
	if (ID in this.folders) {
		return this.folders[ID];
	}
	else {
		console.log("Folder not found:", ID); // eslint-disable-line no-console
		return false;
	}
};

/*
* Given an ID, return the Folder object corresponding to the ID if it exists
*/
Folder.prototype.getFile = function (ID) {
	if (ID in this.files) {
		return this.files[ID];
	}
	else{
		console.log("File not found:", ID); // eslint-disable-line no-console
		return false;
	}
};

Folder.prototype.getTemplate = function (ID) {
	if (ID in this.templates) {
		return this.templates[ID];
	}
	else{
		console.log("File not found:", ID); // eslint-disable-line no-console
		return false;
	}
};

Folder.prototype.recycle = function () {
	this.recycled = true;

	for (var key in this.folders) {
		newFolder = this.folders[key];
		newFolder.recycle();
	}

	for (key in this.files) {
		newFile = this.files[key];
		newFile.recycle();
	}

	for (key in this.templates) {
		newTemplate = this.templates[key];
		newTemplate.recycle();
	}
	this.emitEvent("changed");
};

Folder.prototype.isRecycled = function () {
	return this.recycled;
};

Folder.prototype.restore = function () {
	this.recycled = false;

	for (var key in this.folders) {
		newFolder = this.folders[key];
		newFolder.restore();
	}

	for (key in this.files) {
		newFile = this.files[key];
		newFile.restore();
	}

	for (key in this.templates) {
		newTemplate = this.templates[key];
		newTemplate.restore();
	}
	this.emitEvent("changed");
};
