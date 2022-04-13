//Create an object that will store the form data
const formData = {};
//Variable to store server response object
let serverResponse;

//Get page elements
const submitButton = document.getElementById("login-submit-button");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");

//Add event listener for submit button
submitButton.addEventListener("click", (e) => {
  //If you let the event propogate up the DOM, it will cause the
  //default action in a form to occur which is to reload the page with a url query
  e.preventDefault();

  //Add the user inputs to the form data object
  formData.username = usernameInput.value;
  formData.password = passwordInput.value;

  //Call fetch and send username and password to server
  fetch("/authentication", {
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
      //The server response object is being stored here in the serverResponse variable
      //It is an object in the format {authenticated: "yes"} or {authenticated: "no"}
      //You can write an if statement if(serverResponse.authenticated === "yes") to decide if you want
      //to display an error or redirect
      serverResponse = result;
    })
    .catch((error) => {
      //Console any error during the fetch process
      console.log(error);
    });
});
