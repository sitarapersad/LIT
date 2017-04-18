/**
 * Note represents a document created by an owner and stored.
 *
 * The note is identified by an immutable (randomly generated) ID
 * and by a mutable user-designated name
 *
 * The note can be shared with a mutable set of Users.
 * 
 */

var Note = function(name, owner, ID)
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


  /* 
   * Renames the file given a new name
   */
  this.renameFile = function(newName)  {
    this.name = newName; 
  }

  /* 
   * Given a valid User object, user, adds this user to the set of
   * shared owners
   */
  this.shareFile = function(user){
    this.sharedUsers.push(user);
  }

} 