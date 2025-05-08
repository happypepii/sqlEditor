import express from 'express';
import { setupDatabase } from './dbSetup';
import cors from 'cors'
import dotenv from 'dotenv';
import logger from './logger'

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

setupDatabase().then((db) => {
  app.post('/query', async (req, res) => {
    const { sql } = req.body;
    try {
      const result = await db.all(sql);
      res.json({ result });
      logger.info(`SQL Query executed successfully: ${sql}`);
    } catch (err: any) {
      logger.error(`Error executing SQL: ${err.message}`);
      res.status(400).json({ error: err.message });
    }
  });

  app.get('/table-info/:tableName', async (req, res) => {
    const tableName = req.params.tableName;
  
    try {
      const rows = await db.all(`PRAGMA table_info(${tableName})`);
      const columns = rows.map(row => ({
        name: row.name,
        type: row.type,
      }));
      res.json({ table: tableName, columns });
      logger.info(`Fetched schema for table: ${tableName}`);
    } catch (err: any) {
      logger.error(`Error fetching table info: ${err.message}`);
      res.status(400).json({ error: err.message });
    }
  });

  app.listen(port, () => {
    logger.info(`Server running at http://localhost:${port}`);
  });
}).catch((err) => {
  logger.info('Failed to start server:', err);
});
