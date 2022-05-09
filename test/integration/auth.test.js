 const request = require('supertest');
 const { Genre } = require('../../model/genre');
 const { User } = require('../../model/users');


 describe('authorization middle ware', () => {
     beforeEach(() => {server = require('../../index');})  
     afterEach(async() => {
         await Genre.remove({})
         await server.close();
        
     })

     let token; 
     const exec = () => {
         return request(server)
         .post('/vidly.com/api/genres')
         .set('x-auth-token', token)
         .send({name: 'Wrestlemania'})
     }

     beforeEach(() => {
         token = new User().generateAuthToken();
     })

     it('Should return 401 if token is not provided', async() => {
         token = '';
         const res = await exec();
         expect(res.status).toBe(401)
     })

    
     it('Should return 400 if invalid token is provided', async() => {
         token = 'a';
         const res = await exec();
         expect(res.status).toBe(400)
     });

    
     it('Should return 200 if a valid token is provided', async() => {
         const res = await exec();
         expect(res.status).toBe(200)
     })
 })