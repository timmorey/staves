const LINE_SPACING = 10
const STAFF_SPACING = 36
const GROUP_SPACING = 54

function getCanvas() {
  return document.querySelector('#the-canvas')
}

function render(canvas) {
  canvas.width = canvas.clientWidth * window.devicePixelRatio
  canvas.height = canvas.clientHeight * window.devicePixelRatio
  const context = canvas.getContext('2d')
  context.scale(window.devicePixelRatio, window.devicePixelRatio)
  context.clearRect(0, 0, canvas.width, canvas.height)

  context.lineWidth = 1
  context.strokeStyle = 'black'

  let y = 1
  for (let groups = 0; groups < 5; groups++) {
    y = drawGroup(context, y)
    y += GROUP_SPACING
  }
}

function drawGroup(context, y) {
  y = drawStaff(context, y, LINE_SPACING)
  y += STAFF_SPACING
  y = drawTabLines(context, y, LINE_SPACING)
  return y
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
  for (let i = 0; i < 6; i++) {
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

window.addEventListener('load', () => {
  const canvasElement = getCanvas()
  render(canvasElement)
  window.addEventListener('resize', () => render(canvasElement))
})