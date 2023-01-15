const STORAGE_KEY_BASE = 'staff-pages'

function render() {
  const canvas = canvasElement()
  canvas.width = canvas.clientWidth * window.devicePixelRatio
  canvas.height = canvas.clientHeight * window.devicePixelRatio
  const context = canvas.getContext('2d')
  context.scale(window.devicePixelRatio, window.devicePixelRatio)
  context.clearRect(0, 0, canvas.width, canvas.height)

  context.lineWidth = 1
  context.strokeStyle = 'black'

  let y = 1
  if (lineStyle() === 'staff') {
    for (let groups = 0; groups < 9; groups++) {
      y = drawStaff(context, y, lineSpacing())
      y += groupSpacing()
    }
  } else if (lineStyle() === 'tab') {
    for (let groups = 0; groups < 8; groups++) {
      y = drawTabLines(context, y, lineSpacing())
      y += groupSpacing()
    }
  } else if (lineStyle() === 'staff-and-tab') {
    for (let groups = 0; groups < 5; groups++) {
      y = drawStaff(context, y, lineSpacing())
      y += staffSpacing()
      y = drawTabLines(context, y, lineSpacing())
      y += groupSpacing()
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

function canvasElement() {
  return document.querySelector('#the-canvas')
}

function selectElement() {
  return document.querySelector('#style-select')
}

function lineStyle() {
  return selectElement().value
}

function setLineStyle(lineStyle) {
  selectElement().value = lineStyle
}

function lineSpacingInputElement() {
  return document.querySelector('#line-spacing-input')
}

function lineSpacing() {
  return parseInt(lineSpacingInputElement().value)
}

function setLineSpacing(spacing) {
  lineSpacingInputElement().value = spacing
}

function staffSpacingInputElement() {
  return document.querySelector('#staff-spacing-input')
}

function staffSpacing() {
  return parseInt(staffSpacingInputElement().value)
}

function setStaffSpacing(spacing) {
  staffSpacingInputElement().value = spacing
}

function groupSpacingInputElement() {
  return document.querySelector('#group-spacing-input')
}

function groupSpacing() {
  return parseInt(groupSpacingInputElement().value)
}

function setGroupSpacing(spacing) {
  groupSpacingInputElement().value = spacing
}

function hydrateControls() {
  setLineStyle(window.localStorage.getItem(`${STORAGE_KEY_BASE}-line-style`) ?? 'staff-and-tab')
  setLineSpacing(window.localStorage.getItem(`${STORAGE_KEY_BASE}-${lineStyle()}-line-spacing`) ?? 10)
  setStaffSpacing(window.localStorage.getItem(`${STORAGE_KEY_BASE}-${lineStyle()}-staff-spacing`) ?? 34)
  setGroupSpacing(window.localStorage.getItem(`${STORAGE_KEY_BASE}-${lineStyle()}-group-spacing`) ?? 60)
}

function saveToLocalStorage() {
  window.localStorage.setItem(`${STORAGE_KEY_BASE}-line-style`, lineStyle())
  window.localStorage.setItem(`${STORAGE_KEY_BASE}-${lineStyle()}-line-spacing`, lineSpacing())
  window.localStorage.setItem(`${STORAGE_KEY_BASE}-${lineStyle()}-staff-spacing`, staffSpacing())
  window.localStorage.setItem(`${STORAGE_KEY_BASE}-${lineStyle()}-group-spacing`, groupSpacing())
}

function handleInput() {
  saveToLocalStorage()
  render()
}

function handleStyleChange() {
  setLineSpacing(window.localStorage.getItem(`${STORAGE_KEY_BASE}-${lineStyle()}-line-spacing`) ?? 10)
  setStaffSpacing(window.localStorage.getItem(`${STORAGE_KEY_BASE}-${lineStyle()}-staff-spacing`) ?? 34)
  setGroupSpacing(window.localStorage.getItem(`${STORAGE_KEY_BASE}-${lineStyle()}-group-spacing`) ?? 60)
  saveToLocalStorage()
  render()
}

window.addEventListener('load', () => {
  hydrateControls()
  render()
  window.addEventListener('resize', render)
  selectElement().addEventListener('input', handleStyleChange)
  lineSpacingInputElement().addEventListener('input', handleInput)
  staffSpacingInputElement().addEventListener('input', handleInput)
  groupSpacingInputElement().addEventListener('input', handleInput)
})
