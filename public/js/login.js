//Check to see if user is already logged in and redirect

//Create an object that will store the form data
const formData = {};
//Variable to store server response object
let serverResponse;

//Get page elements
const submitButton = document.getElementById("login-submit-button");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const serverResponseElement = document.getElementById("server-response");

//Add event listener for submit button
submitButton.addEventListener("click", (e) => {
  //If you let the event propogate up the DOM, it will cause the
  //default action in a form to occur which is to reload the page with a url query
  e.preventDefault();

  //Check to see if inputs are empty and if they are,
  //display error message
  if (!usernameInput.value || !passwordInput.value) {
    serverResponseElement.innerText = "Please Enter a Username and Password";
    return;
  }

  //Add the user inputs to the form data object
  formData.email = usernameInput.value;
  formData.password = passwordInput.value;

  //Call fetch and send username and password to server
  fetch("/users/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    //Convert the formData object to a JSON string and send in the body
    body: JSON.stringify(formData),
  })
    //Wait for a response and parse JSON response
    .then((response) => response.json())
    .then((result) => {
      //The server response object is being stored here in the serverResponse variable
      //It is an object in the format {authenticated: "yes"} or {authenticated: "no"}
      //You can write an if statement if(serverResponse.authenticated === "yes") to decide if you want
      //to display an error or redirect
      serverResponse = result;
      //Check to see if server response is no and if it is, reset elements
      //and display message
      usernameInput.value = "";
      passwordInput.value = "";
      if (serverResponse.status === "fail") {
        serverResponseElement.innerText = "Invalid Email or Password";
        //Else display success message
      } else window.location.assign("/dashboard");
    })
    .catch((error) => {
      //Console any error during the fetch process
      console.log(error);
    });
});
