document.addEventListener("DOMContentLoaded", (event) => {
  console.log("window loaded")

  let signUpButton = document.getElementById("sign-up")
  signUpButton.addEventListener("click", showSignUpForm)
})

function showSignUpForm (event){
  signUpForm = document.getElementById("signup-form")
  logInForm = document.getElementById("login-form")
  console.log(signUpForm)
  logInForm.HTMLElement.hidden = true
  signUpForm.HTMLElement.hidden = false
  // logInForm.setAttribute("hidden", true)
}
