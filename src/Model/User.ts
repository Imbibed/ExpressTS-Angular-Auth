import {ObjectId} from "mongodb";

export class User {
    _id: ObjectId;
    username: string;
    password: string;
    email: string;
    constructor(_id: ObjectId, username: string, password: string, email: string) {
        this._id = _id;
        this.username = username;
        this.password = password;
        this.email = email;
    }
}