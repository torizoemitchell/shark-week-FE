document.addEventListener("DOMContentLoaded", (event) => {
  console.log("window loaded")
  M.AutoInit();
  currentDate
  postEntry()
  let currentMonth = today.getMonth()
  let canvas = document.getElementById('canvas')
  makeCalendar(currentMonth, canvas)
  //look at entries and set colors for each day
  //colorCalendar()
})

let today = new Date()
let url = "https://shark-week-server.herokuapp.com"
let userName = localStorage.getItem('User Name')
let userId = localStorage.getItem('User ID')
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
      //remake calendar with new data? here with buildCalendar()
    })
    .catch((error) => {
      console.log(error)
    })
  })
}

function makeCalendar (currentMonth, calendar){
  let day = ['Sun', 'M', 'T', 'W', 'Tr', 'F', 'Sat'];
  let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  let header = document.createElement('div')
  header.classList.add('row')

  for (let name of day) {
    let col = document.createElement('div')
    col.classList.add('col')
    col.classList.add('s1')
    col.innerText = name
    header.appendChild(col)
  }
  calendar.appendChild(header)

  for (let r = 0; r < 5; r++) {
    var row = document.createElement('div')
    row.classList.add('row')
    for (let i = 1; i < 8; i++) {
      let dayInfo = document.createElement('div')
      let days = i + (r * 7)
      let d = new Date(2018, currentMonth, days)
      // console.log(d);
      dayInfo.classList.add('col')
      dayInfo.classList.add('s1')
      // dayInfo.innerText = day[d.getDay()]
      // dayInfo.innerHTML += "<br>"
      dayInfo.innerText += d.getDate()
      dayInfo.innerHTML += "<br>"
      // dayInfo.innerText += month[d.getMonth()] + ' ' + (1900 + d.getYear())
      dayInfo.setAttribute("id", days)
      row.appendChild(dayInfo)
      console.log(month[currentMonth])
      if (days > daysInMonths[currentMonth] - 1) {
        break
      }
    }
    calendar.appendChild(row)
  }
}
