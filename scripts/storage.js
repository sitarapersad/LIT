var Storage = (function () {
	var homeFolder = window.localStorage.getItem("homeFolder");

	if (homeFolder && homeFolder != "undefined") {
		homeFolder = new Folder(JSON.parse(homeFolder));
	} else {
		// Initialization of folder hierarchy
		homeFolder = new Folder({name: "Home", owner: "Owner"});
		var cancerFolder = new Folder({name: "Cancer", owner: "Owner"});
		var cancerFolder1 = new Folder({name: "Breast Cancer", owner: "Owner"});
		var cancerFolder2 = new Folder({name: "Lung Cancer", owner: "Owner"});

		cancerFolder.addFolder(cancerFolder1);
		cancerFolder.addFolder(cancerFolder2);

		var HIVFolder = new Folder({name: "HIV", owner: "Owner"});
		var thyroidFolder = new Folder({name: "Thyroid", owner: "Owner"});
		var titrationFile = new Note({name: "Titration", owner: "Owner"});
		var PCRFile = new Note({name: "PCR ", owner: "Owner"});
		var PCRTemplate = new Template({name: "PCR", owner: "Owner"});

		homeFolder.addFolder(cancerFolder);
		homeFolder.addFolder(HIVFolder);
		homeFolder.addFolder(thyroidFolder);

		homeFolder.addFile(titrationFile);
		homeFolder.addFile(PCRFile);

		homeFolder.addTemplate(PCRTemplate);

		saveHomeFolder();
	}

	// Set event listener for home folder here
	homeFolder.addEventListener("changed", saveHomeFolder);

	function saveHomeFolder() {
		window.localStorage.setItem("homeFolder", JSON.stringify(homeFolder.serialize()));
	}

	// API
	// -------------------------------------------------------------------------

	var that = {};

	that.homeFolder = homeFolder;

	that.purge = function () {
		window.localStorage.removeItem("homeFolder");
	};

	Object.freeze(that);
	return that;
})();
