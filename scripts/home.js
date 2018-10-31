let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let today = new Date()
let currentMonth = today.getMonth()
let url = "https://shark-week-server.herokuapp.com"
let userId = localStorage.getItem('User ID')
let currentYear = today.getFullYear()

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("window loaded")
  M.AutoInit()
  let canvas = document.getElementById('canvas')

  welcomeUser()
  makeCalendar(currentMonth, canvas)
  setEditFormListener()
  addCalendarFunctions(currentMonth, canvas)


let editCurrentDate = document.getElementById('editCurrentDate')
canvas.addEventListener('click', (event) => {
    console.log(event.target)
    editCurrentDate.innerHTML = months[currentMonth] + ', ' + event.target.id.split('-')[1]
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

function setEditFormListener () {
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
    axios.post(`${url}/entries/${userId}`, postData)
    .then((response) => {
      console.log("response:", response)

      let inputDiv = document.getElementById("user-input")
      let entries = JSON.parse(localStorage.getItem('User Entries'))
      let newEntry = Object.assign({
        temp: postData.temp, 
        flow: postData.flow, 
        day: postData.date.getDate(), 
        month: postData.date.getMonth()
      }, response.data)
      inputDiv.hidden = true
      entries.push(newEntry)
      localStorage.setItem('User Entries', JSON.stringify(entries))
      setCalendarDataAttributes()
    })
    .catch((error) => {
      console.log(error)
    })
  })
}

function makeCalendar (currentMonth, calendar){

  showCurrentMonth(currentMonth, currentYear)
  addHeader(calendar)

  for (let r = 0; r < 6; r++) {
    let row = document.createElement('div')

    row.classList.add('row')
    addDates(currentMonth, row, r)
    calendar.appendChild(row)
  }
  setCalendarDataAttributes()
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

function addDates(currentMonth, row, r) {

  let daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  let firstDate = new Date(currentYear, currentMonth, 01)
  let numberOfBlanks = firstDate.getDay()
  let date = 1 + (r * 7)
  
  if (r > 0) {
    date = date - numberOfBlanks
  }

  for (let i = 1; i < 8; i++) {   
    if (date > daysInMonths[currentMonth]) {
      break
    }
    
    if (r === 0) {
      while (numberOfBlanks > 0) {
        let blank = document.createElement('div')
        blank.classList.add('col')
        blank.classList.add('s1')  
        row.appendChild(blank)
        numberOfBlanks--
        i++
        continue
      }
    }

    let col = document.createElement('div')

    col.classList.add('col')
    col.classList.add('s1')
    col.innerText = date
    col.id = `${currentMonth}-${date}`
    row.appendChild(col)
    date++
  }
}

function setCalendarDataAttributes() {

  let entries = JSON.parse(localStorage.getItem('User Entries'))

  entries.forEach(function(entry) {
      let day = document.getElementById(`${entry.month}-${entry.day}`)
      if (!day) return 
      
      day.setAttribute("data-temp", entry.temp)
      day.setAttribute("data-flow", entry.flow)
      day.setAttribute("data-id", entry.id)
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
      currentYear++
      makeCalendar(nextMonth, calendar)
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
      currentYear--
      makeCalendar(prevMonth, calendar)
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

function showCurrentMonth(month, year) {
  let calendarMonth = document.getElementById('currentMonth')
  calendarMonth.innerText = `${months[month]} ${year}`
}
