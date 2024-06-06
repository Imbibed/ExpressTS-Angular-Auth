import request from 'supertest';
import { MongoClient } from 'mongodb';
import app from '../../src/app'; // Importer votre application Express
import { ValidationError } from 'express-validator';

describe('Test d\'intégration des routes /api/users', () => {
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

    it('Lors de la création d\'un utilisateur je reçois une erreur si la validation n\'est pas correct', async () => {

        const response = await request(app)
            .post('/api/users')
            .send({username: "!<", password: "jules", email:"jules"})
            .expect(400);
        const errors: ValidationError[] = response.body['errors'];
        expect(errors.length != 0).toBe(true);
        expect(errors[0].msg).toBe('Username must be alphanumeric');
        expect(errors[1].msg).toBe('Username must be at least 3 characters long');
        expect(errors[2].msg).toBe('Invalid email address');
        expect(errors[3].msg).toBe('Password must be at least 6 characters long');
    });

    it('Lors de la création d\'un utilisateur je récupère le username de l\'utilisateur créé', async () => {

        const response = await request(app)
            .post('/api/users')
            .send({username: "jules", password: "motdepasse", email:"jules@jules.com"})
            .expect(200);
        const username: string = response.text as string;
        expect(username).toBe('jules');
    });


});
