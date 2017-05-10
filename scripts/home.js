var folderCount = 0;
var fileCount = 0;
var templateCount = 0;
var shareDialogOpen =  false;
var folderChain = [];
var activeDocument = false;
var trashFolder = new Folder("Recycle Bin", "Owner", folderCount);
fileCount += 1;

var trashMode = false;
var modelClicked = null;
var DELETE_docType = null;
var DELETE_eltID = null;
var MOVE_doc = null;
var MOVE_to = null;

document.body.addEventListener("click", function (e) {
	if (e.target.className.includes("options")) {
		console.log("DISPLAY OPTIONS");
	}
	else{
		$("#sharing-options").remove();
		shareDialogOpen = false;
	}
});

window.onclick = function (event) {
	var modal = document.getElementById("shareDialog");
	if (event.target == modal) {
		modal.style.display = "none";
	}
	if (activeDocument){
		if (event.target == document.getElementById(activeDocument)){
			document.getElementById(activeDocument).style.boxShadow = "2px 2px 2px #66767c";
		}
	}
};

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
	var changeFolder = folderChain[folderChain.length - 1].getFolder(folderID);
	var newName = document.getElementById("folderName_" + folderID).value;
	if (newName.length == 0) {
		newName = "Untitled";
	}
	changeFolder.updateName(newName);
}

function saveFileName(fileID) {
	var changeFile = folderChain[folderChain.length - 1].getFile(fileID);
	var newName = document.getElementById("fileName_" + fileID).value;
	if (newName.length == 0){
		newName = "Untitled";
	}
	changeFile.updateName(newName);
}

function saveTemplateName(templateID) {
	var changeTemplate = folderChain[folderChain.length - 1].getTemplate(templateID);
	var newName = document.getElementById("templateName_" + templateID).value;
	if (newName.length == 0) {
		newName = "Untitled";
	}
	changeTemplate.updateName(newName);
}

function openFile(newFileID) {
	// Open the URL for the file editor, need to find a way to pass data about the ID
	document.location.href = `note.html#${newFileID}`;
};

function openTemplate(newTemplateID){
	// Open the URL for the file editor, need to find a way to pass data about the ID
	document.location.href = `note.html#${newTemplateID}`;
};


function createFolder(){
	newFolder = new Folder('Untitled', 'Owner', folderCount);
	folderChain[folderChain.length-1].addFolder(newFolder);
	folderCount += 1;
	drawFolder(newFolder);
	document.getElementById("folderName_"+newFolder.ID).focus();
	document.getElementById("folderName_"+newFolder.ID).select();
};

function createFile(){
	newFile = new Note('Untitled', 'Owner', fileCount);
	folderChain[folderChain.length-1].addFile(newFile);
	fileCount += 1;
	drawFile(newFile);
	document.getElementById("fileName_"+newFile.ID).focus();
	document.getElementById("fileName_"+newFile.ID).select();
};

function createTemplate(){
	newTemplate = new Template('Untitled', 'Owner', templateCount);
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
	if (folderChain.length > 1){
		for (i = 0; i < folderChain.length-n; i++){
			folderChain.pop();
		}
	}

	console.log(folderChain);
	if (folderChain.length==1){
		console.log('Exiting trashMode');
		trashMode = false;
		$('#newDocumentNav').show();
	}

	openTopStackFolder();
};


/*
 * Given the ID of a folder on the page, highlight the folder and provide additional options
 */
function openFolderDetails(newFolderID){
	if (activeDocument){
		document.getElementById(activeDocument).style.boxShadow = "2px 2px 2px #66767c";
		$("#detailsNav").hide()
	}
	if (activeDocument != "folderTable"+newFolderID){
		activeDocument = "folderTable"+newFolderID;
		document.getElementById(activeDocument).style.boxShadow = "2px 2px 2px blue";
		var showFolder = folderChain[folderChain.length-1].getFolder(newFolderID);
		console.log(showFolder);
		$("#detailsNav").show();
		$("#docName").html("Notebook Name: "+showFolder.name);
		$("#docOwner").html("Owned By: "+showFolder.owner);
	}
	else{
		activeDocument = false;
		$("#detailsNav").hide()

	}

};

function openFileDetails(newFileID){
	if (activeDocument){
		document.getElementById(activeDocument).style.boxShadow = "2px 2px 2px #66767c";
		$("#detailsNav").hide()
	}
	if (activeDocument != "fileTable"+newFileID){
		activeDocument = "fileTable"+newFileID;
		document.getElementById(activeDocument).style.boxShadow = "2px 2px 2px blue";
		var showFolder = folderChain[folderChain.length-1].getFile(newFileID);
		console.log(showFolder);
		$("#detailsNav").show();
		$("#docName").html("Experiment Name: "+showFolder.name);
		$("#docOwner").html("Owned By: "+showFolder.owner);
	}
	else{
		activeDocument = false;
		$("#detailsNav").hide()

	}
};

function openTemplateDetails(newTemplateID){
	if (activeDocument){
		document.getElementById(activeDocument).style.boxShadow = "2px 2px 2px #66767c";
		$("#detailsNav").hide()
	}
	if (activeDocument != "templateTable"+newTemplateID){
		activeDocument = "templateTable"+newTemplateID;
		document.getElementById(activeDocument).style.boxShadow = "2px 2px 2px blue";
		var showFolder = folderChain[folderChain.length-1].getTemplate(newTemplateID);
		console.log(showFolder);
		$("#detailsNav").show();
		$("#docName").html("Template Name: "+showFolder.name);
		$("#docOwner").html("Owned By: "+showFolder.owner);
	}
	else{
		activeDocument = false;
		$("#detailsNav").hide()

	}
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
	if (true){
		// If the folder contains subfolders, draw them
		for (var key in subFolder.folders) {
			newFolder = subFolder.folders[key];
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
	if (true){
		// If the folder contains subfolders, draw them
		for (var key in subFolder.folders) {
			newFolder = subFolder.folders[key];
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

	if (ev.target.id != data) {
		var img = document.getElementById(data);
		img.parentNode.removeChild(img);
	}
}

//  Drawing folders, files and templates on screen
function drawFolder(folderToAdd){
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
	div.setAttribute("class", "col-md-4 col-sm-4 col-lg-4 col-xs-4 col-xl-4 control-label center-block text-center document");

	div.id = docType+"_"+eltToAdd.ID;

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
				restoreRow.innerHTML = '<span class="glyphicon glyphicon-ok green" style="padding-right: 15px;"></span> Restore To My Notebook ';
				restoreRow.setAttribute('onclick', "restoreDocument('"+docType+"','"+eltToAdd.ID+"')");

				var deleteRow = createRow();
				deleteRow.innerHTML = '<span class="glyphicon glyphicon-remove red" style="padding-right: 15px;"></span> Delete Permanently';
				deleteRow.setAttribute('onclick', "openDeleteDialog('"+docType+"','"+eltToAdd.ID+"')");

				nav.appendChild(restoreRow);
				nav.appendChild(deleteRow);
			}
			else{
				var deleteRow = createRow();
				deleteRow.innerHTML = '<span class="glyphicon glyphicon-trash red" style="padding-right: 15px;"></span> Send To Recycle Bin';
				deleteRow.setAttribute('onclick', "sendToTrash('"+docType+"','"+eltToAdd.ID+"')");

				var shareRow = createRow();
				shareRow.innerHTML = '<span class="glyphicon glyphicon-share-alt" style="padding-right: 15px; color: #4587d8;"></span> Share with... '
				shareRow.setAttribute('onclick', 'openShareDialog()');

				var moveRow = createRow();
				moveRow.innerHTML = '<span class="glyphicon glyphicon-move" style="padding-right: 15px;"></span> Move to ... '
				moveRow.setAttribute('onclick', "openMoveDialog('"+docType+"','"+eltToAdd.ID+"')");


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
};


function openMoveDialog(docType, eltID){
	var currentFolder = folderChain[folderChain.length-1]
	if (docType == 'folder'){
		MOVE_doc = currentFolder.getFolder(eltID);
	}
	if (docType == 'file'){
		MOVE_doc = currentFolder.getFile(eltID);
	}
	if (docType == 'template'){
		MOVE_doc = currentFolder.getTemplate(eltID);
	}
	console.log('Opening move dialog for '+MOVE_doc.name);
	clicked = null;
	$("#moveDialog").modal('show');
	populateMoveDialog(currentFolder);
};

function populateMoveDialog(currentFolder){
	console.log('Open '+currentFolder.name);
	var folderID = [],
    	folderName = [];
    var disable = -1;

	for (var folder in currentFolder.folders) {
		folderID.push(folder);
		folderName.push(currentFolder.getFolder(folder).name);
	}
	console.log(folderName);
    if (MOVE_doc.fileType == "folder"){
    	disable = folderID.indexOf(MOVE_doc.ID);
    }


	$('#moveDialog .currentFolder').html("<span class='glyphicon glyphicon-circle-arrow-up' style='padding:10px;'></span>"+currentFolder.name);
	$('#moveDialog .currentFolder').dblclick(function (event) {
		if (currentFolder.parentFolder){
			var newFolder = currentFolder.parentFolder;
			populateMoveDialog(newFolder);
		}

	});

	$('#moveDialog .currentFolder').click(function (event) {
		MOVE_to = currentFolder
		$("#eventlog").html('Destination Folder: ' + currentFolder.name);
	});
    $("#jqxlistbox").jqxListBox({ source: folderName, width: '200px', height: '150px' });

    // Don't allow movement to current folder
    if (disable != -1){
    	$("#jqxlistbox").jqxListBox('disableAt', disable);
    }


    // bind to 'select' event.
    $('#jqxlistbox').bind('select', function (event) {
        var args = event.args;
        var item = $('#jqxlistbox').jqxListBox('getItem', args.index);
        var ID = folderID[args.index];
        MOVE_to = currentFolder.getFolder(ID);
        console.log(MOVE_to.name);
        $("#eventlog").html('Destination Folder: ' + item.label);
    });

	$("#jqxlistbox .jqx-listitem-state-normal").dblclick(function (event) {
		var item = $(event.target).text();
		var index = folderName.indexOf(item);
		var ID = folderID[index];
		var newFolder = currentFolder.getFolder(ID);
		populateMoveDialog(newFolder);
	});
}

$("#moveDialog .modal-footer > button").click(function() {
  clicked = $(this).text();
  $("#moveDialog").modal('hide');
});

$("#moveDialog").on('hide.bs.modal', function() {
	if (clicked === null){
	    console.log("The user didn't click anything");
	}
	else {
	    console.log("The user has clicked: " + clicked);
		if (clicked=="Move"){
			if (MOVE_doc.parentFolder.ID != MOVE_to.ID){
				document.getElementById(MOVE_doc.fileType+"_"+MOVE_doc.ID).remove();
			}
			if (MOVE_doc.fileType == "folder"){
				MOVE_doc.parentFolder.deleteFolder(MOVE_doc);
				MOVE_to.addFolder(MOVE_doc);
			}
			if (MOVE_doc.fileType == "file"){
				MOVE_doc.parentFolder.deleteFile(MOVE_doc);
				MOVE_to.addFile(MOVE_doc);
			}
			if (MOVE_doc.fileType == "template"){
				MOVE_doc.parentFolder.deleteTemplate(MOVE_doc);
				MOVE_to.addTemplate(MOVE_doc);
			}
		}
	}
	MOVE_doc = null;
	MOVE_to = null;
});


function openShareDialog(docType, eltID){
	SHARE_docType = docType;
	SHARE_eltID = eltID;
	console.log('Opening share dialog');
	clicked = null;
	$("#shareDialog").modal('show');
};

$("#shareDialog .modal-footer > button").click(function() {
  clicked = $(this).text();
  $("#shareDialog").modal('hide');
});

$("#shareDialog").on('hide.bs.modal', function() {
	if (clicked === null){
	    console.log("The user didn't click anything");
	}
	else {
	    console.log("The user has clicked: " + clicked);
		if (clicked=="Yes, delete this file!"){
			deletePermanently(DELETE_docType, DELETE_eltID);
		}
	}
	SHARE_docType = null;
	SHARE_eltID = null;
});


function shareWith(){
	document.getElementById("shareDialog").style.display = "none";
};

function openDeleteDialog(docType, eltID){
	DELETE_docType = docType;
	DELETE_eltID = eltID;
	console.log('Opening delete dialog');
	clicked = null;
	$("#deleteDialog").modal('show');
};

$("#deleteDialog .modal-footer > button").click(function() {
  clicked = $(this).text();
  $("#deleteDialog").modal('hide');
});

$("#deleteDialog").on('hide.bs.modal', function() {
	if (clicked === null){
	    console.log("The user didn't click anything");
	}
	else {
	    console.log("The user has clicked: " + clicked);
		if (clicked=="Yes, delete this file!"){
			deletePermanently(DELETE_docType, DELETE_eltID);
		}
	}
	DELETE_docType = null;
	DELETE_eltID = null;
});


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

function deletePermanently(docType, eltID){
	var recycleElt = false;
	if (docType == 'folder'){
		recycleElt = folderChain[folderChain.length-1].getFolder(eltID);
		recycleElt.parentFolder.deleteFolder(recycleElt);
		recycleElt.recycle();
		// trashFolder.addFolder(recycleElt);
	};
	if (docType == 'file'){
		recycleElt = folderChain[folderChain.length-1].getFile(eltID);
		trashFolder.addFile(recycleElt);
		recycleElt.parentFolder.deleteFile(recycleElt);
		recycleElt.recycle();
		// trashFolder.addFile(recycleElt);
	};
	if (docType == 'template'){
		recycleElt = folderChain[folderChain.length-1].getTemplate(eltID);
		recycleElt.parentFolder.deleteTemplate(recycleElt);
		recycleElt.recycle();
		// trashFolder.addTemplate(recycleElt);

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
	moveUp(0);
	trashMode = true;
	console.log('Entering trashMode');
	$('#newDocumentNav').hide();
	$('#folderContainer').empty();
	$('#fileContainer').empty();
	$('#templateContainer').empty();
	folderChain.push(trashFolder);
	openTopStackTrashFolder();
}

// Startup

folderChain.push(Storage.homeFolder);
openTopStackFolder();
