import express, {Request, Response, NextFunction, Router} from "express";
import { authenticationService } from "../services/authenticationService";
const authRouter: Router = express.Router();

authRouter.post('/', function(req: Request, res: Response, next: NextFunction): void {
    const username: string = req.body["username"] as string;
    const password: string = req.body["password"] as string;
    if(authenticationService.verifyCredentials(username, password)){
        const token: string = authenticationService.generateToken(username);
        res.status(200).send({token: token});
    }else{
        res.status(401).send();
    }
});

export default authRouter;
