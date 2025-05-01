import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

import { SqlInput } from './components/SqlInput';
import { SqlTable } from './components/SqlTable';
import { DataVisualizer } from './components/DataVisualizer';

function App() {
  const [sql, setSql] = useState('SELECT * FROM users;');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRun = async () => {
    setError(null);
    setResult(null);

    try {
      const res = await axios.post('http://localhost:3001/query', { sql });
      setResult(res.data.result);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Unknown error');
    }

  };

  return (
  <div className="App" style={{ padding: '2rem', fontFamily: 'sans-serif' }}>

    <div>
      
      <SqlInput setSql={setSql} sql={sql} handleRun={handleRun}></SqlInput>

      {error && (
        <pre style={{ color: 'red', marginTop: '1rem' }}>{error}</pre>
      )}
      {result && (
        <div style={{ marginTop: '1rem' }}>{
          <SqlTable data={result}></SqlTable>
        }</div>
      )}
    </div>

    <DataVisualizer></DataVisualizer>

  </div>
  );
}

export default App;
