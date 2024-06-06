import request from 'supertest';
import { MongoClient } from 'mongodb';
import app from '../../src/app'; // Importer votre application Express

describe('Test d\'intégration des routes /auth', () => {
    let connection: MongoClient;
    let db: any;

    beforeAll(async () => {
        connection = await MongoClient.connect('mongodb://localhost:27017');
        db = connection.db('test');
        app.locals.db = db;
    });

    afterAll(async () => {
        await connection.close();
    });

    it('Je peux me connecter à l\'application', async () => {

        const response = await request(app)
            .post('/auth')
            .send({username: "jules", password: "jules"})
            .expect(200);
        const token: string = response.body['token'] as string;
        expect(token.length != 0).toBe(true);
    });

    // Ajoutez d'autres tests selon vos besoins
});
