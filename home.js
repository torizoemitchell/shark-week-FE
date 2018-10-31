document.addEventListener("DOMContentLoaded", (event) => {
  console.log("window loaded")
  M.AutoInit();
  currentDate
  let calendarMonth = document.getElementById('currentMonth')
  let currentMonth = today.getMonth()
  calendarMonth.innerText = currentMonth
  let canvas = document.getElementById('canvas')
  makeCalendar(currentMonth, canvas)
  postEntry()
  //look at entries and set colors for each day
  //colorCalendar()
  let storageData = JSON.parse(localStorage.getItem('User Entries'))
  console.log("storageData:",storageData[0].day);
  appendData()

  addCalendarFunctions(currentMonth, canvas)


// Riley's edit day code, NOTE: need to fix current month issue after calendar has been updated
let editCurrentDate = document.getElementById('editCurrentDate')
let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
canvas.addEventListener('click', (event) => {
    console.log(event.target)
    editCurrentDate.innerHTML = month[currentMonth] + ', ' + event.target.id
  })

})

// let editSubmit = document.getElementById('editSubmit')
// editSubmit.addEventListener('click', function() => {
//   if
// })
// end of edit day code

let today = new Date()
let url = "https://shark-week-server.herokuapp.com"
let userName = localStorage.getItem('User Name')
let userId = localStorage.getItem('User ID')
console.log("name:",userName);
let welcome = document.getElementById('welcome')
welcome.innerText = `Good Morning, ${userName}.`
let currentDate = document.getElementById('currentDate')
currentDate.innerText = `${today.getMonth() + 1}/${today.getDate()}`

function postEntry () {
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
    // axios.post that data to the correct backend route
    appendToday(postData)
    axios.post(`${url}/entries/${userId}`, postData)
    .then((response) => {
      console.log("response:", response)
      //remake calendar with new data? here with buildCalendar()

      console.log(response)
      let inputDiv = document.getElementById("user-input")
      inputDiv.hidden = true

      //remake calendar
      makeCalendar(currentMonth, canvas)

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

  // add days as headers
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
function appendToday (data) {
  let day = document.getElementById(today.getDate())
  day.setAttribute("temp", data.temp)
  day.setAttribute("flow", data.flow)
}

function appendData () {

  let storageData = JSON.parse(localStorage.getItem('User Entries'))

  storageData.forEach(function(element) {
    let day = document.getElementById(element.day)
    day.setAttribute("temp", element.temp)
    day.setAttribute("flow", element.flow)

  })
}

function addCalendarFunctions(currentMonth, calendar){
  //next
  let nextMonthButton = document.getElementById("next-month")
  nextMonthButton.addEventListener('click', (event) =>{
    event.preventDefault()
    clearCanvas(calendar)
    let nextMonth = currentMonth + 1
    makeCalendar(nextMonth, calendar)
    //for tracking purposes
    currentMonth = nextMonth
  })
  //previous
  let prevMonthButton = document.getElementById("prev-month")
  prevMonthButton.addEventListener('click', (event) =>{
    event.preventDefault()
    clearCanvas(calendar)
    let prevMonth = currentMonth - 1
    makeCalendar(prevMonth, calendar)
    //for tracking purposes
    currentMonth = prevMonth
  })
}

function clearCanvas(canvas){
  while(canvas.hasChildNodes()){
    canvas.removeChild(canvas.lastChild)
  }
}
