import React, { useEffect, useRef, useState } from 'react';
import './CanvasEditor.css';
import ColorPicker from "../color-picker/ColorPicker";
import Pencil from "../../utils/pencil";
import Tools from "../tools/Tools";

const CanvasEditor = () => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [color, setColor] = useState('black');
    const [tool, setTool] = useState(null);

    useEffect(() => {
        const context = canvasRef.current.getContext('2d');
        contextRef.current = context;
        setTool(Pencil(context));
    }, []);

    const getCursorPosition = (e) => {
        const { top, left } = canvasRef.current.getBoundingClientRect();
        return [
            e.clientX - left,
            e.clientY - top
        ];
    };

    const onMouseDown = (e) => {
        tool.onMouseDown(...getCursorPosition(e), color)
    };

    const onMouseMove = (e) => {
        tool.onMouseMove(...getCursorPosition(e));
    };

    const onMouseUp = (e) => {
        tool.onMouseUp(...getCursorPosition(e));
        updateStatistics();
    };

    const handleColorChange = (pickedColor) => {
        setColor(pickedColor);
    };

    const importDrawing = () => {
        document.getElementById('import').click();
    };

    const exportDrawing = () => {
        const data = contextRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
        const a = document.createElement("a");
        const file = new Blob([JSON.stringify(data)], { type: 'application/json' });
        a.href = URL.createObjectURL(file);
        a.download = `my-drawing-${Date.now()}`;
        a.click();
    };

    // storing the object counts based on the color in the localStorage to be used later in the Statistics component
    const updateStatistics = () => {
        let myDrawings = localStorage.getItem(color);
        myDrawings = myDrawings ? +myDrawings + 1 : 1;
        localStorage.setItem(color, myDrawings.toString());
    };

    return <div className='container'>
        <Tools handleImport={importDrawing} handleExport={exportDrawing}/>
        <canvas id='canvas' ref={canvasRef} className='canvas'
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp} onMouseMove={onMouseMove} width={800}
                height={800}/>
        <ColorPicker handleColorChange={handleColorChange}/>
    </div>
};

export default CanvasEditor;
