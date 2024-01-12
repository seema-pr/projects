import express from 'express';
import dotenv from 'dotenv';
import usersRoutes from './routes/usersRoutes';
import handle404 from './middleware/handle404';

// Load environment variables from a .env file
dotenv.config();

// Create an instance of Express
const app = express();

// Set the port number from environment variable or default to 4000
const PORT = process.env.PORT ?? 4000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Use the user routes for all endpoints under the '/api' path
app.use('/api', usersRoutes);

// Include the handle404 middleware for non-existing endpoints
app.use(handle404);

// Custom error handler for server errors
app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
