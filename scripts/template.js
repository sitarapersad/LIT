/**
 * Note represents a document created by an owner and stored.
 *
 * The note is identified by an immutable (randomly generated) ID
 * and by a mutable user-designated name
 *
 * The note can be shared with a mutable set of Users.
 *
 */

var Template = function (name, owner)
{
    // Randomly generate an identifier (ID)
    this.ID = owner + StringGenerator.randomAlphaNumericString(10);

    // Owner (an instance of the User class) of the document
    this.owner = owner;
    this.name = name;
    this.sharedUsers = [] ;

    // Other details to be filled out at a more relaxed time
    this.createDate = 0;
    this.modifiedDate = 0;

    this.parentFolder = null;
    this.recycled = false;

    return this.ID;
}

/*
 * Given a valid User object, user, adds this user to the set of
 * shared owners
 */
Template.prototype.shareFile = function (user) {
    this.sharedUsers.push(user);
}

/*
 * Change the name of the note to newName
 */
Template.prototype.updateName = function (newName) {
    this.name = newName;
}

Template.prototype.recycle = function () {
    this.recycled = true;
}

Template.prototype.isRecycled = function () {
    return this.recycled;
}

this.restore = function () {
    this.recycled = false;
}
