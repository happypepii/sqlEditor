import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs';
import path from 'path';
import logger from './logger';

async function setupDatabase() {
  const dbFilePath = path.join(__dirname, '../database/database.sqlite');

  const dbExists = fs.existsSync(dbFilePath);

  const db = await open({
    filename: dbFilePath,
    driver: sqlite3.Database,
  });

  if(!dbExists){
    logger.info('db init.....')
    const sqlFiles = ['Categories.sql', 'Customers.sql', 'Orders.sql', 'OrderDetails.sql', 'Products.sql'];

    for (const file of sqlFiles) {
        const filePath = path.join(__dirname, `../sqlfile/${file}`);
        try{
            const sql = await fs.promises.readFile(filePath, 'utf8');
            await db.exec(sql);
            logger.info(`Database initialized from: ${file}`);
        }catch(error){
            logger.error(`Error initializing from ${file}:`, error);
        }

    }

    logger.info(`Database initialized at: ${dbFilePath}`);
  } else {
    logger.info('database exists already, skip init...')
  } 

  return db;
}

export { setupDatabase };
