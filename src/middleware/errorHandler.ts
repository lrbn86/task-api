import type { Request, Response, NextFunction } from 'express';

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err.name === 'ZodError') {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.issues.map((e: any) => ({
        field: e.path.join('.'),
        message: e.message,
      }))
    });
  }

  console.error('Error:', err.message);

  return res.status(500).json({
    error: 'Internal Server Error',
  });
}

export default errorHandler;
