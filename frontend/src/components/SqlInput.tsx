export function SqlInput(props: any) {
  const { setSql, sql, handleRun } = props;

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

    <button onClick={handleRun}>執行 SQL</button>
  </>
  )
}