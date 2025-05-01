import './SqlTable.css';

interface TableProps {
  data: Array<{ [key: string]: any }>;
}

export function SqlTable(props: TableProps) {
  const { data } = props;

  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  console.log("Table data:", data);

  return (
  <>
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
            <td key={col}>{item[col]}</td>
          ))}
        </tr>
      ))}

    </tbody>
  </table>
  </>
  );
}