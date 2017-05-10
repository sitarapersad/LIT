/* exported Storage */

var Storage = (function () {
	var homeFolder = window.localStorage.getItem("homeFolder");

	var files = window.localStorage.getItem("files");
	if (files && files != "undefined") {
		files = JSON.parse(files);

		for (var fileKey in files)
		{
			var file = files[fileKey];

			for (var i = 0; i < file.steps.length; i++)
			{
				var vars = file.steps[i].variables;
				for (var j = 0; j < vars.length; j++) {
					vars[j] = new Variable(vars[j].value, vars[j].name);
				}
				file.steps[i] = new Step(file.steps[i].content, file.steps[i].variables, file.steps[i].scales, file.steps[i].number);
			}

			for (i = 0; i < file.vars.length; i++)
			{
				file.vars[i] = new Variable(file.vars[i].value, file.vars[i].name);
			}
		}
	} else {
		files = {};
	}

	if (homeFolder && homeFolder != "undefined") {
		homeFolder = new Folder(JSON.parse(homeFolder));
	} else {
		// Initialization of folder hierarchy
		homeFolder = new Folder({name: "Home", owner: "David"});
		var cancerFolder = new Folder({name: "Cancer", owner: "David"});
		var cancerFolder1 = new Folder({name: "Breast Cancer", owner: "David"});
		var cancerFolder2 = new Folder({name: "Lung Cancer", owner: "David"});

		cancerFolder.addFolder(cancerFolder1);
		cancerFolder.addFolder(cancerFolder2);

		var HIVFolder = new Folder({name: "HIV", owner: "David"});
		var thyroidFolder = new Folder({name: "Thyroid", owner: "David"});
		var titrationFile = new Note({name: "Titration", owner: "David"});
		var PCRFile = new Note({name: "PCR ", owner: "David"});
		var PCRTemplate = new Template({name: "PCR", owner: "David"});

		homeFolder.addFolder(cancerFolder);
		homeFolder.addFolder(HIVFolder);
		homeFolder.addFolder(thyroidFolder);

		homeFolder.addFile(titrationFile);
		homeFolder.addFile(PCRFile);

		homeFolder.addTemplate(PCRTemplate);

		saveContent(titrationFile.ID, generateCannedContent());
		saveContent(PCRFile.ID, generateCannedContent());
		saveContent(PCRTemplate.ID, generateCannedContent());
		saveHomeFolder();
	}

	var sharedFolder = window.localStorage.getItem("sharedFolder");

	if (sharedFolder && sharedFolder != "undefined") {
		sharedFolder = new Folder(JSON.parse(sharedFolder));
	} else {
		// Initialization of folder hierarchy
		sharedFolder = new Folder({name: "Home", owner: "Rob"});
		var geneFolder = new Folder({name: "Gene Splice", owner: "Stephanie"});
		var crisprFolder = new Folder({name: "CRISPR", owner: "Rob"});
		var titrationFile2 = new Note({name: "Titration", owner: "Eric"});
		var ribosomeTemplate = new Template({name: "Ribosome Profile", owner: "George"});

		sharedFolder.addFolder(geneFolder);
		sharedFolder.addFolder(crisprFolder);
		sharedFolder.addFile(titrationFile2);
		sharedFolder.addTemplate(ribosomeTemplate);

		saveContent(titrationFile2.ID, generateCannedContent());
		saveContent(ribosomeTemplate.ID, generateCannedContent());
		saveSharedFolder();
	}

	var trashFolder = window.localStorage.getItem("trashFolder");

	if (trashFolder && trashFolder != "undefined") {
		trashFolder = new Folder(JSON.parse(trashFolder));
	} else {
		trashFolder = new Folder({name: "Recycle Bin", owner: "Owner"});
	}

	// Set event listener for home folder here
	homeFolder.addEventListener("changed", saveHomeFolder);
	sharedFolder.addEventListener("changed", saveSharedFolder);
	trashFolder.addEventListener("changed", saveTrashFolder);

	function saveHomeFolder() {
		window.localStorage.setItem("homeFolder", JSON.stringify(homeFolder.serialize()));
	}

	function saveSharedFolder() {
		window.localStorage.setItem("sharedFolder", JSON.stringify(sharedFolder.serialize()));
	}

	function saveTrashFolder() {
		window.localStorage.setItem("trashFolder", JSON.stringify(trashFolder.serialize()));
	}

	function saveContent(id, content) {
		files[id] = content;
		window.localStorage.setItem("files", JSON.stringify(files));
	}

	function getFilenameFromFolder(id, folder) {
		var filename = undefined;
		filename = getFilenameInternal(id, folder.folders);
		for (var i in folder.files)
		{
			if (folder.files[i].ID == id) {
				filename = folder.files[i].name;
			}
		}

		for (i in folder.templates)
		{
			if (folder.templates[i].ID == id) {
				filename = folder.templates[i].name;
			}
		}
		return filename;
	}

	function getFilenameInternal(id, folders) {
		var filename = undefined;
		for (var i in folders)
		{
			filename = getFilenameFromFolder(id, folders[i]);
			if (filename) break;
		}
		return filename;
	}

	function getFilename(id) {
		return getFilenameInternal(id, {"a": homeFolder, "b": sharedFolder});
	}

	// API
	// -------------------------------------------------------------------------

	var that = {};

	that.homeFolder = homeFolder;
	that.sharedFolder = sharedFolder;
	that.trashFolder = trashFolder;

	that.purge = function () {
		window.localStorage.removeItem("homeFolder");
		window.localStorage.removeItem("sharedFolder");
		window.localStorage.removeItem("trashFolder");
		window.localStorage.removeItem("files");
	};

	that.getContent = function (id) {
		if (!files[id]) {
			saveContent(id, {steps: [], vars: []});
		}
		content = files[id];
		content.name = getFilename(id);
		return content;
	};

	Object.freeze(that);
	return that;
})();

function generateCannedContent() {
	var stepsList = [];
	var variablesList = [];

	var agAmount = new Variable(1.0, "Grams of agarose");
	var bariumAmount = new Variable(15.0, "Milligrams of barium");
	var stepOne = new Step(["Measure", "g of agarose. Mix in", "mg of barium."], [agAmount, bariumAmount], [1.0, 3.0], 1);
	var stepTwo = new Step(["Mix agarose power with", "mL 1xTAE in a microwaveable flask. Mix in another", "mg of barium."], [agAmount, bariumAmount], [100.0, 1.0], 2);
	var stepThree = new Step(["Microwave for 1-3 minutes."], [], [], 3);
	var stepFour = new Step(["Let solution cool down."], [], [], 4);
	var stepFive = new Step(["Add EtBr at", "microL of stock solution."], [agAmount], [2.0], 5);
	stepsList.push(stepOne);
	stepsList.push(stepTwo);
	stepsList.push(stepThree);
	stepsList.push(stepFour);
	stepsList.push(stepFive);
	variablesList.push(agAmount);
	variablesList.push(bariumAmount);

	return {steps: stepsList, vars: variablesList};
}
