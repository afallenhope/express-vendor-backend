import BotController from '../controllers/BotController';
import { Request, Response } from 'express';
import Router from 'express-promise-router';
const botRouter = Router();

botRouter.get('/', (req: Request, res: Response) => {
  res.status(419).json({ message: "I'm a litte teapot" });
});

botRouter.post('/login', BotController.login);
botRouter.post('/create', BotController.create);
export default botRouter;
