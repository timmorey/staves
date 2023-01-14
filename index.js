const STYLE_STORAGE_KEY = 'staff-pages-line-style'

function getCanvas() {
  return document.querySelector('#the-canvas')
}

function render(canvas, lineStyle) {
  canvas.width = canvas.clientWidth * window.devicePixelRatio
  canvas.height = canvas.clientHeight * window.devicePixelRatio
  const context = canvas.getContext('2d')
  context.scale(window.devicePixelRatio, window.devicePixelRatio)
  context.clearRect(0, 0, canvas.width, canvas.height)

  context.lineWidth = 1
  context.strokeStyle = 'black'

  let y = 1
  if (lineStyle === 'staff') {
    for (let groups = 0; groups < 9; groups++) {
      y = drawStaff(context, y, 10)
      y += 62
    }
  } else if (lineStyle === 'tab') {
    for (let groups = 0; groups < 8; groups++) {
      y = drawTabLines(context, y, 10)
      y += 64
    }
  } else if (lineStyle === 'staff-and-tab') {
    for (let groups = 0; groups < 5; groups++) {
      y = drawStaff(context, y, 10)
      y += 34
      y = drawTabLines(context, y, 10)
      y += 60
    }
  }
}

function drawStaff(context, y, spacing) {
  y = drawLine(context, y)
  for (let i = 1; i < 5; i++) {
    y += spacing
    y = drawLine(context, y)
  }
  return y
}

function drawTabLines(context, y, spacing) {
  y = drawLine(context, y)
  for (let i = 0; i < 5; i++) {
    y += spacing
    y = drawLine(context, y)
  }
  return y
}

function drawLine(context, y) {
  context.beginPath()
  context.moveTo(0, y)
  context.lineTo(context.canvas.width, y)
  context.stroke()
  return y
}

function getSelectElement() {
  return document.querySelector('#style-select')
}

function getSelectedLineStyle() {
  return getSelectElement().value
}

function hydrateFromLocalStorage() {
  if (window.localStorage.getItem(STYLE_STORAGE_KEY)) {
    getSelectElement().value = window.localStorage.getItem(STYLE_STORAGE_KEY)
  }
}

function saveToLocalStorage(lineStyle) {
  window.localStorage.setItem(STYLE_STORAGE_KEY, lineStyle)
}

window.addEventListener('load', () => {
  hydrateFromLocalStorage()
  let lineStyle = getSelectedLineStyle()
  const canvasElement = getCanvas()
  render(canvasElement, lineStyle)
  window.addEventListener('resize', () => render(canvasElement, lineStyle))
  getSelectElement().addEventListener('input', () => {
    lineStyle = getSelectedLineStyle()
    saveToLocalStorage(lineStyle)
    render(canvasElement, lineStyle)
  })
})
