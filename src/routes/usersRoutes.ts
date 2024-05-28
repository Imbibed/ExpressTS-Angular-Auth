import express, {Request, Response, NextFunction, Router} from "express";
var usersRouter: Router = express.Router();

/* GET users listing. */
usersRouter.get('/', function(req: Request, res: Response, next: NextFunction): void {
  res.send('respond with a resource');
});

export default usersRouter;
