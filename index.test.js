const request = require('supertest');
const { app, newNames, time } = require('./index');

describe('POST /names', () => {
    beforeEach(() => {
        newNames.clear();
    });

    fullName = { name: 'Juan',
              lastName: 'Pérez'
    }

    jest.setTimeout(time + 2000);

    it('should respond status 200 and the correct message when first and last name are provided', async () => {
        const response = await request(app)
            .post('/names')
            .send(fullName);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: 'Nombre: Juan, Apellido: Pérez' });
    });

    it('should respond status 400 when first or last name is missing', async () => {
        const response = await request(app)
            .post('/names')
            .send({ name: 'Juan' });

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: 'Faltan campos: nombre y apellido son requeridos' });
    });

    it('should respond with 400 when the first and last name have already been recently registered', async () => {
        const firstResponse = await request(app)
            .post('/names')
            .send(fullName);

        expect(firstResponse.statusCode).toBe(200);
        expect(firstResponse.body).toEqual({ message: 'Nombre: Juan, Apellido: Pérez' });

        const secondResponse = await request(app)
            .post('/names')
            .send(fullName);

        expect(secondResponse.statusCode).toBe(409);
        expect(secondResponse.body).toEqual({ error: 'El nombre y apellido ya han sido registrados recientemente' });
    });

    it('should allow registering the same first and last name after 10 minutes', async () => {

        const firstResponse = await request(app)
            .post('/names')
            .send(fullName);

        expect(firstResponse.statusCode).toBe(200);
        expect(firstResponse.body).toEqual({ message: 'Nombre: Juan, Apellido: Pérez' });

        await new Promise(resolve => setTimeout(resolve, time + 1000));

        const secondResponse = await request(app)
            .post('/names')
            .send(fullName);

        expect(secondResponse.statusCode).toBe(200);
        expect(secondResponse.body).toEqual({ message: 'Nombre: Juan, Apellido: Pérez' });
    });
});