//Create an object that will store the form data
const formData = {};
//Variable to store server response object
let serverResponse;

//Get page elements
const forgotEmailButton = document.getElementById("forgot-submit-button");
const emailInput = document.getElementById("email-input");
const serverResponseElement = document.getElementById("server-response");

//Add event listener for submit button
forgotEmailButton.addEventListener("click", (e) => {
  //If you let the event propogate up the DOM, it will cause the
  //default action in a form to occur which is to reload the page with a url query
  e.preventDefault();

  //Check to see if inputs are empty and if they are,
  //display error message
  if (!emailInput.value) {
    serverResponseElement.innerText = "Please enter your email";
    return;
  }
  const emailRegex = /^.+@.+\..+$/;
  if (!emailRegex.test(emailInput.value)) {
    serverResponseElement.innerText = "Please enter a valid email";
    return;
  }

  //Add the user inputs to the form data object
  formData.email = emailInput.value;

  //Call fetch and send username and password to server
  fetch("/auth/forgotpass", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    //Convert the formData object to a JSON string and send in the body
    body: JSON.stringify(formData),
  })
    //Wait for a response and parse JSON response
    .then((response) => response.json())
    .then((result) => {
      serverResponse = result;
      emailInput.value = "";

      if (serverResponse.emailSent === "no") {
        serverResponseElement.innerText = "Bad request, please try again";
        //Else display success message
      } else {
        serverResponseElement.innerText = "Password reset email sent";
      }
    })
    .catch((error) => {
      //Console any error during the fetch process
      console.log(error);
    });
});
