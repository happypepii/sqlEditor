import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

import { SqlInput } from './components/SqlInput';
import { SqlTable } from './components/SqlTable';
import { DataVisualizer } from './components/DataVisualizer';

function App() {
  const [result, setResult] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleRun = async (sql:string) => {
    setError(null);
    setResult([]);

    try {
      const res = await axios.post('http://localhost:3001/query', { sql });
      setResult(res.data.result);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Unknown error');
    }

  };

  return (
  <div className="App" style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
    <div className="grid-container">

      <div className="sql-input">   
        <SqlInput handleRun={handleRun}></SqlInput>
      </div>

      <div className="table-container">

        {error && (
            <pre style={{ color: 'red', marginTop: '1rem' }}>{error}</pre>   
        )}
        {result && (
          <SqlTable data={result}></SqlTable>
        )}

      </div>

      <div className="visualizer">
        <DataVisualizer></DataVisualizer>
      </div>

    </div>
  </div>
  );
}

export default App;
