import './App.css';
import React from 'react';
import { useState, useRef, useEffect } from 'react';

function App() {
  const playIcon =
    (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
    </svg>)
  const pauseIcon =
    (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pause-fill" viewBox="0 0 16 16">
        <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
      </svg>
    )
  const [numInput, setNumInput] = useState(1)
  const [buttonValue, setButtonValue] = useState("START")
  const [buttonColor, setButtonColor] = useState("success")
  const [buttonIcon, setButtonIcon] = useState(playIcon)
  const intervalController = useRef(null)
  const canvasRef = useRef(null)


  const handleNumberInputChange = (e) => {
    let input = e.target.value
    setNumInput(input)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (numInput && numInput > 0) {
      if (buttonValue === "START") {
        intervalController.current = setInterval(() => draw(numInput), 10)
        setButtonValue("PAUSE")
        setButtonColor("primary")
        setButtonIcon(pauseIcon)
      }
      else {
        clearInterval(intervalController.current)
        setButtonValue("START")
        setButtonColor("success")
        setButtonIcon(playIcon)
      }

    }
  }

  //generate a random number between 0 and 255
  const randomNumber = () => {
    return Math.floor(Math.random() * 256)
  }

  //convert number to hex string
  const hexConverter = (number) => {
    const hex = number.toString(16)
    return hex.length === 1 ? "0" + hex : hex
  }

  const rgbToHex = () => {
    const r = randomNumber()
    const g = randomNumber()
    const b = randomNumber()
    return `#${hexConverter(r)}${hexConverter(g)}${hexConverter(b)}`
  }

  const draw = (num) => {
    for (let row = 0; row < num; row++) {
      for (let col = 0; col < num; col++) {
        let hexValue = rgbToHex()
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        context.fillStyle = hexValue
        context.fillRect((col * context.canvas.width / num), row * context.canvas.height / num, context.canvas.width / num, context.canvas.height / num)
      }
    }
  }


  return (
    <>
      <div>
        <div className="container-fluid mt-3">
          <canvas ref={canvasRef} width={window.innerWidth - 30} height={window.innerHeight - 200} style={{ "border": "1px solid" }} />
        </div>
        <div className="col-4 offset-4">
          <form>
            <label className="form-label" style={{ fontSize: "25px" }}>Enter the number of squares:</label>
            <input className="form-control" type="text" name="q" onChange={handleNumberInputChange} style={{ height: "50px", fontSize: "25px"}}/>
            <button className={`btn btn-${buttonColor} mt-2`} type="submit" onClick={handleSubmit}><span className='align-content-center'>{buttonIcon}</span><span>{buttonValue}</span></button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
