import ContactController from '../controllers/ContactController';
import AuthController from '../controllers/AuthController';
import { Request, Response } from 'express';
import Router from 'express-promise-router';
const apiRouter = Router();

apiRouter.get('/', (req: Request, res: Response) => {
  res.status(418).json({ message: "I'm a teapot" });
});

apiRouter.get('/checkin', AuthController.checkin);
apiRouter.post('/login', AuthController.login);
apiRouter.post('/signup', AuthController.signup);
apiRouter.post('/contact', ContactController.contact);
export default apiRouter;
