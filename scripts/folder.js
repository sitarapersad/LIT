/**
 * Folder represents a collection of Notes created by an owner and stored.
 *
 * The folder is identified by an immutable (randomly generated) ID
 * and by a mutable user-designated name
 *
 * The note can be shared with a mutable set of Users.
 * 
 */

var Folder = function(name, owner, ID)
{
  this.ID = owner+ID;

  // Owner (should be an instance of the User class. Right now, it's a string) of the document
  this.owner = owner;
  this.name = name;
  this.sharedUsers = [] ;
  this.files = {} ;
  this.folders = {} ;

  // Other details to be filled out at a more relaxed time
  this.createDate = 0;
  this.modifiedDate = 0;


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
    var key = addNote.ID
    this.files.key = addNote; 
    $(this).triggerHandler("addFile", addNote);
  }

  /* 
   * Add another folder to the folder.
   */
  this.addFolder = function(addFolder)  {
    var key = addFolder.ID;
    this.folders[key] = addFolder;
    console.log('Trigger handler into '+ this.ID);
    $(this).triggerHandler("addFolder", addFolder);
  }

  /* 
   * Given a valid User object, user, adds this user to the set of
   * shared owners
   */
  this.shareFile = function(user){
    this.sharedUsers.push(user);
  }


  /* 
   * Given an ID, return the Folder object corresponding to the ID if it exists
   */
  this.getFolder = function(ID){
    if (ID in this.folders){
      return this.folders[ID];
    }
    else{
      console.log(ID+" folder not found");
      return false;
    }
  }
}
  