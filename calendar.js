 

  function buildCalculator() {

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


  }

