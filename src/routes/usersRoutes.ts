import express, {Request, Response, NextFunction, Router} from "express";
import {createUser as servCreateUser, getUserByUsername as servGetUserByUsername} from '../services/usersService';
import {body, validationResult} from 'express-validator';

let usersRouter: Router = express.Router();

/* GET users listing. */
usersRouter.get('/', function(req: Request, res: Response, next: NextFunction): void {
  res.send('respond with a resource');
});

usersRouter.get('/:username', async (req, res) => {
  try {
    await servGetUserByUsername(req.params.username);
    res.status(200).send('job is done');
  } catch (err) {
    res.status(404).send(err);
  }
});

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
}

const createUser = async (req: Request, res: Response) => {
  const {username, password, email} = req.body;
  try {
      await servCreateUser(username, password, email);
      res.status(200).send(username);
  } catch(err) {
      res.status(409).send(username);
  }
}

usersRouter.post(
    '/',
    [
        body('username')
            .isAlphanumeric()
            .withMessage('Username must be alphanumeric')
            .isLength({min: 3})
            .withMessage('Username must be at least 3 characters long'),
        body('email')
            .isEmail()
            .withMessage('Invalid email address'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long')
    ],
    validateRequest,
    createUser
);

export default usersRouter;
