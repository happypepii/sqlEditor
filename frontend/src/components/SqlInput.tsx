import { useState } from "react";

export function SqlInput(props: any) {
  const [sql, setSql] = useState('SELECT * FROM Customers;');
  const { handleRun } = props;
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault(); // prevent newline
      handleRun(sql);
    }
  };

  return(
  <>
    <h1>SQL Editor</h1>

    <textarea
      value={sql}
      onChange={(e) => setSql(e.target.value)}
      onKeyDown={handleKeyDown}
      rows={6}
      cols={60}
      style={{ fontFamily: 'monospace', fontSize: '1rem' }}
    />
    <br />

    <div className="btn-input">
      <button onClick={() => handleRun(sql)}>Run SQL</button>
    </div>
  </>
  )
}