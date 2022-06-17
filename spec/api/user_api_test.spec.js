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
    models.User.deleteMany({})
        .exec({})
        .then(() => done())
        .catch(err => mongoose.disconnect(err));
}); */

describe('USERS API', () => {
    describe('GET USERS /', () => {
        it('STATUS 200', (done) => {
            request.get(base_url, (error, response, body) => {
                const result = JSON.parse(body);
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe('POST USER ', () => {
        it('STATUS 201', (done) => {
            const headers = { 'content-type': 'application/json' };
            const data = {
                name: "Juan",
                email: "juan@correo.com",
                password: "123"
            };
            request.post({
                headers: headers,
                url: base_url,
                body: JSON.stringify(data),
            }, (error, response, body) => {
                expect(response.statusCode).toBe(201);
                const user = JSON.parse(body).user;
                id=user._id;
                console.log(id)
                expect(user.name).toBe('Juan');
                expect(user.email).toBe('juan@correo.com');
                expect(user.role).toBe('Customer');
                done();
            });
        });
    });

    describe('GET ONE USER /', () => {
        it('STATUS 200', (done) => {
            request.get(`${base_url}/${id}`, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe('PUT USER /', () => {
        it('STATUS 200', (done) => {
            const headers = { 'content-type': 'application/json' };
            const data = {
                name: "Juan 2",
                password: "1234"
            };
            request.put({
                headers: headers,
                url:`${base_url}/${id}`,
                body: JSON.stringify(data),
            }, (error, response, body) => {
                const user = JSON.parse(body).user;
                expect(user.name).toBe('Juan 2');
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe('DELETE USER /', () => {
        it('STATUS 200', (done) => {
            request.delete(`${base_url}/${id}`, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
});