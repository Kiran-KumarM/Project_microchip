import React,{useState} from 'react'
import './ScribblePad.css'
import useDraw from './useDraw'

const ScribblePad = () => {
let [lineColor,setLineColor]=useState('#000')

let {canvasRef,onMouseDown, clear}=useDraw(drawLine);
console.log(canvasRef)


function drawLine({prevPoint,currentPoint,ctx}){

  const lineWidth=5;
  let startPoint = prevPoint ?? currentPoint
  ctx.beginPath()
  ctx.lineWidth = lineWidth
  ctx.strokeStyle = lineColor
  ctx.moveTo(startPoint.x, startPoint.y)
  ctx.lineTo(currentPoint.x, currentPoint.y)
  ctx.stroke()

  // ctx.fillStyle = lineColor
  // ctx.beginPath()
  // ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI)
  // ctx.fill()

}

function colorhand(e){
  console.log(e)
}
  return (
    <div className="canvas">
      <div>
      <input type="color" onChange={(e)=> setLineColor(e.target.value)}></input>
      <button type="button" onClick={clear}> Clear</button>

      </div>
    <canvas className="canvas-sketch"
       ref={canvasRef}
       onMouseDown={onMouseDown}
        width={750}
        height={550} />
  </div>
  )
}

export default ScribblePad;