import { useEffect, useState } from 'react';
import axios from 'axios';

import './DataType.css'

type Column = {
  name: string;
  type: string;
};

type TableSchema = {
  table: string;
  columns: Column[];
};

const TABLE_NAMES = ['Customers', 'Categories', 'Orders', 'OrderDetails', 'Products'];

export function DataType() {
  const [schemas, setSchemas] = useState<TableSchema[]>([]);

  useEffect(() => {
    const fetchSchemas = async () => {
      try {
        const responses = await Promise.all(
          TABLE_NAMES.map((table) =>
            axios.get(`http://localhost:3001/table-info/${table}`)
          )
        );

        const schemaData: TableSchema[] = responses.map((res) => res.data);
        setSchemas(schemaData);
      } catch (err) {
        console.error('Error fetching table schemas:', err);
      }
    };

    fetchSchemas();
  }, []);

  return(
  <>
    {schemas.map((schema) => (
      <div className="table-info" key={schema.table}>
        
        <h3>{schema.table}</h3>
        <ul className="table-info-content">
          {schema.columns.map((col) => (
            <li key={col.name}>
              <div>{col.name}</div>
              <div className="column-type">[{col.type.toLowerCase()}]</div>
            </li>
          ))}
        </ul>

      </div>
    ))}
  </>
  )
}
