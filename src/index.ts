import App from './App';
import dotenv from 'dotenv';
import MessageController from './controllers/MessageController';

dotenv.config();
const port: Number = parseInt(process.env.PORT as string, 10);

const app = new App(
  [
    new MessageController()
  ],
  port
);

app.listen();

export default app;