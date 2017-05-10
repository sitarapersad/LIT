
var appendToPath = "file:///C:/Users/Sitara/LIT/";
var folderCount = 0;
var fileCount = 0;
var shareDialogOpen =  false;
var folderChain = []

$("body").click	(function (e) {
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
});

window.onclick = function(event) {
	var modal = document.getElementById("shareDialog");
	if (event.target == modal) {
		modal.style.display = "none";
	}
}

function changeURL(newUrl){
	console.log(appendToPath +newUrl);
	document.location.href = appendToPath +newUrl;
}

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
	var newName = document.getElementById("fileName_"+fileID).value;
	changeFile.updateName(newName);
}

function saveTemplateName(templateID){
	var changeTemplate = folderChain[folderChain.length-1].getTemplate(templateID);
	var newName = document.getElementById("templateName_"+templateID).value;
	changeTemplate.updateName(newName);
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
	for (var key in subFolder.folders) {
		newFolder = subFolder.folders[key];
		console.log(subFolder.folders[key]);
		drawFolder(newFolder);
	};

	for (var key in subFolder.files) {
		newFile = subFolder.files[key];
		console.log(subFolder.files[key]);
		drawFile(newFile);
	}

	var activeFolders = "Home ";
	for (var i=1; i<folderChain.length; i++) {
		folder = folderChain[i];
		activeFolders += "> "+folder.name +" ";
	}

	document.getElementById("folderChain").innerHTML = activeFolders;
};

function openFile(newFileID){
	// Open the URL for the file editor, need to find a way to pass data about the ID
	localStorage.setItem('DIRECTORY',JSON.stringify(folderChain[0]));
	document.location.href = "note.html";
};

function openTemplate(newTemplateID){
	// Open the URL for the file editor, need to find a way to pass data about the ID
	localStorage.setItem('DIRECTORY',JSON.stringify(folderChain[0]));
	document.location.href = "note.html#template";
};


function createFolder(){
	newFolder = new Folder('Untitled', 'Owner', folderCount);
	console.log(folderChain[folderChain.length-1]);
	console.log('Adding folder '+newFolder.ID +' to '+folderChain[folderChain.length-1].ID);
	folderChain[folderChain.length-1].addFolder(newFolder);
	folderCount += 1;
	drawFolder(newFolder);
};

function createFile(){
	newFile = new Note('Untitled', 'Owner', fileCount);
	console.log('Creating file in '+folderChain[folderChain.length-1].ID);
	folderChain[folderChain.length-1].addFile(newFile);
	fileCount += 1;
	drawFile(newFile);
};

function createTemplate(){
	newFile = new Note('Untitled', 'Owner', fileCount);
	console.log('Creating file in '+folderChain[folderChain.length-1].ID);
	// folderChain[folderChain.length-1].addFile(newFile);
	// fileCount += 1;
	drawTemplate(newFile);
};

/*
* Move up one layer in the directory
*/
/*
* Move up one layer in the directory
*/
function moveUp(){
	if (folderChain.length > 1){
		$('#folderContainer').empty();
		$('#fileContainer').empty();
		$('#templateContainer').empty();


		folderChain.pop();
		subFolder = folderChain[folderChain.length-1];
		console.log('Moving up into '+ subFolder.ID);

		for (var key in subFolder.folders) {
			newFolder = subFolder.folders[key];
			console.log(subFolder.folders[key]);
			drawFolder(newFolder);
		};

		for (var key in subFolder.files) {
			newFile = subFolder.files[key];
			console.log(subFolder.files[key]);
			drawFile(newFile);
		}

		var activeFolders = "Home ";
		for (var i=1; i<folderChain.length; i++){
			folder = folderChain[i];
			activeFolders += "> "+folder.name+" ";
		}

		document.getElementById("folderChain").innerHTML = activeFolders;
	};
};

// <!-- Event Handlers -->
function drawFolder(folderToAdd){
console.log('Adding folder to view');
$('#emptyFolder').remove();
var div = document.createElement("div");
div.setAttribute("class", "col-md-4 col-sm-4 col-lg-4 col-xs-4 col-xl-4 control-label center-block text-center");
// div.setAttribute("draggable", "true");
// div.setAttribute("ondrop","drop(event)");
// div.setAttribute("ondragover", "allowDrop(event)");
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
img_cell.innerHTML = "<img src='images/folder.png' style='width:100px; height:100px; cursor:pointer;'>";
img_cell.setAttribute("ondblclick", "openFolder('"+folderToAdd.ID+"')");

var details_row = table.insertRow(1);
var input_cell = details_row.insertCell(0);

var input_name = document.createElement("input");
input_name.setAttribute('class', 'text-center');
input_name.setAttribute('type', 'text');
input_name.setAttribute('value', folderToAdd.name);
input_name.setAttribute('onKeyUp', "saveFolderName('"+folderToAdd.ID+"')");
input_name.id = "folderName_"+folderToAdd.ID;
input_cell.appendChild(input_name);

div.appendChild(table);

var options = document.createElement("div");
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
		div.style.width = "300px";
		div.fontFamily = "PT Sans";
		div.style.border = "thin solid #bababa";
		div.style.backgroundColor = "white";
		div.style.top = e.clientY+"px";
		div.style.left = e.clientX+10+"px";
		div.style.position = "fixed";
		div.style.zIndex = 5;
		div.innerHTML = '<div class="container text-left " style="width:300px; font-family: PT Sans;"><div class="row nav-option" onclick="deleteFolder()"> <span class="glyphicon glyphicon-trash" style="padding-right: 15px;"></span> Delete </div> <div class="row nav-option" onclick="openShareDialog()"> <span class="glyphicon glyphicon-user" style="padding-right: 15px;"></span> Share with... </div> <div class="row nav-option" onclick="deleteFolder()"> <span class="glyphicon glyphicon-certificate" style="padding-right: 15px;"></span> Owned by: David Bau </div></div>';
		document.getElementById("folderContainer").appendChild(div);
	   shareDialogOpen = true;
	}
	else{
		$("#sharing-options").remove()
		shareDialogOpen = false;
	}
});


div.appendChild(options);
	// "<div class='container filename text-center'> <div class='row'><div class='col-lg-8'><input type='text' name='name' placeholder='Untitled' value='Untitled'></div> <div class='col-lg-1'>A</div> <div class='col-lg-1'> B </div> </div> </div>";

console.log('GOT HERE');
	document.getElementById("folderContainer").appendChild(div);
};

function drawFile(fileToAdd){
	$('#emptyFile').remove();
	var div = document.createElement("div");
	div.setAttribute("class", "col-md-4 col-sm-4 col-lg-4 col-xs-4 col-xl-4 control-label center-block text-center");
	// div.setAttribute("draggable","true");
	div.id = "file_"+fileToAdd.ID;
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

	img_cell.setAttribute("ondblclick", "openFile('"+fileToAdd.ID+"')");
	img_cell.innerHTML = "<img src='images/file.png' style='width:120px; height:120px; cursor:pointer;'>";


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

	var options = document.createElement("div");
	options.style.marginRight = "-10px";
	options.innerHTML = "<span class='glyphicon glyphicon-option-vertical options' style='right:0; padding-top:5px;'></span>";
	options.setAttribute("class", "options");


	$(options).on('click', '*', function(e){
		if (!shareDialogOpen){
			var x =e.pageX -$(document).scrollLeft();
			var y =e.pageY -$(document).scrollTop();

			var div = document.createElement("div");
			div.id = "sharing-options";
			div.style.width = "300px";
			div.fontFamily = "PT Sans";
			div.style.border = "thin solid #bababa";
			div.style.backgroundColor = "white";
			div.style.top = e.clientY+"px";
			div.style.left = e.clientX+10+"px";
			div.style.position = "fixed";
			div.style.zIndex = 5;
			div.innerHTML = '<div class="container text-left " style="width:300px; font-family: PT Sans;"><div class="row nav-option" onclick="deleteFolder()"> <span class="glyphicon glyphicon-trash" style="padding-right: 15px;"></span> Delete </div> <div class="row nav-option" onclick="openShareDialog()"> <span class="glyphicon glyphicon-user" style="padding-right: 15px;"></span> Share with... </div> <div class="row nav-option" onclick="deleteFolder()"> <span class="glyphicon glyphicon-certificate" style="padding-right: 15px;"></span> Owned by: David Bau </div></div>';
			document.getElementById("folderContainer").appendChild(div);
		   shareDialogOpen = true;
		}
		else{
			$("#sharing-options").remove()
			shareDialogOpen = false;
		}
	});


	div.appendChild(options);
	document.getElementById("fileContainer").appendChild(div);
};


function drawTemplate(templateToAdd){
	$('#emptyTemplate').remove();
	var div = document.createElement("div");
	div.setAttribute("class", "col-md-4 col-sm-4 col-lg-4 col-xs-4 col-xl-4 control-label center-block text-center");
	// div.setAttribute("draggable","true");
	div.id = "file_"+templateToAdd.ID;
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

	img_cell.setAttribute("ondblclick", "openTemplate('"+templateToAdd.ID+"')");
	img_cell.innerHTML = "<img src='images/science.png' style='width:120px; height:120px; cursor:pointer;'>";


	var details_row = table.insertRow(1);
	var input_cell = details_row.insertCell(0);

	var input_name = document.createElement("input");
	input_name.setAttribute('class', 'text-center');
	input_name.setAttribute('type', 'text');
	input_name.setAttribute('value', templateToAdd.name);
	input_name.setAttribute('onKeyUp', "saveTemplateName('"+templateToAdd.ID+"')");
	input_name.id = "templateName_"+templateToAdd.ID;
	input_cell.appendChild(input_name);

	div.appendChild(table);

	var options = document.createElement("div");
	options.style.marginRight = "-10px";
	options.innerHTML = "<span class='glyphicon glyphicon-option-vertical options' style='right:0; padding-top:5px;'></span>";
	options.setAttribute("class", "options");


	$(options).on('click', '*', function(e){
		if (!shareDialogOpen){
			var x =e.pageX -$(document).scrollLeft();
			var y =e.pageY -$(document).scrollTop();

			var div = document.createElement("div");
			div.id = "sharing-options";
			div.style.width = "300px";
			div.fontFamily = "PT Sans";
			div.style.border = "thin solid #bababa";
			div.style.backgroundColor = "white";
			div.style.top = e.clientY+"px";
			div.style.left = e.clientX+10+"px";
			div.style.position = "fixed";
			div.style.zIndex = 5;
			div.innerHTML = '<div class="container text-left " style="width:300px; font-family: PT Sans;"><div class="row nav-option" onclick="deleteFolder()"> <span class="glyphicon glyphicon-trash" style="padding-right: 15px;"></span> Delete </div> <div class="row nav-option" onclick="openShareDialog()"> <span class="glyphicon glyphicon-user" style="padding-right: 15px;"></span> Share with... </div> <div class="row nav-option" onclick="deleteFolder()"> <span class="glyphicon glyphicon-certificate" style="padding-right: 15px;"></span> Owned by: David Bau </div></div>';
			document.getElementById("folderContainer").appendChild(div);
		   shareDialogOpen = true;
		}
		else{
			$("#sharing-options").remove()
			shareDialogOpen = false;
		}
	});


	div.appendChild(options);
	document.getElementById("templateContainer").appendChild(div);
};


function openShareDialog(){
	var modal = document.getElementById('shareDialog');
	 modal.style.display = "block";
};

function closeShareDialog(){
	var modal = document.getElementById('shareDialog');
	modal.style.display = "none";
}

function shareWith() {
	var div = document.createElement("div");
	div.innerHTML = "Success!";
	document.getElementById("shareDialogContent").appendChild(div);
	setTimeout(function(){
		document.getElementById("shareDialogContent").removeChild(div);
		closeShareDialog();
	}, 1000);
};


function openTopStackFolder() {
	$('#folderContainer').empty();
	$('#fileContainer').empty();
	$('#templateContainer').empty();
	var subFolder = folderChain[folderChain.length-1]
	if (subFolder){
		// If the folder contains subfolders, draw them
		for (var key in subFolder.folders) {
			newFolder = subFolder.folders[key];
			if (!newFolder.isRecycled() || trashMode) {
				drawFolder(newFolder);
				$('#emptyFolder').hide();
			}

		}
	}
	else{
		console.log('No subfolders.');
		$('#emptyFolder').show();
	}

	if(subFolder){
		// If the folder contains files, draw them
		for (var key in subFolder.files) {
			newFile = subFolder.files[key];
			if (!newFile.isRecycled()){
				drawFile(newFile);
				$('#emptyFile').hide();
			}

		}
	}
	else{
		console.log('No files in folder.')
		$('#emptyFile').show();
	}

	// Draw in templates contained in folder
	if(subFolder){
		// If the folder contains files, draw them
		for (var key in subFolder.templates) {
			newTemplate = subFolder.templates[key];
			if (!newTemplate.isRecycled()){
				drawTemplate(newTemplate);
				$('#emptyFile').hide();
			}

		}
	}
	else{
		console.log('No files in folder.')
		$('#emptyFile').show();
	}


	var activeFolders = '<input class="btn btn-primary" type="button" onclick="moveUp(0)" id="level0" value="Home">';
	for (var i=1; i<folderChain.length; i++) {
		folder = folderChain[i];
		activeFolders += '<span class="glyphicon glyphicon-chevron-right"></span><input class="btn btn-primary" type="button" onclick="moveUp('+i+')" id="level'+i+'" value="'+folder.name+'">';
	};
	document.getElementById("folderChain").innerHTML = activeFolders;
	document.activeElement.blur();
};

// Startup

folderChain.push(Storage.sharedFolder);
openTopStackFolder();
