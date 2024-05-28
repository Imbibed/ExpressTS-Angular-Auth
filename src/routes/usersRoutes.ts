import express, {Request, Response, NextFunction, Router} from "express";
import {getUserByUsername} from "../services/usersService";

var usersRouter: Router = express.Router();

/* GET users listing. */
usersRouter.get('/', function(req: Request, res: Response, next: NextFunction): void {
  res.send('respond with a resource');
});

usersRouter.get('/:username', async (req, res) => {
  try {
    await getUserByUsername(req.params.username);
    res.status(200).send('job is done');
  } catch (err) {
    res.status(404).send(err);
  }
});

export default usersRouter;
