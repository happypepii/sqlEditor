import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

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
      <h1>SQL 練習工具</h1>
      <textarea
        value={sql}
        onChange={(e) => setSql(e.target.value)}
        rows={6}
        cols={60}
        style={{ fontFamily: 'monospace', fontSize: '1rem' }}
      />
      <br />
      <button onClick={handleRun}>執行 SQL</button>

      {error && (
        <pre style={{ color: 'red', marginTop: '1rem' }}>{error}</pre>
      )}
      {result && (
        <pre style={{ marginTop: '1rem' }}>{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}

export default App;
