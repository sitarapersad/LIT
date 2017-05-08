"use strict";

function randomString(length, characters) {
	let possibleCharacters = characters || "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~`!@#$%^&*()_+-={}[]:\";'<>?,./|\\";
	let generatedCharacters = [];

	for(var i = 0; i < length; i++) {
		generatedCharacters.push(possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length)));
	}

	return generatedCharacters.join("");
}

function randomAlphaNumericString(length) {
	return randomString(length, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");
}

var StringGenerator = {};
StringGenerator.randomString = randomString;
StringGenerator.randomAlphaNumericString = randomAlphaNumericString;
