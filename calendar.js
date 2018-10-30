document.addEventListener('DOMContentLoaded', function() {
  console.log('here')




  let canvas = document.getElementById('canvas')

for (let j = 0; j < 5; j++) {
  let row = document.createElement('div')
    row.className = 'row'
    for (let i = 0; i < 7; i++) {
      let pixel = document.createElement('div')
      pixel.className = 'pixel'
      pixel.id = (i + 1) + (j*7)
      row.appendChild(pixel)

    }
  canvas.appendChild(row)
}


  // let changeColor = (event) => {
  //   console.log(event.target);
  //   if (event.target.className === 'pixel') {
  //   event.target.style.backgroundColor = currentColor.style.backgroundColor
  //   }
  // }

  // canvas.addEventListener('click', changeColor)



  // blue.addEventListener('click', function() {
  //   currentColor.style.backgroundColor = 'blue'
  // })
  // red.addEventListener('click', function() {
  //   currentColor.style.backgroundColor = 'red'
  // })
  // yellow.addEventListener('click', function() {
  //   currentColor.style.backgroundColor = 'yellow'
  // })
  // green.addEventListener('click', function() {
  //   currentColor.style.backgroundColor = 'green'
  // })



})
