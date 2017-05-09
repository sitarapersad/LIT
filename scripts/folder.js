/**
 * Folder represents a collection of Notes created by an owner and stored.
 *
 * The folder is identified by an immutable (randomly generated) ID
 * and by a mutable user-designated name
 *
 * The note can be shared with a mutable set of Users.
 *
 */

var Folder = function (name, owner)
{
	this.ID = "Folder_" + owner + StringGenerator.randomAlphaNumericString(10);

	// Owner (should be an instance of the User class. Right now, it's a string) of the document
	this.owner = owner;
	this.name = name;
	this.sharedUsers = [] ;
	this.files = {} ;
	this.folders = {} ;
	this.templates = {};
	this.parentFolder = null;
	this.recycled = false;
	// Other details to be filled out at a more relaxed time
	this.createDate = 0;
	this.modifiedDate = 0;
	this.fileType = "folder";
	return this.ID;
};

/*
* Renames the folder given a new name
*/
Folder.prototype.renameFolder = function (newName) {
	this.name = newName;
};

/*
* Add a note to the folder.
*/
Folder.prototype.addFile = function (addNote)  {
	var key = addNote.ID;
	this.files[key] = addNote;
	addNote.parentFolder = this;
};

/*
* Add another folder to the folder.
*/
Folder.prototype.addFolder = function (addFolder) {
	var key = addFolder.ID;
	this.folders[key] = addFolder;
	addFolder.parentFolder = this;
};

/*
* Add another folder to the folder.
*/
Folder.prototype.addTemplate = function (addTemplate) {
	var key = addTemplate.ID;
	this.templates[key] = addTemplate;
	addTemplate.parentFolder = this;
};

/*
* Delete a note to the folder.
*/
Folder.prototype.deleteFile = function (addNote) {
	var key = addNote.ID;
	delete this.files[key];
};

/*
* Add another folder to the folder.
*/
Folder.prototype.deleteFolder = function (addFolder) {
	var key = addFolder.ID;
	delete this.folders[key];
};

/*
* Add another folder to the folder.
*/
Folder.prototype.deleteTemplate = function (addTemplate) {
	var key = addTemplate.ID;
	delete this.templates[key];
};

/*
* Given a valid User object, user, adds this user to the set of
* shared owners
*/
Folder.prototype.shareFile = function (user) {
	this.sharedUsers.push(user);
};

/*
* Change the name of the note to newName
*/
Folder.prototype.updateName = function (newName) {
	this.name = newName;
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
};
