import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = path.resolve(__dirname, '../../todo.db');
const schemaPath = path.resolve(__dirname, './schema.sql');

// Create database connection
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize database schema
const initializeDatabase = () => {
  const schema = fs.readFileSync(schemaPath, 'utf8');
  db.exec(schema);
};

initializeDatabase();

export default db;