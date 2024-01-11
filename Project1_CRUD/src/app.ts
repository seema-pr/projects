import express from 'express';
import dotenv from 'dotenv';
import usersRoutes from './routes/usersRoutes';
import handle404 from './middleware/handle404';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(express.json());
app.use('/api', usersRoutes);

// Include the handle404 middleware for non-existing endpoints
app.use(handle404);

// Custom error handler for server errors
app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
