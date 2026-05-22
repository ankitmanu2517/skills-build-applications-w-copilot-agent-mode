import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

console.log(`API base URL: ${baseUrl}`);

app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB (octofit_db)'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', baseUrl });
});

app.listen(PORT, () => {
  console.log(`OctoFit Tracker backend listening on port ${PORT}`);
});

export default app;
