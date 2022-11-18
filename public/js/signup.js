//Create an object that will store the form data
const formData = {};
//Variable to store server response object
let serverResponse;

//Get page elements
const signupButton = document.getElementById("signup-submit-button");
const emailInput = document.getElementById("emailCreate-input");
const passwordInput = document.getElementById("passwordCreate-input");
const passwordMatch = document.getElementById("passwordAgain-input");
const serverResponseElement = document.getElementById("server-response");

//Add listener for password match
passwordInput.addEventListener("keyup", (e) => {
  if (passwordInput.value != "" && passwordInput.value == passwordMatch.value) {
    serverResponseElement.innerText = "Passwords Match";
  } else if (passwordInput.value != "") {
    serverResponseElement.innerText = "Passwords Don't Match";
  } else {
    serverResponseElement.innerText = "";
  }
});
passwordMatch.addEventListener("keyup", (e) => {
  if (passwordInput.value == passwordMatch.value) {
    serverResponseElement.innerText = "Passwords Match";
  } else {
    serverResponseElement.innerText = "Passwords Don't Match";
  }
});

//Add event listener for submit button
signupButton.addEventListener("click", (e) => {
  //If you let the event propogate up the DOM, it will cause the
  //default action in a form to occur which is to reload the page with a url query
  e.preventDefault();

  if (passwordInput.value != passwordMatch.value) {
    return;
  }
  //Check to see if inputs are empty and if they are,
  //display error message
  if (!emailInput.value || !passwordInput.value || !passwordMatch.value) {
    serverResponseElement.innerText = "Please complete the form";
    return;
  }
  const emailRegex = /^.+@.+\..+$/;
  if (!emailRegex.test(emailInput.value)) {
    serverResponseElement.innerText = "Please enter a valid email";
    return;
  }
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  if (!passwordRegex.test(passwordInput.value)) {
    serverResponseElement.innerText =
      "Password must be between 8 and 20 characters and must contain 1 uppercase letter, 1 lowercase letter, a number, and a special character";
    return;
  }

  //Add the user inputs to the form data object
  formData.email = emailInput.value;
  formData.password = passwordInput.value;

  //Call fetch and send username and password to server
  fetch("/users/signup", {
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
      passwordInput.value = "";
      passwordMatch.value = "";
      if (serverResponse.status === "fail") {
        serverResponseElement.innerText = "Bad request, please try again";
        //Else display success message
      } else window.location.assign("/login");
    })
    .catch((error) => {
      //Console any error during the fetch process
      console.log(error);
    });
});
