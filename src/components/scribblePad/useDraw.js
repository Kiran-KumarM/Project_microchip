import React, {useEffect,useRef ,useState}from 'react'

const useDraw = (onDraw) => {
    const [mouseDown, setMouseDown] = useState(false)

    const canvasRef =useRef(null);
    const prevPoint = useRef(null)

    const onMouseDown = () => setMouseDown(true)

    const clear = () => {
        const canvas = canvasRef.current
        if (!canvas) return
    
        const ctx = canvas.getContext('2d')
        if (!ctx) return
    
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }

    useEffect(()=>{
        function handler(e){
            if(!mouseDown) return;
            console.log(e.clientX, e.clientY)
            const currentPoint =computeCanvasPoint(e);
            console.log(currentPoint)

            const ctx = canvasRef.current?.getContext('2d')
            if (!ctx || !currentPoint) return
      
            onDraw({ ctx, currentPoint, prevPoint: prevPoint.current })
            prevPoint.current = currentPoint
        }


        let computeCanvasPoint =(e)=>{
            if (!canvasRef.current) return

            const rect = canvasRef.current.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
      
            return { x, y }
        }

        const mouseUpHandler = () => {
            setMouseDown(false)
            prevPoint.current = null
          }

        canvasRef.current?.addEventListener('mousemove',handler);
        window.addEventListener('mouseup', mouseUpHandler)

          // Remove event listeners
    return () => {
        canvasRef.current?.removeEventListener('mousemove', handler)
        window.removeEventListener('mouseup', mouseUpHandler)
      }
    },[onDraw])
  return {canvasRef,onMouseDown, clear}
}

export default useDraw