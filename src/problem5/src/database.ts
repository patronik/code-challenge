import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { searchFilter } from './models/book/searchFilter';

let connected = false;
let db: Database;

// Initialize database
async function initDb() {
    db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    });

    await db.run(`
    CREATE TABLE IF NOT EXISTS book (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      author TEXT NOT NULL      
    )
  `);

    connected = true;
}

export const createBook = async (name: string, author: string): Promise<any> => {
    if (!connected) {
        await initDb();
    }
    return await db.run(
        'INSERT INTO book (name, author) VALUES (?, ?)',
        [name, author]
    );
};

export const getBooks = async (filter?: searchFilter): Promise<any> => {
    if (!connected) {
        await initDb();
    }

    let whereSql = [];
    let whereArgs = [];
    if (filter !== null) {
        for (const key in filter) {
            whereSql.push(`${key} = ?`);
            whereArgs.push(filter[key as keyof searchFilter]);
          }
    }

    let sqlQuery = 'SELECT * FROM book';

    if (whereSql.length > 0) {
        sqlQuery += ` WHERE ${whereSql.join(' AND ')}`;
        return await db.all(sqlQuery, whereArgs);
    }

    return await db.all(sqlQuery);
    
};

export const getBookById = async (id: string): Promise<any> => {
    if (!connected) {
        await initDb();
    }
    return await db.get('SELECT * FROM book WHERE id = ?', [id]);
};

export const updateBook = async (id: string, name?: string, author?: string): Promise<any> => {
    if (!connected) {
        await initDb();
    }

    let updateKeys = [];
    let updateArgs = [];
    if (typeof name !== 'undefined') {
        updateKeys.push(`name = ?`);
        updateArgs.push(name);
    }

    if (typeof author !== 'undefined') {
        updateKeys.push(`author = ?`);
        updateArgs.push(author);
    }    
    
    return await db.run(
        `UPDATE book SET ${updateKeys.join(', ')} WHERE id = ?`,
        [...updateArgs, id]
    );
};

export const deleteBookById = async (id: string): Promise<any> => {
    if (!connected) {
        await initDb();
    }
    return await db.run('DELETE FROM book WHERE id = ?', [id]);
};
