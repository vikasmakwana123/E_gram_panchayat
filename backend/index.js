import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import adminRoutes from './routes/admin.js';
import userRoutes from './routes/user.js';
import uploadRoutes from './routes/upload.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Serve static files (for uploaded documents)
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api', userRoutes);
app.use('/api/upload', uploadRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'E-Gram Panchayat API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware 
app.use((err, req, res, next) => {
  console.error('[ErrorHandler]', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});

export default app;
