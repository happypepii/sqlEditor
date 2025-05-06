import './SqlTable.css';

interface TableProps {
  data?: Array<{ [key: string]: any }> | null;
}

export function SqlTable(props: TableProps) {
  const { data } = props;

  if (!data) {
    return <p>Loading table...</p>;
  }

  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <table>
      <thead>
        
        <tr>
          {columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
        
      </thead>
      <tbody>

        {data.map((item, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col) => (
              <td key={col}>
                {typeof item[col] === 'string' && item[col].startsWith('data:image')
                ? <img src={item[col]} alt="image" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                : typeof item[col] === 'object' && item[col] !== null
                ? JSON.stringify(item[col])
                : item[col]}
              </td>
            ))}
          </tr>
        ))}

      </tbody>
    </table>
  );
}
