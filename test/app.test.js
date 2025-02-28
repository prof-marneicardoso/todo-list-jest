import request from 'supertest';
import app from '../src/app.js';

describe('Task API', () => {
    test('GET /tasks deve retornar todas as tasks', async () => {
        const response = await request(app).get('/tasks');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ id: 1, title: 'Buy groceries' }]);
    });

    test('POST /tasks deve criar uma nova task', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({ title: 'Learn testing' });
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ id: 2, title: 'Learn testing' });
    });

    test('POST /tasks deve retornar 400 se não for informado title', async () => {
        const response = await request(app).post('/tasks').send({});
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'Title is required' });
    });
});
