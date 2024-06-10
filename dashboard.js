import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard({ token }) {
    const [records, setRecords] = useState([]);
    const [id, setId] = useState('');
    const [owner, setOwner] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await axios.get('http://localhost:3000/records', { headers: { Authorization: token } });
                setRecords(JSON.parse(response.data));
            } catch (error) {
                console.error('Failed to fetch records', error);
            }
        };
        fetchRecords();
    }, [token]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:3000/records', { id, owner, content }, { headers: { Authorization: token } });
            setRecords([...records, { id, owner, content }]);
        } catch (error) {
            console.error('Failed to create record', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID: </label>
                    <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
                </div>
                <div>
                    <label>Owner: </label>
                    <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} />
                </div>
                <div>
                    <label>Content: </label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <button type="submit">Create Record</button>
            </form>
            <ul>
                {records.map((record) => (
                    <li key={record.Key}>
                        <strong>{record.Record.id}</strong>: {record.Record.content} (Owner: {record.Record.owner})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;
