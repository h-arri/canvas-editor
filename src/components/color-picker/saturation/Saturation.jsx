import React, { useEffect, useRef, useState } from 'react';
import './Saturation.css';

const BLOCK_WIDTH = 150;
const BLOCK_HEIGHT = 150;
const STRIP_WIDTH = 20;
const STRIP_HEIGHT = 150;

const Saturation = (props) => {
    const { onColorSelect } = props;

    let drag = false;
    let rgbColor = 'rgb(0,0,0)';

    const [color, setColor] = useState('');
    const blockRef = useRef(null);
    const stripRef = useRef(null);

    const stripFill = () => {
        stripRef.current.rect(0, 0, STRIP_WIDTH, STRIP_HEIGHT);
        const grd1 = stripRef.current.createLinearGradient(0, 0, 0, STRIP_HEIGHT);
        grd1.addColorStop(0, 'rgb(255, 0, 0)'); // red
        grd1.addColorStop(0.17, 'rgb(255, 255, 0)'); // yellow
        grd1.addColorStop(0.34, 'rgb(0, 255, 0)'); // green
        grd1.addColorStop(0.51, 'rgb(0, 255, 255)'); // aqua
        grd1.addColorStop(0.68, 'rgb(0, 0, 255)'); // blue
        grd1.addColorStop(0.85, 'rgb(255, 0, 255)'); // magenta
        grd1.addColorStop(1, 'rgb(255, 0, 0)'); // red
        stripRef.current.fillStyle = grd1;
        stripRef.current.fill();
    };

    const gradientBlock = () => {
        blockRef.current.fillStyle = rgbColor;
        blockRef.current.fillRect(0, 0, BLOCK_WIDTH, BLOCK_HEIGHT);
        const grdWhite = blockRef.current.createLinearGradient(0, 0, BLOCK_WIDTH, 0);
        grdWhite.addColorStop(0, 'rgb(255,255,255)');
        grdWhite.addColorStop(1, 'transparent');
        blockRef.current.fillStyle = grdWhite;
        blockRef.current.fillRect(0, 0, BLOCK_WIDTH, BLOCK_HEIGHT);
        const grdBlack = blockRef.current.createLinearGradient(0, 0, 0, BLOCK_HEIGHT);
        grdBlack.addColorStop(0, 'transparent');
        grdBlack.addColorStop(1, 'rgb(0,0,0)');
        blockRef.current.fillStyle = grdBlack;
        blockRef.current.fillRect(0, 0, BLOCK_WIDTH, BLOCK_HEIGHT);
    };

    const blockFill = () => {
        blockRef.current.rect(0, 0, BLOCK_WIDTH, BLOCK_HEIGHT);
        gradientBlock();
    };

    const selectColor = (ctx, e) => {
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;
        const imageData = ctx.getImageData(x, y, 1, 1).data;
        rgbColor = 'rgb(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ')';
        setColor(rgbColor);
        onColorSelect(rgbColor);
    };

    const clickStrip = (e) => {
        selectColor(stripRef.current, e, this);
        gradientBlock();
    };

    const onMouseDown = (e) => {
        drag = true;
        selectColor(blockRef.current, e, this);
    };

    const onMouseMove = (e) => {
        if (drag) {
            selectColor(blockRef.current, e, this);
        }
    };

    const onMouseUp = () => {
        drag = false;
    };

    useEffect(() => {
        const blockContext = blockRef.current.getContext('2d');
        blockRef.current = blockContext;
        blockFill(blockContext);
        const stripContext = stripRef.current.getContext('2d');
        stripRef.current = stripContext;
        stripFill(stripContext);
    }, []);

    return (
        <div id="color-picker">
            <canvas id="color-block"
                    height={BLOCK_HEIGHT}
                    width={BLOCK_WIDTH}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    ref={blockRef}/>
            <canvas id="color-strip"
                    height={STRIP_HEIGHT}
                    width={STRIP_WIDTH}
                    onClick={clickStrip}
                    ref={stripRef}/>
        </div>
    );
};

export default Saturation;
