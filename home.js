document.addEventListener("DOMContentLoaded", (event) => {
  console.log("window loaded")
  M.AutoInit();
  currentDate
  postEntry()
})
let today = new Date()

let userName = localStorage.getItem('User Name')
console.log("name:",userName);
let welcome = document.getElementById('welcome')
welcome.innerText = `Good Morning, ${userName}.`
let currentDate = document.getElementById('currentDate')
currentDate.innerText = `${today.getMonth() + 1}/${today.getDate()}`


function postEntry (event) {
  let form = document.getElementById('submit')
  form.addEventListener('click', (ev) => {
    ev.preventDefault()
    // grab all values from the form
    let postData = {}
    let formElements = ev.target.elements

    let temp = document.getElementById('temp')
    let date = currentDate.innerText
    let toggle = document.getElementById('checkbox').checked
    postData[temp.id] = temp.value
    postData['date'] = date
    postData['flow'] = toggle

    console.log('postData', postData);
    console.log('toggle value:', toggle );
    // axios.post that data to the correct backend route
    axios.post(`${url}/entries/${date}`, postData)
    .then((response) => {

      console.log(response)
      //remake calendar with new data? here with buildCalendar()
    })
    .catch((error) => {
      console.log(error)
    })
  })
}
