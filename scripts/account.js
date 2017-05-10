var profileImage = document.getElementById("profileImage");
var signOutButton = document.getElementById("signOutButton");

function hideSignoutButton() {
	signOutButton.style.display = "none";
}

function showSignoutButton() {
	signOutButton.style.display = "block";
}

function documentClickHandler() {
	hideSignoutButton();
	document.removeEventListener("click", documentClickHandler);
}

profileImage.addEventListener("click", function (e) {
	e.stopPropagation();
	showSignoutButton();
	document.addEventListener("click", documentClickHandler);
});

signOutButton.addEventListener("click", function () {
	Storage.purge();
	location.reload();
});
