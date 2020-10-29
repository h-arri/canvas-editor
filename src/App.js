import React from 'react';
import './App.css';
import Dashboard from "./components/dashboard/Dashboard";

const App = () => {
    return (
        <div className="app">
            <header className="app-header">
                <h1>Canvas Editor</h1>
            </header>
            <Dashboard/>
        </div>
    );
};

export default App;
