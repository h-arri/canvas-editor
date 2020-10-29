import React, { useEffect, useState } from 'react';
import './Statistics.css';

const Statistics = () => {
    const [statistics, setStatistics] = useState([]);

    useEffect(() => {
        const entries = [];
        for (let i = 0; i < localStorage.length; i++) {
            const data = {
                color: '',
                count: 0
            };
            if (localStorage.key(i).includes('rgb(')) {
                data.color = localStorage.key(i);
                data.count = localStorage.getItem(localStorage.key(i));
                entries.push(data);
            }
        }
        setStatistics(entries);
    }, []);

    return <div>
        <h2>My Drawings</h2>
        <article>
            {statistics.map(entry => {
                return <div key={entry.color}>
                    <span style={{ color: entry.color }}>{entry.color}</span>
                    <span>{entry.count} object(s)</span>
                </div>
            })}
        </article>
    </div>
};

export default Statistics;
