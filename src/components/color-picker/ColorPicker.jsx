import React, { useState } from 'react';
import Saturation from "./saturation/Saturation";
import './ColorPicker.css';
import { hexToRgb, rgbNumbers, rgbToHex } from "../../utils/colorPicker";

const ColorPicker = (props) => {
    const [color, setColor] = useState('rgb(0,0,0)');
    const [hex, setHex] = useState('000000');
    const [opacity, setOpacity] = useState('100');

    const handleColorSelection = (picked) => {
        setColor(picked);
        setHex(rgbToHex(rgbNumbers(picked)));
        props.handleColorChange(picked.substring(0, picked.length - 1) + `,${opacity / 100})`);
    };

    const handleHexChange = (e) => {
        const value = e.target.value.trim();
        setHex(value);
        props.handleColorChange(hexToRgb(value).substring(0, color.length - 1) + `,${opacity / 100})`);
    };

    const handleOpacityChange = (e) => {
        const value = e.target.value.trim();
        setOpacity(value);
        if (color) {
            props.handleColorChange(color.substring(0, color.length - 1) + `,${value / 100})`)
        }
    };

    return (
        <div className='picker-container'>
            <Saturation onColorSelect={handleColorSelection}/>
            <div className='inputs'>
                <div>
                    <label htmlFor='hex'>HEX: </label>
                    <input name='hex' id='hex' value={hex} onChange={handleHexChange}/>
                </div>
                <div>
                    <label htmlFor='hex'>Opacity: </label>
                    <input name='opacity' id='opacity' type='number' value={opacity}
                           min={1} max={100} onChange={handleOpacityChange}/>
                    <span>%</span>
                </div>
            </div>
        </div>
    );
};

export default ColorPicker;
