"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersService_1 = require("../services/usersService");
let usersRouter = express_1.default.Router();
/* GET users listing. */
usersRouter.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
usersRouter.get('/:username', async (req, res) => {
    try {
        await (0, usersService_1.getUserByUsername)(req.params.username);
        res.status(200).send('job is done');
    }
    catch (err) {
        res.status(404).send(err);
    }
});
usersRouter.post('/', (req, res, next) => {
    const { body } = req;
    body['username'].isAlphanumeric().withMessage('Username must be alphanumeric');
    const username = req.body['username'];
    const password = req.body['password'];
    const email = req.body['email'];
});
exports.default = usersRouter;
//# sourceMappingURL=usersRoutes.js.map