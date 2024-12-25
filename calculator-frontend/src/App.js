import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Add styles and animations here

function App() {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [operation, setOperation] = useState('add');
    const [result, setResult] = useState(null);

    const handleCalculation = async () => {
        try {
            const response = await axios.post('http://localhost:3001/calculate', {
                num1: parseFloat(num1),
                num2: parseFloat(num2),
                operation,
            });
            setResult(response.data.result);
        } catch (error) {
            alert(error.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div className="container">
            <h1 className="header">Basic Calculator</h1>
            <div className="card">
                <input
                    type="number"
                    value={num1}
                    onChange={(e) => setNum1(e.target.value)}
                    placeholder="Enter first number"
                    className="input"
                />
                <input
                    type="number"
                    value={num2}
                    onChange={(e) => setNum2(e.target.value)}
                    placeholder="Enter second number"
                    className="input"
                />
                <select
                    value={operation}
                    onChange={(e) => setOperation(e.target.value)}
                    className="select"
                >
                    <option value="add">Addition</option>
                    <option value="subtract">Subtraction</option>
                    <option value="multiply">Multiplication</option>
                    <option value="divide">Division</option>
                </select>
                <button onClick={handleCalculation} className="button">
                    Calculate
                </button>
                {result !== null && (
                    <div className="result">
                        <h2>Result: {result}</h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
