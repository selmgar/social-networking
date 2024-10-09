import express from 'express';
import db from './config/connection.js';
import userRoutes from './routes/userRoutes.js';

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
