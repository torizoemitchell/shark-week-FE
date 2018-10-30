let calendar = document.getElementById('calendar')
let calendarDay = document.createElement('p')
let calendarDate = document.createElement('p')
let calendarMonthYear = document.createElement('p')

let day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
let currentMonth = 11

// const calDayCreator = () => {



const calCellCreator = (currentMonth, calendar) => {
  let day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  for (let r = 0; r < 5; r++) {
    var row = document.createElement('tr')

    for (let i = 1; i < 7; i++) {
      let dayInfo = document.createElement('td')
      let days = i + (r * 7)
      let d = new Date(2018, currentMonth, days)
      // console.log(d);
      dayInfo.innerText = day[d.getDay()]
      dayInfo.innerHTML += "<br>"
      dayInfo.innerText += d.getDate()
      dayInfo.innerHTML += "<br>"
      dayInfo.innerText += month[d.getMonth()] + ' ' + (1900 + d.getYear())
      row.appendChild(dayInfo)
      console.log(month[currentMonth])
      if (days > daysInMonths[currentMonth] - 1) {
        break
      }
    }
    calendar.appendChild(row)
  }
}





calCellCreator()

window.onload = calendar;
