//Create form data
const deleteAccountFormData = {};

//Grab page elements
const deleteAccountConfirmationContainer = document.getElementById(
  "deleteAccountConfirmationContainer"
);
const deleteAccountButtonElement = document.getElementById(
  "deleteAccountButton"
);
const yesDeleteConfirmationElement =
  document.getElementById("yesDeleteMyAccount");
const noDontDeleteConfirmationElement = document.getElementById(
  "noDontDeleteAccount"
);
const deleteAccountPasswordInput = document.getElementById(
  "deleteAccountPassword"
);
const deleteAccountServerResponseElement = document.getElementById(
  "deleteAccountServerResponse"
);

//Display confirmation box when delete button is clicked
deleteAccountButtonElement.addEventListener("click", (e) => {
  e.preventDefault();
  deleteAccountConfirmationContainer.style.display = "flex";
});

//Make confirmation box disappear when cancel is clicked
noDontDeleteConfirmationElement.addEventListener("click", (e) => {
  e.preventDefault();
  deleteAccountConfirmationContainer.style.display = "none";
});

//Delete account on confirmation click
yesDeleteConfirmationElement.addEventListener("click", (e) => {
  if (deleteAccountPasswordInput.value === "") {
    deleteAccountServerResponseElement.innerText =
      "Please enter your password!";
    deleteAccountPasswordInput.addEventListener("focus", (e) => {
      deleteAccountServerResponseElement.innerText = "";
    });
    return;
  }

  //Add password to form data
  deleteAccountFormData.password = deleteAccountPasswordInput.value;

  //Send values to server and wait for response
  fetch("/users/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify(deleteAccountFormData),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "fail") {
        deleteAccountServerResponseElement.innerText =
          "Delete Account Failed. Try Again.";
      } else {
        window.location.assign("/deleteaccountsuccess");
      }
    })
    .catch((error) => {
      deleteAccountServerResponseElement.innerText =
        "Delete Account Failed. Try Again";
      console.log(error);
    });
});

//Clear server response element on click
