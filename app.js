// Select DOM
const box = document.querySelector(".box")
const inputs = [...document.querySelectorAll("input")]

const shadowCode = document.querySelector(".shadow-code")
const boxCode = document.querySelector(".box-code")

const copyShadowCode = document.querySelector(".copy-shadow-code")
const copyBoxCode = document.querySelector(".copy-box-code")

// display code on load
window.addEventListener("DOMContentLoaded", renderBox)

// get elements value by id
function getValue(selection) {
  const element = document.getElementById(selection).value
  if (element) {
    return element
  }

  throw new Error(`your selection "${selection}" does not exist`)
}

// input event listener
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    renderBox()
  })
})

// Render Box
function renderBox() {
  // Customize Shadow
  const hOffset = getValue("h-offset")
  const vOffset = getValue("v-offset")
  const blurRadius = getValue("blur-radius")
  const spreadRadius = getValue("spread-radius")
  const shadowColorOpacity = getValue("opacity")
  const inset = document.getElementById("inset").checked
  let color = getValue("color")

  color = hexToRgba(color, shadowColorOpacity)

  let boxShadow = `${hOffset}px ${vOffset}px ${blurRadius}px ${spreadRadius}px ${color}`
  if (inset) {
    boxShadow = `inset ${hOffset}px ${vOffset}px ${blurRadius}px ${spreadRadius}px ${color}`
  }

  box.style.boxShadow = boxShadow
  shadowCode.textContent = `box-shadow: ${boxShadow};`

  //Adjust Box
  const bgColor = getValue("bg-color")
  const width = getValue("width")
  const height = getValue("height")
  const borderRadius = getValue("border-radius")

  box.style.background = bgColor
  box.style.width = `${width}em`
  box.style.height = `${height}em`
  box.style.borderRadius = `${borderRadius}em`

  boxCode.textContent = `.box{
    background-color: ${bgColor};
    width: ${width}em;
    height: ${height}em;
    border-radius: ${borderRadius}em;
  }`
}

// convert from hex to rgba
function hexToRgba(color, shadowColorOpacity) {
  let r = parseInt(color.substr(1, 2), 16)
  let g = parseInt(color.substr(3, 2), 16)
  let b = parseInt(color.substr(5, 2), 16)
  return `rgba(${r}, ${g}, ${b}, ${shadowColorOpacity})`
}

// Copy code
function copy(btn) {
    btn.addEventListener("click", () => {
    const code = btn.previousElementSibling.value
    navigator.clipboard.writeText(code)
    alert("code copied to your clipboard")
  })
}
copy(copyShadowCode)
copy(copyBoxCode)
