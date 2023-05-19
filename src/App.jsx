import './App.css';
import React, { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ColorTrackerComponent from './components/ColorTrackerComponent';
import { rgbToHex } from './utils';

export default function App() {
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
  const [numInput, setNumInput] = useState(1);
  const [buttonValue, setButtonValue] = useState("START");
  const [buttonColor, setButtonColor] = useState("success");
  const [buttonIcon, setButtonIcon] = useState(playIcon);
  const [speed, setSpeed] = useState(500);
  const [colorTrackerEl, setColorTrackerEl] = useState([]);
  const intervalController = useRef(null);
  const canvasRef = useRef(null);
  const currentBadge = useRef(null);
  const colorStruct = {};

  /**
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - Event representing user input
   */
  const handleNumberInputChange = (e) => {
    const input = Number(e.target.value);
    setNumInput(input);
  }

  /**
   * 
   * @param {React.MouseEvent<HTMLButtonElement>} event - The event object representing a mouse event on the submit button
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (numInput && numInput > 0) {
      if (buttonValue === "START") {
        intervalController.current = setInterval(() => draw(numInput), speed);
        setButtonValue("PAUSE");
        setButtonColor("primary");
        setButtonIcon(pauseIcon);
      }
      else {
        clearInterval(intervalController.current);
        setButtonValue("START");
        setButtonColor("success");
        setButtonIcon(playIcon);
      }
    }
  }

  /**
   * 
   * @param {number} num 
   */
  const draw = (num) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < num; row++) {
      for (let col = 0; col < num; col++) {
        const hexValue = rgbToHex();
        if (colorStruct[hexValue]) {
          colorStruct[hexValue] += 1;
          if (colorStruct[hexValue] === 2) {
            setColorTrackerEl(prev => {
              return [...prev, <ColorTrackerComponent label={hexValue} value={2} trackRef={currentBadge} key={hexValue}/>]
            })
            //tempArr.push(<ColorTrackerComponent label={hexValue} value={2} />)
          }
          else {
            const el = document.getElementById(`${hexValue}-badge`);
            const val = colorStruct[hexValue];
            if (!el) {
              console.log("DOESNT EXIST", hexValue, val);
              console.log(currentBadge.current.id);
            } else el.innerHTML = val.toString();
          }
        }
        else {
          colorStruct[hexValue] = 1;
        }
        context.fillStyle = hexValue;
        context.fillRect((col * context.canvas.width / num), row * context.canvas.height / num, context.canvas.width / num, context.canvas.height / num);
      }
    }
    /*
    setColorTrackerEl(prev => {
      return [...prev, ...tempArr]
    })
    */
  }

  const handleSpeed = (ev) => {
    const value = ev.target.value;
    setSpeed((10000 / (value + 1)))
  }

  const handleClearCanvas = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  const handleClearTracker = () => {
    setColorTrackerEl([])
  }

  return (
    <>
      <div className="d-flex justify-content-center">
        <button className={`btn btn-${buttonColor} mt-2 mx-3`} type="submit" onClick={handleSubmit}><span className='align-content-center'>{buttonIcon}</span><span>{buttonValue}</span></button>
        <button className={`btn btn-outline-secondary mt-2 mx-3`} type="submit" onClick={handleClearCanvas}><span className='align-content-center'></span><span>Clear Canvas</span></button>
        <button className={`btn btn-outline-secondary mt-2 mx-3`} type="submit" onClick={handleClearTracker}><span className='align-content-center'></span><span>Clear Tracker</span></button>
      </div>
      <Tabs
        defaultActiveKey="canvas"
        id="tabs"
        className="mb-3"
      >
        {/* first tab */}
        <Tab eventKey="canvas" title="Canvas" tabClassName="fs-4" >
          <div className="container-fluid mt-3">
            <canvas ref={canvasRef} width={window.innerWidth - 40} height={window.innerHeight - 300} style={{ "border": "2px solid", borderRadius: "5px" }} />
          </div>
          <div className="col-4 offset-4 mt-3">
            <form>
              <label className="form-label" style={{ fontSize: "25px" }}>Enter the number of squares:</label>
              <input className="form-control" type="text" name="q" onChange={handleNumberInputChange} style={{ height: "50px", fontSize: "25px" }} />
              <div className="mt-3">
                <label htmlFor="speed" className="form-label fs-4">Speed</label>
                <div className="d-flex">
                  <span>Slow</span>
                  <Form.Range onChange={handleSpeed} />
                  <span>Fast</span>
                </div>
              </div>
            </form>
          </div>
        </Tab>

        {/* second tab */}
        <Tab eventKey="tracker" title="Color Tracker" tabClassName="fs-4" >
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-5">Colors and Their Amounts</h4>
              <div className='container-fluid'>
                <div className='row row-cols-6 g-4 justify-content-center align-content-center'>
                  {colorTrackerEl}
                </div>
              </div>
            </div>
          </div>
        </Tab>
      </Tabs >
      <div className="d-flex justify-content-center">
        <button className={`btn btn-${buttonColor} mt-2`} type="submit" onClick={handleSubmit}><span className='align-content-center'>{buttonIcon}</span><span>{buttonValue}</span></button>
        <button className={`btn btn-outline-secondary mt-2 mx-3`} type="submit" onClick={handleClearCanvas}><span className='align-content-center'></span><span>Clear Canvas</span></button>
        <button className={`btn btn-outline-secondary mt-2 mx-3`} type="submit" onClick={handleClearTracker}><span className='align-content-center'></span><span>Clear Tracker</span></button>
      </div>
    </>
  );
}

/**
 * Generates a memoized function for getting the color of a cell.
 *
 * @returns {Function} A memoized function that returns the color of a cell.
 */

/*
export const rgbToHex = useMemo(() => {
  return () => {
      const r = randomNumber()
      const g = randomNumber()
      const b = randomNumber()
      return `#${hexConverter(r)}${hexConverter(g)}${hexConverter(b)}`
  };
}, []);
*/

/**
* Generates a memoized function for getting the color of a cell.
*
* @returns {Function} A memoized function that returns the color of a cell.
*/
/*
    const getCellColor = useMemo(() => {
      return rgbToHex();
    }, []);

*/