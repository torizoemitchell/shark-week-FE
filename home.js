document.addEventListener("DOMContentLoaded", (event) => {
  console.log("window loaded")
  M.AutoInit();

  let calendarMonth = document.getElementById('currentMonth')
  let currentMonth = today.getMonth()
  let canvas = document.getElementById('canvas')
  let storageData = JSON.parse(localStorage.getItem('User Entries'))

  calendarMonth.innerText = currentMonth
  makeCalendar(currentMonth, canvas)
  postEntry()
  //look at entries and set colors for each day
  //colorCalendar()
  //console.log("storageData:",storageData[0].day);
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

function makeCalendar (currentMonth, calendar, yearModifier){  
  
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
      nextMonth = 1
      makeCalendar(prevMonth, calendar, 1)
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
