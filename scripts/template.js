/**
 * Note represents a document created by an owner and stored.
 *
 * The note is identified by an immutable (randomly generated) ID
 * and by a mutable user-designated name
 *
 * The note can be shared with a mutable set of Users.
 * 
 */

var Template = function(name, owner, ID)
{
  // Randomly generate an identifier (ID)
  this.ID = owner+ID;

  // Owner (an instance of the User class) of the document
  this.owner = owner;
  this.name = name;
  this.sharedUsers = [] ;

  // Other details to be filled out at a more relaxed time
  this.createDate = 0;
  this.modifiedDate = 0;

  this.parentFolder = null;
  this.recycled = false;

  /* 
   * Given a valid User object, user, adds this user to the set of
   * shared owners
   */
  this.shareFile = function(user){
    this.sharedUsers.push(user);
  }

  /* 
   * Change the name of the note to newName
   */
  this.updateName = function(newName){
    console.log('Renaming note: '+this.name+' to '+newName);
    this.name = newName;
  }

  this.recycle = function(){
    this.recycled = true;
  }

  this.isRecycled = function(){
    return this.recycled;
  }

  this.restore = function(){
    this.recycled = false;
  }
} 