const request = require('supertest');
const app=require('../index.js');
const mongoose = require('mongoose');
const User = require('../models/usermodel.js')



beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    await User.deleteMany({}); 
},10000);

afterAll(async () => {
    await mongoose.connection.close();
});

describe('User API', () => {
    let userId;
    let token;

    it('should create a user', async () => {
        const res = await request(app)
            .post('/api/v1/auth/register')
            .send({
                email: 'test1244@test.com',
                password: 'password123',
                name: 'Test User',
                age: 30,
                city: 'Test City',
                zipCode: '12345'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
        token = res.body.token; 
    });

    it('should login a user', async () => {
        const res = await request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'test1244@test.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        token = res.body.token; 
    });

    it('should get all users', async () => {
        const res = await request(app)
            .get('/api/v1/worko/user')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
        if (res.body.length > 0) {
            userId = res.body[0].id; 
        }
    });

    it('should get user by ID', async () => {
        const res = await request(app)
            .get(`/api/v1/worko/user/${userId}`)
            .set('Authorization', `Bearer ${token}`);
        
        // console.log(res);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', userId);
    });

    it('should update a user', async () => {
        const res = await request(app)
            .patch(`/api/v1/worko/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                email:"test222@test.com",
                zipCode:"22303",
                city:"temp city",
                name: "Temp Test User",
                age: 28
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', 'Temp Test User');
        expect(res.body).toHaveProperty('city', 'temp city');
    });

    it('should soft delete a user', async () => {
        const res = await request(app)
            .delete(`/api/v1/worko/user/${userId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(204);
    });

    
});
