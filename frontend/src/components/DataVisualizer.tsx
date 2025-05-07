import { useState, useEffect } from 'react';
import axios from 'axios';

import { SqlTable } from './SqlTable';

import './DataVisualizer.css'

export function DataVisualizer() {
  const [customersData, setCustomersData] = useState<any[]>([]);
  const [categoriesData, setCategoriesData] = useState<any[]>([]);
  const [ordersData, setOrdersData] = useState<any[]>([]);
  const [orderDetailsData, setOrderDetailsData] = useState<any[]>([]);
  const [ProductsData, setProductsData] = useState<any[]>([]);

  useEffect(() => {
    const fetchAllTables = async () => {
      try {

        const [customersRes, categoriesRes, ordersRes, orderDetailsRes, ProductsRes] = await Promise.all([
          axios.post('http://localhost:3001/query', { sql: 'SELECT * FROM Customers LIMIT 3' }),
          axios.post('http://localhost:3001/categories', { sql: 'SELECT * FROM Categories LIMIT 3' }),
          axios.post('http://localhost:3001/query', { sql: 'SELECT * FROM Orders LIMIT 3' }),
          axios.post('http://localhost:3001/query', { sql: 'SELECT * FROM OrderDetails LIMIT 3' }),
          axios.post('http://localhost:3001/query', { sql: 'SELECT * FROM Products LIMIT 3' }),
        ]);

        setCustomersData(customersRes.data.result);
        setCategoriesData(categoriesRes.data.result);
        setOrdersData(ordersRes.data.result);
        setOrderDetailsData(orderDetailsRes.data.result);
        setProductsData(ProductsRes.data.result);

      } catch (err) {
        console.error('Error fetching preview tables:', err);
      }
    };

  fetchAllTables();
  }, []);

  return(
  <>
    <div>
      <h3 className="table-title">Customers</h3>
      <SqlTable data={customersData}></SqlTable>
    </div>

    <div>
      <h3 className="table-title">Categories</h3> main
      <SqlTable data={categoriesData}></SqlTable>
    </div>

    <div>
      <h3 className="table-title">Orders</h3>
      <SqlTable data={ordersData}></SqlTable>
    </div>

    <div>
      <h3 className="table-title">Order Details</h3>
      <SqlTable data={orderDetailsData}></SqlTable>
    </div>

    <div>
      <h3 className="table-title">Prodcuts</h3>
      <SqlTable data={ProductsData}></SqlTable>
    </div>
  </>
  )
}