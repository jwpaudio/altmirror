//File to control the mirror settings portion of the dashboard
const formData = { modules: {} };

//Get page elements
const saveButton = document.getElementById("saveButton");
const serverResponseElement = document.getElementById("saveServerMessage");
const position1Select = document.getElementById("position1Select");
const position2Select = document.getElementById("position2Select");
const position3Select = document.getElementById("position3Select");
const position4Select = document.getElementById("position4Select");
const position5Select = document.getElementById("position5Select");
const position6Select = document.getElementById("position6Select");
const position7Select = document.getElementById("position7Select");
const position8Select = document.getElementById("position8Select");

//Add event listener for save button
saveButton.addEventListener("click", (e) => {
  e.preventDefault();

  //Load selected values into form
  formData.modules.position1 = position1Select.value;
  formData.modules.position2 = position2Select.value;
  formData.modules.position3 = position3Select.value;
  formData.modules.position4 = position4Select.value;
  formData.modules.position5 = position5Select.value;
  formData.modules.position6 = position6Select.value;
  formData.modules.position7 = position7Select.value;
  formData.modules.position8 = position8Select.value;

  //Send values to server and wait for response
  fetch("/mirrors/addmodules", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "fail") {
        serverResponseElement.innerText = "Save Failed, Try Again";
      } else {
        serverResponseElement.innerText = "Successfully Saved";
      }
    })
    .catch((error) => {
      serverResponseElement.innerText = "Save Failed, Try Again";
      console.log(error);
    });
});

//Add event listener to clear server response on page click
window.addEventListener("click", (e) => {
  serverResponseElement.innerText = "";
});
