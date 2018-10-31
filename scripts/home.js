let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let today = new Date()
let currentMonth = today.getMonth()
let url = "https://shark-week-server.herokuapp.com"
let userId = localStorage.getItem('User ID')
let currentYear = today.getFullYear()

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("window loaded")
  M.AutoInit();

  let canvas = document.getElementById('canvas')
  let storageData = JSON.parse(localStorage.getItem('User Entries'))

  welcomeUser()
  makeCalendar(currentMonth, canvas)
  postEntry()
  //look at entries and set colors for each day
  //colorCalendar()
  //console.log("storageData:",storageData[0].day);
  appendData()

  addCalendarFunctions(currentMonth, canvas)


// Riley's edit day code, NOTE: need to fix current month issue after calendar has been updated
let editCurrentDate = document.getElementById('editCurrentDate')
canvas.addEventListener('click', (event) => {
    console.log(event.target)
    editCurrentDate.innerHTML = months[currentMonth] + ', ' + event.target.id
  })

})

// let editSubmit = document.getElementById('editSubmit')
// editSubmit.addEventListener('click', function() => {
//   if
// })
// end of edit day code

function welcomeUser() {
  let userName = localStorage.getItem('User Name').replace(/\"|\'|\`/g, '')
  let welcome = document.getElementById('welcome')
  let currentDate = document.getElementById('currentDate')

  welcome.innerText = `Good Morning, ${userName}.`
  currentDate.innerText = `${today.getMonth() + 1}/${today.getDate()}`

  console.log("name:",userName);

}

function postEntry () {
  let form = document.getElementById('submit')
  form.addEventListener('click', (ev) => {
    ev.preventDefault()
    // grab all values from the form
    let postData = {}
    let temp = document.getElementById('temp')
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
      clearCanvas(canvas)
      makeCalendar(currentMonth, canvas)

    })
    .catch((error) => {
      console.log(error)
    })
  })
}

function makeCalendar (currentMonth, calendar, yearModifier){

  showCurrentMonth(currentMonth)
  addHeader(calendar)

  for (let r = 0; r < 5; r++) {
    let row = document.createElement('div')

    row.classList.add('row')
    addDates(currentMonth, row, r, yearModifier)
    calendar.appendChild(row)
  }
}

function addHeader(calendar) {
  let day = ['Sun', 'M', 'T', 'W', 'Th', 'F', 'Sat']
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
}

function addDates(currentMonth, row, r, yearModifier = 0) {
  if (currentMonth === 1 && r === 4) return

  let daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  let year = today.getFullYear() + yearModifier

  for (let i = 1; i < 8; i++) {

    let days = i + (r * 7)
    let d = new Date(year, currentMonth, days)
    let col = document.createElement('div')

    col.classList.add('col')
    col.classList.add('s1')
    col.innerText = d.getDate()
    col.id = days
    row.appendChild(col)

    if (days > daysInMonths[currentMonth] - 1) {
      break
    }
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
    if (nextMonth > 11) {
      nextMonth = 0
      makeCalendar(nextMonth, calendar, 1)
    } else {
      makeCalendar(nextMonth, calendar)
    }
    //for tracking purposes
    currentMonth = nextMonth

  })

  //previous
  let prevMonthButton = document.getElementById("prev-month")

  prevMonthButton.addEventListener('click', (event) =>{
    event.preventDefault()
    clearCanvas(calendar)
    let prevMonth = currentMonth - 1

    if (prevMonth < 0) {
      prevMonth = 11
      makeCalendar(prevMonth, calendar, -1)
    } else {
      makeCalendar(prevMonth, calendar)
    }
    //for tracking purposes
    currentMonth = prevMonth
  })
}

function clearCanvas(canvas){
  while(canvas.hasChildNodes()){
    canvas.removeChild(canvas.lastChild)
  }
}

function showCurrentMonth(currentMonth) {
  let calendarMonth = document.getElementById('currentMonth')
  calendarMonth.innerText = months[currentMonth]
}
