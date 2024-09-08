import { AppDataSource } from '../config/data-source';
import { BaseEntity } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { BotUser } from './../entities/botuser.entity';
import jwt from 'jsonwebtoken';

const botRepository = AppDataSource.getRepository(BotUser);

class BotController extends BaseEntity {
  static login = async (req: Request, res: Response, next: NextFunction) => {};

  static getBot = async (req: Request, res: Response, next: NextFunction) => {};

  static createBot = async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, password } = req.body;
    const { headers } = req;
    const foundBot = await botRepository.findOneBy({ firstName, lastName });

    if (foundBot) {
      res.status(409).json({ message: 'Already registered' });
      return;
    }

    const user = await jwt.decode(headers['authorization']);

    console.log(user);

    const botUser = new BotUser();
    botUser.firstName = firstName;
    botUser.lastName = lastName;
    botUser.password = password;
    const savedBot = botRepository.save(botUser);
    res.status(201).json({ message: 'bot created', bot_user: botUser });
  };

  // TODO: these will be implemented at some point when I get the bot CI/CD setup
  static updateBot = async (req: Request, res: Response, next: NextFunction) => {};

  static deleteBot = async (req: Request, res: Response, next: NextFunction) => {};

  static getBotList = async (req: Request, res: Response, next: NextFunction) => {};

  static getBotListByUser = async (req: Request, res: Response, next: NextFunction) => {};

  static getBotListByType = async (req: Request, res: Response, next: NextFunction) => {};

  static testBotConnection = async (req: Request, res: Response, next: NextFunction) => {};
}

export default BotController;
