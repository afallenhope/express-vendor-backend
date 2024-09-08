import { AppDataSource } from '../config/data-source';
import { NextFunction, Request, Response } from 'express';
import { BaseEntity } from 'typeorm';
import { User } from '../entities/user.entity';

const userRepository = AppDataSource.getRepository(User);

class AuthController extends BaseEntity {
  static checkin = async (req: Request, res: Response) => {
    const users = userRepository.find();
    res.status(200).json(users);
  }

  static login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Invalid request body' });
      return;
    }
    if (password.length < 6) {
      res.status(400).json({ message: 'Password must be at least 6 characters long' });
      return;
    }

    try {
      const foundUser = await userRepository.findOneBy({ email });

      if (!foundUser) {
        res.status(404).json({ message: 'User not found', access_token: null });
        return;
      }

      const verified = foundUser?.verifyPassword(password);

      delete foundUser?.password;

      if (verified) {
        res.status(200).json({ message: 'Logged In', access_token: foundUser.generateJWT() });
      } else {
        res.status(401).json({ message: 'Invalid credentials', access_token: null });
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal server error', access_token: null, debug: err });

      console.log('AuthController::login()', err);
    }
  };

  static signup = async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      res.status(400).json({ message: 'Invalid request body' });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ message: 'Password must be at least 8 characters long' });
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).json({ message: 'Passwords do not match' });
      return;
    }

    try {
      let foundUser = await userRepository.findOneBy({ email });
      if (foundUser) {
        res.status(409).json({ message: 'User already exists' });
        return;
      }

      foundUser = await userRepository.findOneBy({ firstName, lastName });
      if (foundUser) {
        res.status(409).json({ message: 'User already exists' });
        return;
      }

      const newUser = new User();
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.email = email;
      newUser.hashPassword(password);

      const savedUser = await userRepository.save(newUser);

      res.status(201).json({ message: 'User created', access_token: savedUser.generateJWT() });
    } catch (err) {
      res.status(500).json({ message: 'Internal server error', access_token: null });
      console.log('AuthController::signup', err);
    }
  };
}

export default AuthController;
