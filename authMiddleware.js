import { getUserByEmail } from '../middleware/authMiddleware.js';
import jwt from 'jsonwebtoken';

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  getUserByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0 || results[0].password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: results[0].id, role: results[0].role }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ token });
  });
};
