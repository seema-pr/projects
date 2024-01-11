// middleware/handle404.ts
import { Request, Response } from 'express';

const handle404 = (req: Request, res: Response) => {
    res.status(404).json({
        status_code: 404,
        error_message: 'Endpoint not found. Please check the requested URL.',
    });
    return
};

export default handle404;
