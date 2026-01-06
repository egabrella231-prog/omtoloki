import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get('/translate', async (req, res) => {
  const { word } = req.query;
  try {
    const result = await pool.query(
      'SELECT oshikwanyama FROM translations WHERE LOWER(english) = LOWER($1)',
      [word]
    );
    if (result.rows.length > 0) {
      res.json({ translation: result.rows[0].oshikwanyama });
    } else {
      res.status(404).json({ error: 'Word not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(5000, () => console.log('🚀 Brain online at http://localhost:5000'));
