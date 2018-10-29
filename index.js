document.addEventListener("DOMContentLoaded", (event) => {
  console.log("window loaded")

  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);

  let signUpButton = document.getElementById("sign-up")
  //signUpButton.addEventListener("click", showSignUpForm)
})

let emailInput = document.getElementById('email')
let passwordInput = document.getElementById('password')
let url = '/temp_backend/'

function showSignUpForm (event){
  signUpForm = document.getElementById("signup-form")
  logInForm = document.getElementById("login-form")

  //console.log(signUpForm)
  signUpForm.setAttribute("hidden", false)

  // logInForm.setAttribute("hidden", true)
}

function logIn (event) {
  let form = document.getElementById('login-form')
  form.addEventListener('submit', (ev) => {
    ev.preventDefault()
    // grab all values from the form
    // let postData = {}
    // let formElements = ev.target.elements
    //
    // for (var i = 0; i < formElements.length; i++) {
    //   let inputName = formElements[i].name
    //   if( inputName ) {
    //     postData[inputName] = formElements[i].value
    //   }
    // }

    //console.log('postData', postData);

    // axios.post that data to the correct backend route
    axios.post(`${url}/users`, postData)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  })
}
