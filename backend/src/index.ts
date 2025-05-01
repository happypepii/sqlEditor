import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

// 建立資料庫連線並初始化資料
async function setupDatabase() {
  const db = await open({
    filename: ':memory:',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY,
      name TEXT,
      email TEXT
    );
    INSERT INTO users (name, email) VALUES
    ('Alice', 'alice@example.com'),
    ('Bob', 'bob@example.com');
  `);

  return db;
}

setupDatabase().then((db) => {
  app.post('/query', async (req: Request, res: Response) => {
    const { sql } = req.body;
    try {
      const result = await db.all(sql);
      res.json({ result });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
});
