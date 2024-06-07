import express, {Request, Response, NextFunction, Router} from "express";
import { authenticationService } from "../services/authenticationService";
import {CannotFoundUserError} from "../Error/UserError";
import {tokenService} from "../services/tokenService";
const authRouter: Router = express.Router();

authRouter.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const username: string = req.body["username"] as string;
    const password: string = req.body["password"] as string;
    try{
        if(await authenticationService.verifyCredentials(username, password)){
            const token: string = tokenService.generateToken(username);
            res.status(200).send({token: token});
        }else{
            res.status(401).send();
        }
    } catch (err) {
        if (err instanceof CannotFoundUserError){
            res.status(404).send(err.message);
        }
    }
});

export default authRouter;
