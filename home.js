document.addEventListener("DOMContentLoaded", (event) => {
  console.log("window loaded")
  M.AutoInit();
  currentDate
  postEntry()
})
let today = new Date()
let url = "https://shark-week-server.herokuapp.com"
let userName = localStorage.getItem('User Name')
let userId = localStorage.getItem('User ID')
console.log("name:",userName);
let welcome = document.getElementById('welcome')
welcome.innerText = `Good morning ${userName}! Please input your daily entry.`
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
    postData['date'] = today
    postData['flow'] = toggle

    console.log('postData', postData);
    console.log('toggle value:', toggle );
    console.log('userId', userId);
    console.log('url', url);
    console.log('post path:', `${url}/entries/${userId}`);
    // axios.post that data to the correct backend route
    axios.post(`${url}/entries/${userId}`, postData)
    .then((response) => {

      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  })
}
