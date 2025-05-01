import { SqlTable } from './SqlTable';

import './DataVisualizer.css'

export function DataVisualizer(props: any) {
  const { handleRun } = props;

  const queryCustomer = 'SELECT * FROM Customers LIMIT 5';
  const queryCategories = 'SELECT * FROM Categories LIMIT 5';
  const queryOrder = 'SELECT * FROM Orders LIMIT 5';

  return(
  <>
    Visualizer
  </>
  )
}