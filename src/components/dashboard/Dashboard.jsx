import React, { useState } from 'react';
import CanvasEditor from "../canvas-editor/CanvasEditor";
import Statistics from "../statistics/Statistics";
import './Dashboard.css';

const Dashboard = () => {
    const [show, setShow] = useState('draw');

    const handleShowChange = (e) => {
        setShow(e);
    };

    const style = { textDecoration: 'underline' };

    return (<div className='dashboard'>
        <nav className='nav-bar'>
            <div style={show === 'draw' ? style : {}} id='draw' onClick={() => handleShowChange('draw')}>Draw</div>
            <div style={show === 'statistics' ? style : {}} id='statistics'
                 onClick={() => handleShowChange('statistics')}>Statistics
            </div>
        </nav>
        <div>
            {show === 'statistics' ? <Statistics/> : <CanvasEditor/>}
        </div>
    </div>);
};

export default Dashboard;
