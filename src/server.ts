import express from 'express';
import db from './config/connection.js';
import userRoutes from './routes/userRoutes.js';
import thoughtRoutes from './routes/thoughtRoutes.js';

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
