// Editor
// ======
//
// Contains logic for WYSIWYG editing of a note


// Initialize elements
// --------------------

var Elements = {};

Elements.mainContainer = document.getElementById("mainContainer");
Elements.imageFileInput = document.getElementById("imageFileInput");
Elements.toolbarButtons = {};

var tempToolbarButtons = document.querySelectorAll(".toolbarButton");
for (var i = tempToolbarButtons.length - 1; i >= 0; i--)
{
	var command = tempToolbarButtons[i].getAttribute("data-command");
	Elements.toolbarButtons[command] = tempToolbarButtons[i];
}

// UI logic
// --------

var UI = {};

UI.showToolbarState = function (command, value) {
	if (value) Elements.toolbarButtons[command].classList.add("effective");
	else Elements.toolbarButtons[command].classList.remove("effective");
}

UI.deactivateToolbarButtons = function () {
	//TODO: Implement
	console.log("will deactivate toolar buttons");
}

// Connect event handlers
// -----------------------

document.addEventListener("selectionchange", getToolbarStates);
Elements.imageFileInput.addEventListener("change", uploadImage);
Elements.mainContainer.addEventListener("blur", UI.deactivateToolbarButtons);

for (command in Elements.toolbarButtons)
{
	// prevent the button from stealing focus, but still listen to "click" events:
	Elements.toolbarButtons[command].addEventListener("mousedown", function (e) {e.preventDefault();});
	Elements.toolbarButtons[command].addEventListener("mouseup", toolbarButtonClicked);
}

// imageElement.addEventListener("click", function () {
// 	Elements.imageFileInput.click();
// });

// Main logic
// ----------
App = {};

var booleanToolbarCommands = ["justifyLeft", "justifyCenter", "justifyRight", "bold", "italic", "underline"];
function getToolbarStates (e) {
	if (document.activeElement != Elements.mainContainer) {
		return;
	}
	for (var i = booleanToolbarCommands.length - 1; i >=0; i--)
	{
		UI.showToolbarState(booleanToolbarCommands[i], document.queryCommandState(booleanToolbarCommands[i]));
	}
}

function toolbarButtonClicked(e) {
	var command = this.getAttribute("data-command");
	var value = this.getAttribute("data-value");
	document.execCommand(command, false, value);

	getToolbarStates();
}

function uploadImage ()
{

	formData.append("image", imageFileInput.files[0]);
}
