import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import { SqlInput } from './components/SqlInput';
import { SqlTable } from './components/SqlTable';
import { DataType } from './components/DataType';
import { DataVisualizer } from './components/DataVisualizer';

function App() {
  const [result, setResult] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hide, setHide] = useState<boolean>(false);

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

  const [isSmall, setIsSmall] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 1024 : false
  );

  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
  
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setIsSmall(window.innerWidth <= 1024);
      }, 150);
    };
  
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
    
  }, []);

  return (
  <div className="App">
    <div className="grid-container">

      <div className="data-type">
        {hide ?
          <div>
            <button className="expand-btn" onClick={() => setHide(false)}>&lt;</button>
          </div>
          :
          <div>
            <button className="expand-btn" onClick={() => setHide(true)}>&gt;</button>
          </div>
        }

        {hide &&
          <DataType></DataType>
        }
      </div>

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

      { !isSmall &&
        <div className="visualizer">
          <DataVisualizer></DataVisualizer>
        </div>      
      }

    </div>
  </div>
  );
}

export default App;
