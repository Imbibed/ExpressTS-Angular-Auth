import request from 'supertest';
import {MongoClient, ObjectId} from 'mongodb';
import app from '../../src/app';
import {User} from "../../src/Model/User"; // Importer votre application Express
import {userRepository} from "../../src/repositories/usersRepository";
import {CannotFoundUserError} from "../../src/Error/UserError";

describe('Test d\'intégration des routes /auth', () => {
    let connection: MongoClient;
    let db: any;

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017');
        db = connection.db('test');
        await userRepository.createUser('user-test', 'test-password', 'user-test@gmail.com');

        app.locals.db = db;
    });

    afterAll(async () => {
        await connection.close();
    });

    it('Je peux me connecter à l\'application', async () => {

        const response = await request(app)
            .post('/auth')
            .send({username: "user-test", password: "test-password"})
            .expect(200);
        const token: string = response.body['token'] as string;
        expect(token.length != 0).toBe(true);
    });

    it('J\'ai une erreur si le user n\' pas trouvé', async () => {

        const response = await request(app)
            .post('/auth')
            .send({username: "jules", password: "test-password"})
            .expect(404);
        const expectedErrorMsg = new CannotFoundUserError('jules');
        expect(response.text).toBe(expectedErrorMsg.message);
    });
});
