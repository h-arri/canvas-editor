import React from 'react';
import Pencil from "./pencil/Pencil";
import './Tools.css';

const Tools = (props) => {

    return <div className='tools'>
        <Pencil/>
        <input id='import' type='file' hidden/>
        <button onClick={props.handleImport}>Import</button>
        <button onClick={props.handleExport}>Export</button>
    </div>
};

export default Tools;
