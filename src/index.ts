import express from 'express';
import morgan from 'morgan';
import TaskRouter from './routers/taskRouter.js';
import AuthRouter from './routers/authRouter.js';
import ErrorHandler from './middleware/errorHandler.js';

const app = express();

app.use(express.json());
app.use(morgan('combined'));

app.use('/v1/tasks', TaskRouter);
app.use('/v1/auth', AuthRouter);
app.use(ErrorHandler);


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
