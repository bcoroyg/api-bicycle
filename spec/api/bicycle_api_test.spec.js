import mongoose from 'mongoose';
import "../../index.js"
import request from 'request';
import models from '../../models/index.js'
const base_url = 'API_URL';

let id;
beforeEach(function (done) {
    const mongoDB = 'mongodb://localhost:27017/dbtest';
    mongoose.connect(mongoDB, {
        useNewUrlParser: true,
    })
        .then(() => {
            console.log('We are connected to test database!');
            done();
        })
        .catch(() => console.log('connection error'));
});

/* afterEach((done) => {
    models.Bicycle.deleteMany({})
        .exec({})
        .then(() => done())
        .catch(err => mongoose.disconnect(err));
}); */

describe('BICYCLES API', () => {
    describe('GET BICYCLES /', () => {
        it('STATUS 200', (done) => {
            request.get(base_url, (error, response, body) => {
                const result = JSON.parse(body);
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe('POST BICYCLE ', () => {
        it('STATUS 201', (done) => {
            const headers = { 'content-type': 'application/json' };
            const data = {
                color: "Rojo",
                model: "X3"
            };
            request.post({
                headers: headers,
                url: base_url,
                body: JSON.stringify(data),
            }, (error, response, body) => {
                expect(response.statusCode).toBe(201);
                const bici = JSON.parse(body).bicycle;
                id=bici._id;
                expect(bici.color).toBe('Rojo');
                expect(bici.model).toBe('X3');
                done();
            });
        });
    });

    describe('GET ONE BICYCLE /', () => {
        it('STATUS 200', (done) => {
            request.get(`${base_url}/${id}`, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe('PUT BICYCLE /', () => {
        it('STATUS 200', (done) => {
            const headers = { 'content-type': 'application/json' };
            const data = {
                color: "Azul",
                model: "X1"
            };
            request.put({
                headers: headers,
                url:`${base_url}/${id}`,
                body: JSON.stringify(data),
            }, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                const bici = JSON.parse(body).bicycle;
                expect(bici.color).toBe('Azul');
                expect(bici.model).toBe('X1');
                done();
            });
        });
    });

    describe('DELETE BICYCLE /', () => {
        it('STATUS 200', (done) => {
            request.delete(`${base_url}/${id}`, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
});