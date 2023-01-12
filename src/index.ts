import App from './App';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`),
});

const port: Number = parseInt(process.env.PORT as string, 10);

const app = new App(port);

app.listen();

export default app;