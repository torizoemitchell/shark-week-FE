let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let today = new Date()
let currentMonth = today.getMonth()
let url = "https://shark-week-server.herokuapp.com"
let userId = localStorage.getItem('User ID')
let currentYear = today.getFullYear()

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("window loaded")
  let canvas = document.getElementById('canvas')

  M.AutoInit()
  welcomeUser()
  makeCalendar(currentMonth, canvas)
  deleteEntry()
  setCanvasListener(canvas)
  setSubmitListener()
  setEditListener()
  setCalendarListeners(currentMonth, canvas)
  setLogoutListeners()
})

function setCanvasListener(canvas) {
  canvas.addEventListener('click', (event) => {
    let modal = document.getElementById('editEntry')
    let editCurrentDate = document.getElementById('editCurrentDate')
    if (!event.target.id || event.target.id === 'canvas') {
        event.preventDefault()
        setTimeout(() => M.Modal.getInstance(modal).close(), 0)
      }
      editCurrentDate.innerHTML = `${months[event.target.id.split('-')[0]]} ${event.target.id.split('-')[1]}`
      editCurrentDate.setAttribute("data-id", event.target.id)
    })
}

function welcomeUser() {
  let userName = localStorage.getItem('User Name').replace(/\"|\'|\`/g, '')
  let welcome = document.getElementById('welcome')
  let currentDate = document.getElementById('currentDate')

  welcome.innerText = `Good Morning, ${userName}.`

  currentDate.innerText = `${months[today.getMonth()]} ${today.getDate()}`
  currentDate.setAttribute('data-id', `${today.getMonth()}-${today.getDate()}`)

  console.log("name:", userName);

}


function setSubmitListener () {
  let button = document.getElementById('submit')
  button.addEventListener('click', (ev) => {

    ev.preventDefault()
    // grab all values from the button
    let postData = {}
    let temp = document.getElementById('temp')
    let toggle = document.getElementById('checkbox').checked

    let entryModalDate = document.getElementById('currentDate')
    let emdDataId = entryModalDate.getAttribute('data-id')
    let dateElement = document.getElementById(emdDataId)
    let dateID = dateElement.dataset.id

    postData[temp.id] = temp.value
    postData['date'] = today
    postData['flow'] = toggle

    console.log('postData', postData);

    if (dateID) {
      //axios.put if editing existing entry
      put(postData, dateID)
    } else {
      // axios.post that data to the correct backend route
      post(postData)
    }
  })
}


function setEditListener () {
  let button = document.getElementById('editSubmit')

  button.addEventListener('click', (ev) => {
    ev.preventDefault()

    let postData = {}
    let temp = document.getElementById('editTemp')
    let toggle = document.getElementById('editCheckbox').checked

    let entryModalDate = document.getElementById('editCurrentDate')
    let emdDataId = entryModalDate.getAttribute('data-id')
    let dateElement = document.getElementById(emdDataId)
    let dateID = dateElement.dataset.id

    let [month, day] = emdDataId.split('-')
    let correct = new Date(currentYear, month, day)

    postData['temp'] = temp.value
    postData['date'] = correct
    postData['flow'] = toggle



    console.log('postData', postData);
    if (dateID) {
      //axios.put if editing existing entry
      put(postData, dateID)
    } else {
      // axios.post that data to the correct backend route
      post(postData)
    }
  })
}


function makeCalendar(currentMonth, calendar) {

  showCurrentMonth(currentMonth, currentYear)
  addHeader(calendar)

  for (let r = 0; r < 6; r++) {
    let row = document.createElement('div')

    row.classList.add('row')
    addDates(currentMonth, row, r)
    calendar.appendChild(row)
  }
  setCalendarDataAttributes()
  colorCalendar()
}

function addHeader(calendar) {
  let day = ['Su', 'M', 'T', 'W', 'Th', 'F', 'Sa']
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

    let col = document.getElementById(`${currentMonth}-${date}`)? document.getElementById(`${currentMonth}-${date}`) : document.createElement('div')

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

  entries.forEach(entry => {
    let day = document.getElementById(`${entry.month}-${entry.day}`)

    if (!day) return

    day.setAttribute("data-temp", entry.temp)
    day.setAttribute("data-flow", entry.flow)
    day.setAttribute("data-id", entry.id)
  })
}

function colorCalendar() {
  console.log("color calendar")
  let entries = JSON.parse(localStorage.getItem('User Entries'))

  let calculatedStandardDays = false;

  entries.forEach(entry => {
    let day = document.getElementById(`${entry.month}-${entry.day}`)
    if (!day) return

    let tempDifference = day.dataset.temp - 98.60
    setGradient(tempDifference, day)

    if (entry.flow && !calculatedStandardDays){
      calculateStandardDays(day)
      calculatedStandardDays = true
    }
  })

}

function calculateStandardDays(day){

  console.log("calculate standard days")
  let daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  let month = +day.id.split('-')[0]
  let date = +day.id.split('-')[1]

  let fertileDay = date + 7
  let futureToggle = false
  let modifier = 0


  for(let i = 0; i < 12; i++){

    if (fertileDay > daysInMonths[month]){
      futureToggle = true
      month = month < 11 ? month + 1 : 0
      fertileDay = 1
      modifier = 0
    }

    let dayElement = document.getElementById(`${month}-${fertileDay + modifier}`)

    if (!dayElement){
      dayElement = document.createElement('div')
      dayElement.id = `${month}-${fertileDay + modifier}`
    }

    console.log("month: ", month)
    console.log("day: ", fertileDay)
    dayElement.classList.add("amber")
    dayElement.setAttribute('data-ignoreTemp', "true")

    if(i < 4){
      dayElement.classList.add("darken-2")

    }
    if(i < 8 && i >= 4){
      dayElement.classList.add("darken-4")
    }
    if(i >= 8){
      dayElement.classList.add("darken-2")
    }
    if (futureToggle) {
      document.getElementById('nextMonthStorage').appendChild(dayElement)
    }
    modifier++
  }

}

function setGradient(difference, element) {
  if (element.dataset.ignoreTemp) return

  if (difference >= 0.4 ) {
    element.classList.add('amber')
  } else {
    element.classList.add('blue')
    element.classList.add('lighten-4')
  }
  if (difference > 0.4 && difference <= 0.55) {
    element.classList.add('darken-1')
  }
  if (difference > 0.55 && difference <= 0.65) {
    element.classList.add('darken-2')
  }
  if (difference > 0.65 && difference <= 0.75) {
    element.classList.add('darken-3')
  }
  if (difference > 0.75) {
    element.classList.add('darken-4')
  }
}


function setCalendarListeners(currentMonth, calendar){
  //next
  let nextMonthButton = document.getElementById("next-month")

  nextMonthButton.addEventListener('click', (event) => {
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

  prevMonthButton.addEventListener('click', (event) => {
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

function clearCanvas(canvas) {
  while (canvas.hasChildNodes()) {
    canvas.removeChild(canvas.lastChild)
  }
}

function showCurrentMonth(month, year) {
  let calendarMonth = document.getElementById('currentMonth')
  calendarMonth.innerText = `${months[month]} ${year}`
}


function setLogoutListeners() {
  let link1 = document.getElementById('logout')
  link1.addEventListener('click', (ev) => {
    ev.preventDefault()
    localStorage.clear()
    window.location = `/index.html`
  })

  let link2 = document.getElementById('mobileLogout')
  link2.addEventListener('click', (ev) => {
    ev.preventDefault()
    localStorage.clear()
    window.location = `/index.html`
  })

}

function deleteEntry() {

  let deleteButton = document.getElementById('editDelete')
  deleteButton.addEventListener('click', (ev) => {

    let entryModalDate = document.getElementById('editCurrentDate')
    let emdDataId = entryModalDate.getAttribute('data-id')
    let dateElement = document.getElementById(emdDataId)
    let entryID = dateElement.dataset.id

    axios.delete(`${url}/entries/${entryID}`)
      .then((response) => {
        console.log('DELETED Entry:', response)
        delete dateElement.dataset.temp
        delete dateElement.dataset.flow
        delete dateElement.dataset.id
        dateElement.className = 'col s1'
      })
      .catch((err) => {
        console.log(err)
      })
  })
}

function put(postData, entryID) {
  console.log("this is a put");
  axios.put(`${url}/entries/${entryID}`,postData)
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
    colorCalendar()
  })
  .catch((error) => {
    console.log(error)
  })
}

function post(postData) {
  console.log('this is a post');
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
    colorCalendar()
  })
  .catch((error) => {
    console.log(error)
  })
}
