const STORAGE_KEY_BASE = 'staves'
const CANVAS_DPI = 300
const CANVAS_SCALED_DPI = 72
const CANVAS_WIDTH_INCHES = 6.5
const CANVAS_HEIGHT_INCHES = 9
const DEFAULT_LINE_SPACING = 8
const DEFAULT_GROUP_SPACING = 64
const DEFAULT_INTRAGROUP_SPACING = 36

function render() {
  const canvas = canvasElement()
  canvas.width = CANVAS_WIDTH_INCHES * CANVAS_DPI
  canvas.height = CANVAS_HEIGHT_INCHES * CANVAS_DPI
  const context = canvas.getContext('2d')
  context.scale(CANVAS_DPI / CANVAS_SCALED_DPI, CANVAS_DPI / CANVAS_SCALED_DPI,)
  context.clearRect(0, 0, canvas.width, canvas.height)

  context.lineWidth = 1
  context.strokeStyle = 'black'

  let y = 1
  while (y < canvas.height) {
    if (lineStyle() === 'staff') {
      y = drawStaff(context, y, lineSpacing())
      y += groupSpacing()
    } else if (lineStyle() === 'double-staff') {
      y = drawStaff(context, y, lineSpacing())
      y += intragroupSpacing()
      y = drawStaff(context, y, lineSpacing())
      y += groupSpacing()
    } else if (lineStyle() === 'tab') {
      y = drawTabLines(context, y, lineSpacing())
      y += groupSpacing()
    } else if (lineStyle() === 'staff-and-tab') {
      y = drawStaff(context, y, lineSpacing())
      y += intragroupSpacing()
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

function intragroupSpacingLabelElement() {
  return document.querySelector('#intragroup-spacing-label')
}

function intragroupSpacingInputElement() {
  return document.querySelector('#intragroup-spacing-input')
}

function intragroupSpacing() {
  return parseInt(intragroupSpacingInputElement().value)
}

function setIntragroupSpacing(spacing) {
  intragroupSpacingInputElement().value = spacing
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
  setLineSpacing(window.localStorage.getItem(`${STORAGE_KEY_BASE}-${lineStyle()}-line-spacing`) ?? DEFAULT_LINE_SPACING)
  setIntragroupSpacing(window.localStorage.getItem(`${STORAGE_KEY_BASE}-${lineStyle()}-intragroup-spacing`) ?? DEFAULT_INTRAGROUP_SPACING)
  setGroupSpacing(window.localStorage.getItem(`${STORAGE_KEY_BASE}-${lineStyle()}-group-spacing`) ?? DEFAULT_GROUP_SPACING)
}

function saveToLocalStorage() {
  window.localStorage.setItem(`${STORAGE_KEY_BASE}-line-style`, lineStyle())
  window.localStorage.setItem(`${STORAGE_KEY_BASE}-${lineStyle()}-line-spacing`, lineSpacing())
  window.localStorage.setItem(`${STORAGE_KEY_BASE}-${lineStyle()}-intragroup-spacing`, intragroupSpacing())
  window.localStorage.setItem(`${STORAGE_KEY_BASE}-${lineStyle()}-group-spacing`, groupSpacing())
}

function handleInput() {
  saveToLocalStorage()
  render()
}

function handleStyleChange() {
  if (lineStyle() === 'staff-and-tab' || lineStyle() === 'double-staff') {
    intragroupSpacingLabelElement().classList.remove('hidden')
  } else {
    intragroupSpacingLabelElement().classList.add('hidden')
  }
  setLineSpacing(window.localStorage.getItem(`${STORAGE_KEY_BASE}-${lineStyle()}-line-spacing`) ?? DEFAULT_LINE_SPACING)
  setIntragroupSpacing(window.localStorage.getItem(`${STORAGE_KEY_BASE}-${lineStyle()}-intragroup-spacing`) ?? DEFAULT_INTRAGROUP_SPACING)
  setGroupSpacing(window.localStorage.getItem(`${STORAGE_KEY_BASE}-${lineStyle()}-group-spacing`) ?? DEFAULT_GROUP_SPACING)
  saveToLocalStorage()
  render()
}

window.addEventListener('load', () => {
  hydrateControls()
  render()
  window.addEventListener('resize', render)
  selectElement().addEventListener('input', handleStyleChange)
  lineSpacingInputElement().addEventListener('input', handleInput)
  intragroupSpacingInputElement().addEventListener('input', handleInput)
  groupSpacingInputElement().addEventListener('input', handleInput)
})
