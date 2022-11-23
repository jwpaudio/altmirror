//Create form data object
const changePassFormData = {};

//Import page elements
const oldPasswordElement = document.getElementById("accountCurrentPassword");
const newPasswordElement = document.getElementById("accountChangePassword");
const changePasswordButton = document.getElementById("passwordChangeButton");
const changePassServerResponseElement = document.getElementById(
  "changePassServerResponse"
);

//Add event listener for change password button
changePasswordButton.addEventListener("click", (e) => {
  e.preventDefault();

  changePassFormData.oldPassword = oldPasswordElement.value;
  changePassFormData.newPassword = newPasswordElement.value;

  //Send values to server and wait for response
  fetch("/users/changepass", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify(changePassFormData),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "fail") {
        changePassServerResponseElement.innerText =
          "Password Change Failed. Try Again.";
      } else {
        window.location.assign("/changepasssuccess");
      }
    })
    .catch((error) => {
      changePassServerResponseElement.innerText =
        "Password Save Failed. Try Again";
      console.log(error);
    });
});

//Add event listener to clear server response on page click
window.addEventListener("click", (e) => {
  changePassServerResponseElement.innerText = "";
});
