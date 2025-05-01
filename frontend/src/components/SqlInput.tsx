import { useState } from "react";

export function SqlInput(props: any) {
  const [sql, setSql] = useState('SELECT * FROM Customers;');
  const { handleRun } = props;

  return(
  <>
    <h1>SQL 練習工具</h1>

    <textarea
      value={sql}
      onChange={(e) => setSql(e.target.value)}
      rows={6}
      cols={60}
      style={{ fontFamily: 'monospace', fontSize: '1rem' }}
    />
    <br />

    <div className="btn-input">
      <button onClick={() => handleRun(sql)}>執行 SQL</button>
    </div>
  </>
  )
}