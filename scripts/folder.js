/**
 * Folder represents a collection of Notes created by an owner and stored.
 *
 * The folder is identified by an immutable (randomly generated) ID
 * and by a mutable user-designated name
 *
 * The note can be shared with a mutable set of Users.
 * 
 */

var Folder = function(name, owner)
{
  // Randomly generate an identifier (ID)
  this.ID = Math.floor(Math.random() * 1000000);

  // Owner (an instance of the User class) of the document
  this.owner = owner;
  this.name = name;
  this.sharedUsers = [] ;
  this.files = [] ;

  // Other details to be filled out at a more relaxed time
  this.createDate = 0;
  this.modifiedDate = 0;
  }

  /* 
   * Renames the folder given a new name
   */
  this.renameFolder = function(newName)  {
    this.name = newName; 
  }

  /* 
   * Add a note to the folder.
   */
  this.addFile = function(addNote)  {
    this.files.push(addNote); 
  }

  /* 
   * Given a valid User object, user, adds this user to the set of
   * shared owners
   */
  this.shareFile = function(user){
    this.sharedUsers.push(user);
  }

  