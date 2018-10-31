document.addEventListener("DOMContentLoaded", (event) => {

let setNavButton = document.getElementById('setNavButton')
let setHeadButton = document.getElementById('setHeadButton')
let setName = document.getElementById('setName')
let setEmail = document.getElementById('setEmail')
let setCycle_length = document.getElementById('setCycle_length')
let setSubmitForm = document.getElementById('setSubmitForm')


let userName = localStorage.getItem('User Name').replace(/\"|\'|\`/g, '')
let userEmail = localStorage.getItem('User Email').replace(/['"]+/g, '')
let userCycle_Length = localStorage.getItem('User Cycle_Length').replace(/['"]+/g, '')
let userId = localStorage.getItem('User ID')


setNavButton.addEventListener('click', () => {
  console.log(userCycle_Length.parse)
  setName.value = userName
  setEmail.value = userEmail
  setCycle_length.value = userCycle_Length
})

setHeadButton.addEventListener('click', () => {
  console.log(userCycle_Length)
  setName.value = userName
  setEmail.value = userEmail
  setCycle_length.value = userCycle_Length
})

setSubmitForm.addEventListener('click', (ev) => {
  console.log(userCycle_Length);
  localStorage.setItem('User Name', JSON.stringify(setName.value))
  localStorage.setItem('User Cycle_Length', JSON.stringify(setCycle_length.value))
  localStorage.setItem('User Email', JSON.stringify(setEmail.value))

  axios.put(`${url}/users/${userId}`, {
    name: setName.value,
    email: setEmail.value,
    cycle_length: setCycle_length.value
  })
  .then(response => {
    console.log(response);

  })

  })
  // axios.get(`${url}/users/login/${userId}`).then(res => {
  //   console.log(res);
  // })
})
