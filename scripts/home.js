var folderCount = 0;
var fileCount = 0;
var templateCount = 0;
var shareDialogOpen =  false;
var folderChain = [];
var activeDocument = false;
var trashFolder = new Folder('Recycle Bin', 'Owner', folderCount);
fileCount += 1;

var trashMode = false;

document.body.addEventListener("click", function (e) {
	if (e.target.className.includes("options")){
		console.log("DISPLAY OPTIONS");
	}
	else{
		$("#sharing-options").remove()
		shareDialogOpen = false;
	}
});

window.onclick = function(event) {
	var modal = document.getElementById("shareDialog");
	if (event.target == modal) {
		modal.style.display = "none";
	}
	if (activeDocument){
		console.log(event.target);
		if (event.target == document.getElementById(activeDocument)){
			document.getElementById(activeDocument).style.boxShadow = "2px 2px 2px #66767c";
		}
	}

}

// Allow files and folders to be dropped into other folders
function allowDrop(e) {
	e.preventDefault();
}

function drag(e) {
	e.preventDefault();
}

function drop(e) {
	e.preventDefault();
}

function saveFolderName(folderID) {
	var changeFolder = folderChain[folderChain.length-1].getFolder(folderID);
	var newName = document.getElementById("folderName_"+folderID).value;
	if (newName.length==0){
		newName = 'Untitled';
	}
	changeFolder.updateName(newName);
}

function saveFileName(fileID) {
	var changeFile = folderChain[folderChain.length-1].getFile(fileID);
	console.log(changeFile);
	var newName = document.getElementById("fileName_"+fileID).value;
	if (newName.length==0){
		newName = 'Untitled';
	}
	changeFile.updateName(newName);
}

function openFile(newFileID) {
	// Open the URL for the file editor, need to find a way to pass data about the ID
	localStorage.setItem('DIRECTORY',JSON.stringify(folderChain[0]));
	document.location.href = "note.html";
};

function openTemplate(newTemplateID){
	// Open the URL for the file editor, need to find a way to pass data about the ID
	localStorage.setItem('DIRECTORY',JSON.stringify(folderChain[0]));
	document.location.href = "editor.html";
};


function createFolder(){
	newFolder = new Folder('Untitled', 'Owner', folderCount);
	console.log(folderChain[folderChain.length-1]);
	console.log('Adding folder '+newFolder.ID +' to '+folderChain[folderChain.length-1].ID);
	folderChain[folderChain.length-1].addFolder(newFolder);
	folderCount += 1;
	drawFolder(newFolder);
	document.getElementById("folderName_"+newFolder.ID).focus();
	document.getElementById("folderName_"+newFolder.ID).select();
};

function createFile(){
	newFile = new Note('Untitled', 'Owner', fileCount);
	console.log('Creating file in '+folderChain[folderChain.length-1].ID);
	folderChain[folderChain.length-1].addFile(newFile);
	fileCount += 1;
	drawFile(newFile);
	document.getElementById("fileName_"+newFile.ID).focus();
	document.getElementById("fileName_"+newFile.ID).select();
};

function createTemplate(){
	newTemplate = new Template('Untitled', 'Owner', templateCount);
	console.log('Creating template '+templateCount+' in '+folderChain[folderChain.length-1].ID);
	folderChain[folderChain.length-1].addTemplate(newTemplate);
	templateCount += 1;
	drawTemplate(newTemplate);
	document.getElementById("templateName_"+newTemplate.ID).focus();
	document.getElementById("templateName_"+newTemplate.ID).select();
};

/*
 * Move up to layer n in the directory
 */
function moveUp(n){
	for (i=0; i < folderChain.length-n-1; i++){
		folderChain.pop();
		console.log(folderChain[folderChain.length-1].ID);
	}
	if (folderChain.length==1){
		trashMode = false;
		$('#newDocumentNav').show();
	}

	console.log(folderChain.length);
	openTopStackFolder();
};


/*
 * Given the ID of a folder on the page, highlight the folder and provide additional options
 */
function openFolderDetails(newFolderID){
	console.log("Clicked folderTable"+newFolderID);
	if (activeDocument){
		document.getElementById(activeDocument).style.boxShadow = "2px 2px 2px #66767c";
	}
	if (activeDocument != "folderTable"+newFolderID){
		activeDocument = "folderTable"+newFolderID;
		document.getElementById(activeDocument).style.boxShadow = "2px 2px 2px blue";
		// openNavOptions('folder',newFolderID);
	}
	else{
		activeDocument = false;

	}

};

function openFileDetails(newFileID){
	console.log("Clicked fileTable"+newFileID);
	if (activeDocument){
		document.getElementById(activeDocument).style.boxShadow = "2px 2px 2px #66767c";
	}
	activeDocument = "fileTable"+newFileID;
	document.getElementById(activeDocument).style.boxShadow = "2px 2px 2px blue";
};

function openTemplateDetails(newTemplateID){
	console.log("Clicked templateTable"+newTemplateID);
	if (activeDocument){
		document.getElementById(activeDocument).style.boxShadow = "2px 2px 2px #66767c";
	}
	activeDocument = "templateTable"+newTemplateID;
	document.getElementById(activeDocument).style.boxShadow = "2px 2px 2px blue";
};

function openFolder(newFolderID){
	// change currentFolder to the new folder
	subFolder = folderChain[folderChain.length-1].getFolder(newFolderID);
	folderChain.push(subFolder);
	// Load the subfolders and subfiles
	openTopStackFolder();
};

function openTopStackFolder(){
	$('#folderContainer').empty();
	$('#fileContainer').empty();
	$('#templateContainer').empty();
	var subFolder = folderChain[folderChain.length-1]
	console.log('Opening '+subFolder.ID);
	if (true){
		// If the folder contains subfolders, draw them
		for (var key in subFolder.folders) {
			newFolder = subFolder.folders[key];
			console.log(subFolder.folders[key]);
			if (!newFolder.isRecycled()|| trashMode){
				drawFolder(newFolder);
				$('#emptyFolder').hide();
			}

		}
	}
	else{
		console.log('No subfolders.');
		$('#emptyFolder').show();
	}

	if(true){
		// If the folder contains files, draw them
		for (var key in subFolder.files) {
			newFile = subFolder.files[key];
			console.log(subFolder.files[key]);
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
	if(true){
		// If the folder contains files, draw them
		for (var key in subFolder.templates) {
			newTemplate = subFolder.templates[key];
			console.log(subFolder.templates[key]);
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

function openTopStackTrashFolder(){
	$('#folderContainer').empty();
	$('#fileContainer').empty();
	$('#templateContainer').empty();
	var subFolder = folderChain[folderChain.length-1]
	console.log('Opening '+subFolder.ID);
	if (true){
		// If the folder contains subfolders, draw them
		for (var key in subFolder.folders) {
			newFolder = subFolder.folders[key];
			console.log(subFolder.folders[key]);
			drawFolder(newFolder);
			$('#emptyFolder').hide();
		}
	}
	else{
		console.log('No subfolders.');
		$('#emptyFolder').show();
	}

	if(true){
		// If the folder contains files, draw them
		for (var key in subFolder.files) {
			newFile = subFolder.files[key];
			console.log(subFolder.files[key]);
			drawFile(newFile);
			$('#emptyFile').hide();


		}
	}
	else{
		console.log('No files in folder.')
		$('#emptyFile').show();
	}

	// Draw in templates contained in folder
	if(true){
		// If the folder contains files, draw them
		for (var key in subFolder.templates) {
			newTemplate = subFolder.templates[key];
			console.log(subFolder.templates[key]);
			drawTemplate(newTemplate);
			$('#emptyFile').hide();

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

// Drag/Drop events

function dragstart(ev){
	ev.preventDefault();
	// console.log('Start dragging '+ev.target.id);
	// ev.dataTransfer.setData("Text", ev.target.id);
}
function allowDrop(ev)
{
	ev.preventDefault();
}

function drag(ev)
{
// console.log('Dragging DIV');
// console.log(ev.target.id);
// console.log(ev.dataTransfer.getData("Text"));
// ev.dataTransfer.setData("Text",ev.target.id);
}

function drop(ev){
	ev.preventDefault();
	var data=ev.dataTransfer.getData("Text");
	console.log('Moving '+data+' to ');
	console.log(ev.target);

	if (ev.target.id != data) {
		var img = document.getElementById(data);
		img.parentNode.removeChild(img);
	}
}

//  Drawing folders, files and templates on screen
function drawFolder(folderToAdd){
	console.log('Adding folder to view');
	$('#emptyFolder').hide();
	var docType = 'folder';
	var upperDocType = 'Folder';
	var eltToAdd = folderToAdd;
	var img_src = 'notebook.png';

	drawDocument(eltToAdd, docType, upperDocType, img_src);
}

function drawFile(fileToAdd){
	$('#emptyFile').hide();
	var docType = 'file';
	var upperDocType = 'File';
	var eltToAdd = fileToAdd;
	var img_src = 'file.png';

	drawDocument(eltToAdd, docType, upperDocType, img_src);
}

function drawTemplate(templateToAdd){
	$('#emptyTemplate').hide();
	var docType = 'template';
	var upperDocType = 'Template';
	var eltToAdd = templateToAdd;
	var img_src = 'science.png';

	drawDocument(eltToAdd, docType, upperDocType, img_src);
}

function drawDocument(eltToAdd, docType, upperDocType, img_src){
	var div = document.createElement("div");
	div.setAttribute("class", "col-md-4 col-sm-4 col-lg-4 col-xs-4 col-xl-4 control-label center-block text-center");

	div.id = docType+"_"+eltToAdd.ID;

	div.style.width = "150px";
	div.style.height = "175px";
	div.style.background = "white";
	div.style.margin = "25px";
	div.style.padding = "0px";
	div.style.position = "relative";

	div.setAttribute("ondrag", "drag(event)");
	div.setAttribute("ondragstart", "dragstart(event)");
	div.setAttribute("ondrop", "drop(event)");
	div.setAttribute("ondragover", "allowDrop(event)");
	div.setAttribute("draggable", true);

	var table = document.createElement("table");
	table.setAttribute("draggable", false);

	table.id = docType+"Table"+eltToAdd.ID;
	table.style.boxShadow = "2px 2px 2px #66767c";
	var img_row = table.insertRow(0);
	var img_cell = img_row.insertCell(0);
	img_cell.style.height = "150px";
	img_cell.style.width = "150px";
	img_cell.style.backgroundColor = "#c4c4d6";
	img_cell.style.padding = "0px";
	img_cell.innerHTML = "<img src='images/"+img_src+"' style='width:120px; height:120px; cursor:pointer;' draggable='false'>";
	img_cell.setAttribute("ondblclick", "open"+upperDocType+"('"+eltToAdd.ID+"')");
	img_cell.setAttribute("onclick", "open"+upperDocType+"Details('"+eltToAdd.ID+"')");
	img_cell.setAttribute("draggable", false);

	var details_row = table.insertRow(1);
	var input_cell = details_row.insertCell(0);

	var input_name = document.createElement("input");
	input_name.setAttribute('class', 'text-center');
	input_name.setAttribute('type', 'text');
	input_name.setAttribute('value', eltToAdd.name);
	input_name.setAttribute('onKeyUp', "save"+upperDocType+"Name('"+eltToAdd.ID+"')");
	input_name.id = docType+"Name_"+eltToAdd.ID;
	input_cell.appendChild(input_name);

	div.appendChild(table);

	var canvas = document.createElement("canvas");
	canvas.className = 'canvases';
	canvas.style.border = '2px solid red';
	canvas.style.zIndex = 100;

	// div.appendChild(canvas);

	var options = document.createElement("div");
	options.innerHTML = "<span class='glyphicon glyphicon-option-vertical options' style='right:0; padding-top:5px; cursor:pointer;'></span>";
	options.style.marginRight = "-10px";
	options.setAttribute("class", "options");
	options.id = "options_"+eltToAdd.ID;

	$(options).on('click', '*', function(e){
		if (!shareDialogOpen){
			var x =e.pageX -$(document).scrollLeft();
			var y =e.pageY -$(document).scrollTop();

			var div = document.createElement("div");
			div.id = "sharing-options";
			div.style.width = "300px";
			div.fontFamily = "PT Sans";
			div.style.border = "thin solid #bababa";
			div.style.backgroundColor = "#fffcf7";
			div.style.top = e.clientY+"px";
			div.style.left = e.clientX+10+"px";
			div.style.position = "fixed";
			div.style.zIndex = 5;

			var nav=document.createElement("div");
			nav.className = "container text-left";
			nav.style.width = "300px";

			function createRow(){
				var row = document.createElement("div");
				row.className = "row nav-option";
				return row;
			}

			if (eltToAdd.isRecycled()){
				var restoreRow = createRow();
				restoreRow.innerHTML = '<span class="glyphicon glyphicon-ok" style="padding-right: 15px;"></span> Restore To My Notebook ';
				restoreRow.setAttribute('onclick', "restoreDocument('"+docType+"','"+eltToAdd.ID+"')");

				var deleteRow = createRow();
				deleteRow.innerHTML = '<span class="glyphicon glyphicon-remove" style="padding-right: 15px;"></span> Delete Permanently';
				deleteRow.setAttribute('onclick', "sendToTrash('"+docType+"','"+eltToAdd.ID+"')");

				nav.appendChild(restoreRow);
				nav.appendChild(deleteRow);
			}
			else{
				var deleteRow = createRow();
				deleteRow.innerHTML = '<span class="glyphicon glyphicon-trash" style="padding-right: 15px;"></span> Send To Recycle Bin';
				deleteRow.setAttribute('onclick', "sendToTrash('"+docType+"','"+eltToAdd.ID+"')");

				var shareRow = createRow();
				shareRow.innerHTML = '<span class="glyphicon glyphicon-user" style="padding-right: 15px;"></span> Share with... '
				shareRow.setAttribute('onclick', 'openShareDialog()');

				var moveRow = createRow();
				moveRow.innerHTML = '<span class="glyphicon glyphicon-move" style="padding-right: 15px;"></span> Move to ... '
				moveRow.setAttribute('onclick', 'openMoveDialog()');


				nav.appendChild(deleteRow);
				nav.appendChild(shareRow);
				nav.appendChild(moveRow);
			}

			div.appendChild(nav);

			document.getElementById(docType+"Container").appendChild(div);
		   shareDialogOpen = true;
		}
		else{
			$("#sharing-options").remove()
			shareDialogOpen = false;
		}
	});


	div.appendChild(options);

	document.getElementById(docType+"Container").appendChild(div);
	console.log(document.getElementById(docType+"Name_"+eltToAdd.ID));
};

function openShareDialog(){
	var modal = document.getElementById('shareDialog');
	 modal.style.display = "block";
};

function closeShareDialog(){
	var modal = document.getElementById('shareDialog');
	modal.style.display = "none";
};

function openMoveDialog(){
	var modal = document.getElementById('moveDialog');
	 modal.style.display = "block";
};

function closeMoveDialog(){
	var modal = document.getElementById('moveDialog');
	modal.style.display = "none";
};

function shareWith(){
	document.getElementById("shareDialog").style.display = "none";
};


function sendToTrash(docType, eltID){
	console.log('Removing '+eltID);
	var recycleElt = false;
	if (docType == 'folder'){
		recycleElt = folderChain[folderChain.length-1].getFolder(eltID);
		recycleElt.parentFolder.deleteFolder(recycleElt);
		recycleElt.recycle();
		trashFolder.addFolder(recycleElt);
	};
	if (docType == 'file'){
		recycleElt = folderChain[folderChain.length-1].getFile(eltID);
		trashFolder.addFile(recycleElt);
		recycleElt.parentFolder.deleteFile(recycleElt);
		recycleElt.recycle();
		trashFolder.addFile(recycleElt);
	};
	if (docType == 'template'){
		recycleElt = folderChain[folderChain.length-1].getTemplate(eltID);
		recycleElt.parentFolder.deleteTemplate(recycleElt);
		recycleElt.recycle();
		trashFolder.addTemplate(recycleElt);

	};
	if (!recycleElt){
		console.log('No docType detected when deleting element');
	}
	else{
		console.log(recycleElt);
	}

	// recycleElt.recycle();
	document.getElementById(docType+"_"+eltID).remove();
}

function restoreDocument(docType, eltID){
	console.log('Removing '+eltID);
	var restoreElt = false;
	if (docType == 'folder'){
		restoreElt = folderChain[folderChain.length-1].getFolder(eltID);
		restoreElt.parentFolder.deleteFolder(restoreElt);
		restoreElt.restore();
		folderChain[0].addFolder(restoreElt);

	};
	if (docType == 'file'){
		restoreElt = folderChain[folderChain.length-1].getFile(eltID);
		restoreElt.parentFolder.deleteFile(restoreElt);
		restoreElt.restore();
		folderChain[0].addFile(restoreElt);
	};
	if (docType == 'template'){
		restoreElt = folderChain[folderChain.length-1].getTemplate(eltID);
		restoreElt.parentFolder.deleteTemplate(restoreElt);
		restoreElt.restore();
		folderChain[0].addFolder(restoreElt);
	};
	if (!restoreElt){
		console.log('No docType detected when deleting element');
	}
	else{
		console.log(restoreElt);
	}


	document.getElementById(docType+"_"+eltID).remove();
}


function openTrash(){
	trashMode = true;
	moveUp(0);
	$('#newDocumentNav').hide();
	$('#folderContainer').empty();
	$('#fileContainer').empty();
	$('#templateContainer').empty();
	folderChain.push(trashFolder);
	openTopStackTrashFolder();
}

// Startup

console.log(Storage.homeFolder);
folderChain.push(Storage.homeFolder);
openTopStackFolder();
