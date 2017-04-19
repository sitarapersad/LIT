var folderCount = 0;
var fileCount = 0;
var shareDialogOpen =  false;

var currentFolder = new Folder('home', 'Owner', folderCount); // TODO: CHANGE THIS TO A PRE-POPULATED DIRECTORY FOR USER TESTING
var folderChain = [currentFolder];
folderCount += 1;

$("body").click
(
  function(e)
  {
  	console.log(e.target.className);
    if(e.target.className.includes("options")){
    	console.log("DISPLAY OPTIONS");
    }
    else{
    	console.log('REMOVE');
    	console.log($('#sharing-options'));
    	$("#sharing-options").remove()
    	shareDialogOpen = false;
    }
  }
);

// Allow files and folders to be dropped into other folders
function allowDrop(e){
	e.preventDefault();
}

function drag(e){
	e.preventDefault();
	console.log($(e.target).parent());
}

function drop(e){
	console.log(e.dataTransfer);
	console.log(e.dataTransfer.getData("Text"));
	alert('Added to ' + e.target.id+ ' !');
}

function saveFolderName(folderID){
	var changeFolder = folderChain[folderChain.length-1].getFolder(folderID);
	var newName = document.getElementById("folderName_"+folderID).value;
	changeFolder.updateName(newName);
}

function saveFileName(fileID){
	var changeFile = folderChain[folderChain.length-1].getFile(fileID);
	console.log(changeFile);
	var newName = document.getElementById("fileName_"+fileID).value;
	changeFile.updateName(newName);
}

function openFolder(newFolderID){
	// Clear the current folders from the page
	$('#folderContainer').empty();
	$('#fileContainer').empty();
	$('#templateContainer').empty();
	// change currentFolder to the new folder
	subFolder = folderChain[folderChain.length-1].getFolder(newFolderID);
	folderChain.push(subFolder);
	// Load the subfolders and subfiles
	console.log('Opening '+folderChain[folderChain.length-1].ID);
}

function openFile(newFileID){
	// Open the URL for the file editor, need to find a way to pass data about the ID
	localStorage.setItem('DIRECTORY',JSON.stringify(folderChain[0]));
	window.location = "/editor.html#show";
}

function createFolder(){
	newFolder = new Folder('Untitled', 'Owner', folderCount);
	console.log(folderChain[folderChain.length-1]);
	console.log('Adding folder '+newFolder.ID +' to '+folderChain[folderChain.length-1].ID);
	folderChain[folderChain.length-1].addFolder(newFolder);
	folderCount += 1;
	drawFolder(newFolder);
}

function createFile(){
	newFile = new Note('Untitled', 'Owner', fileCount);
	console.log('Creating file in '+folderChain[folderChain.length-1].ID);
	folderChain[folderChain.length-1].addFile(newFile);
	fileCount += 1;
	drawFile(newFile);
}

function modifyFileOptions(){

}
// <!-- Event Handlers -->
function drawFolder(folderToAdd){
	console.log('Adding folder to view');
	$('#emptyFolder').remove();
	var div = document.createElement("div");
	div.setAttribute("class", "col-md-4 col-sm-4 col-lg-4 col-xs-4 col-xl-4 control-label center-block text-center");
	div.setAttribute("draggable", "true");
	div.setAttribute("ondrop","drop(event)");
	div.setAttribute("ondragover", "allowDrop(event)");
	div.setAttribute("ondblclick", "openFolder('"+folderToAdd.ID+"')");
	div.id = "folder_"+folderToAdd.ID;

	div.style.width = "150px";
	div.style.height = "150px";
	div.style.background = "white";
	div.style.margin = "25px";
	div.style.padding = "0px";


	var table = document.createElement("table");
	var img_row = table.insertRow(0);
	var img_cell = img_row.insertCell(0);
	img_cell.style.height = "125px";
	img_cell.style.width = "150px";
	img_cell.style.backgroundColor = "#c4c4d6";
	img_cell.style.padding = "0px";
	img_cell.innerHTML = "<img src='images/folder.png' style='width:100px; height:100px; cursor:move;'>";


	var details_row = table.insertRow(1);
	var input_cell = details_row.insertCell(0);

	var input_name = document.createElement("input");
	input_name.setAttribute('class', 'text-center');
	input_name.setAttribute('type', 'text');
	input_name.setAttribute('value', folderToAdd.name);
	input_name.setAttribute('onKeyUp', "saveFolderName('"+folderToAdd.ID+"')");
	input_name.id = "folderName_"+folderToAdd.name;
	input_cell.appendChild(input_name);

	div.appendChild(table);

	var options = document.createElement("div");
	options.setAttribute('onclick', "modifyFileOptions('"+folderToAdd+"')");
	options.innerHTML = "<span class='glyphicon glyphicon-option-vertical options' style='right:0; padding-top:5px;'></span>";
	options.style.marginRight = "-10px";
	options.setAttribute("class", "options");
	options.id = "options_"+folderToAdd.ID;

	$(options).on('click', '*', function(e){
		if (!shareDialogOpen){
		    var x =e.pageX -$(document).scrollLeft();
		    var y =e.pageY -$(document).scrollTop();

		    var div = document.createElement("div");
		    div.id = "sharing-options";
		    div.style.position = "static";
		    div.style.zIndex = 1000000000000;
		    div.style.width = "300px";
		    div.fontFamily = "PT Sans";
		    div.style.border = "thin solid #bababa";
		    div.style.backgroundColor = "white";
		    div.style.top = y;
		    div.style.left = x;

		    div.innerHTML = '<div class="container text-left " style="width:300px; font-family: PT Sans;"><div class="row nav-option" onclick="deleteFolder()"> <span class="glyphicon glyphicon-trash" style="padding-right: 15px;"></span> Delete </div><div class="row nav-option" onclick="shareFolder()"> <span class="glyphicon glyphicon-user style="padding-right: 50px;"></span>   Share With ... </div> </div>'
		    this.appendChild(div);
		   shareDialogOpen = true;
		}
		else{
			$("#sharing-options").remove()
			shareDialogOpen = false;
		}
	});


	div.appendChild(options);
		// "<div class='container filename text-center'> <div class='row'><div class='col-lg-8'><input type='text' name='name' placeholder='Untitled' value='Untitled'></div> <div class='col-lg-1'>A</div> <div class='col-lg-1'> B </div> </div> </div>";

	document.getElementById("folderContainer").appendChild(div);
};

function drawFile(fileToAdd){
	$('#emptyFile').remove();
	var div = document.createElement("div");
	div.setAttribute("class", "col-md-4 col-sm-4 col-lg-4 col-xs-4 col-xl-4 control-label center-block text-center");
	div.setAttribute("draggable","true");
	div.id = "file_"+fileToAdd.ID;
	div.setAttribute("ondblclick", "openFile('"+fileToAdd.ID+"')");
	div.style.width = "150px";
	div.style.height = "175px";
	div.style.background = "white";
	div.style.margin = "25px";
	div.style.padding = "0px";


	var table = document.createElement("table");
	var img_row = table.insertRow(0);
	var img_cell = img_row.insertCell(0);
	img_cell.style.height = "150px";
	img_cell.style.width = "150px";
	img_cell.style.backgroundColor = "#c4c4d6";
	img_cell.style.padding = "0px";
	img_cell.innerHTML = "<img src='images/file.png' style='width:120px; height:120px; cursor:move;'>";


	var details_row = table.insertRow(1);
	var input_cell = details_row.insertCell(0);

	var input_name = document.createElement("input");
	input_name.setAttribute('class', 'text-center');
	input_name.setAttribute('type', 'text');
	input_name.setAttribute('value', fileToAdd.name);
	input_name.setAttribute('onKeyUp', "saveFileName('"+fileToAdd.ID+"')");
	input_name.id = "fileName_"+fileToAdd.ID;
	input_cell.appendChild(input_name);

	div.appendChild(table);


	// div.innerHTML = "<table><tr><td style='height:150px; width:150px; background-color:#c4c4d6; padding:0px;'> <img src='images/file.png' style='width:125px; height:125px; cursor:move;'> </td></tr> <tr><td style='background-color:red;'><input type='text' name='name' class='text-center' placeholder='Untitled' value='Untitled'></td> </tr></table>"

	var options = document.createElement("div");
	options.setAttribute('onclick', "modifyFileOptions('"+fileToAdd+"')");
	options.style.marginRight = "-10px";
	options.innerHTML = "<span class='glyphicon glyphicon-option-vertical options' style='right:0; padding-top:5px;'></span>";
	options.setAttribute("class", "options");

	div.appendChild(options);
		// "<div class='container filename text-center'> <div class='row'><div class='col-lg-8'><input type='text' name='name' placeholder='Untitled' value='Untitled'></div> <div class='col-lg-1'>A</div> <div class='col-lg-1'> B </div> </div> </div>";

	document.getElementById("fileContainer").appendChild(div);
};
