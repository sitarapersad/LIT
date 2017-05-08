
var Storage = (function () {
	var homeFolder = window.localStorage.getItem("homeFolder");

	if (!homeFolder) {
		// Initialization of folder hierarchy
		homeFolder = new Folder('Home', 'Owner');
		var cancerFolder = new Folder('Cancer', 'Owner');
		var cancerFolder1 = new Folder('Breast Cancer', 'Owner');
		var cancerFolder2 = new Folder('Lung Cancer', 'Owner');

		cancerFolder.addFolder(cancerFolder1);
		cancerFolder.addFolder(cancerFolder2);

		var HIVFolder = new Folder('HIV', 'Owner');
		var thyroidFolder = new Folder('Thyroid', 'Owner');
		var titrationFile = new Note('Titration', 'Owner');
		var PCRFile = new Note('PCR ', 'Owner');
		var PCRTemplate = new Template('PCR', 'Owner');

		homeFolder.addFolder(cancerFolder);
		homeFolder.addFolder(HIVFolder);
		homeFolder.addFolder(thyroidFolder);

		homeFolder.addFile(titrationFile);
		homeFolder.addFile(PCRFile);

		homeFolder.addTemplate(PCRTemplate);

		saveHomeFolder();
	}

	// Set event listener for home folder here

	function saveHomeFolder() {
		console.log("Will save home folder");
	}

	// API
	// -------------------------------------------------------------------------

	var that = {};

	that.homeFolder = homeFolder;

	Object.freeze(that);
	return that;
})();
