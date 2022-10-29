/*filling in user's email on the page*/
const userEmailTag = "test@test.org"
function displayUserEmail() {
	document.getElementById("userTopTag").innerHTML = userEmailTag;
	document.getElementById("userEmailLabel").innerHTML = userEmailTag;
}
/*this function displays account settings upon the click of the button*/
function revealAccountSettings() {
	document.getElementById("accountSettingsDiv").classList.remove("accountSettingsHidden");
	document.getElementById("accountSettingsDiv").classList.add("accountSettingsShow");
    document.getElementById("mirrorSettingsDiv").classList.remove("mirrorSettingsShow");
	document.getElementById("mirrorSettingsDiv").classList.add("mirrorSettingsHidden");
}
/*this function displays mirror settings upon the click of the button*/
function revealMirrorSettings() {
	document.getElementById("mirrorSettingsDiv").classList.remove("mirrorSettingsHidden");
	document.getElementById("mirrorSettingsDiv").classList.add("mirrorSettingsShow");
    document.getElementById("accountSettingsDiv").classList.remove("accountSettingsShow");
	document.getElementById("accountSettingsDiv").classList.add("accountSettingsHidden");
}