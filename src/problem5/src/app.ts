import express from 'express';
import bodyParser from 'body-parser';
import { createBook, getBooks, getBookById, updateBook, deleteBookById } from './database';
import { searchFilter } from './models/book/searchFilter';
import { Book } from './models/book';

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Initialize database and start server
async function startServer() {
  // Create
  app.post('/book', async (req, res) => {
    try {
      const { name, author } = req.body as Book;
      const result = await createBook(name, author);
      res.status(201).json({ id: result.lastID });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Read all
  app.get('/book', async (req, res) => {
    try {
      const filter = req.query as searchFilter;
      const books = await getBooks(filter);
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Read one
  app.get('/book/:id', async (req, res) => {
    try {
      const book = await getBookById(req.params.id);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Update
  app.put('/book/:id', async (req, res) => {
    try {
      const { name, author } = req.body as Book;
      const result = await updateBook(req.params.id, name, author);
      if (result.changes === 0) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.json({ message: 'Book updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Delete
  app.delete('/book/:id', async (req, res) => {
    try {
      const result = await deleteBookById(req.params.id);
      if (result.changes === 0) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();