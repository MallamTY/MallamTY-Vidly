 const request = require('supertest');
 const {Genre} =  require('../../model/genre');
 const { User } = require('../../model/users');
 jest.setTimeout(5000);
 let server;

 describe('vidly.com/api/genres', () => {
     beforeEach(() => {server = require('../../index')});
     afterEach( async() => {
         await Genre.remove({});
         await server.close();
        
     });
     describe('GET /', () => {
         it('Should return all genres in the database', async () => {

              await Genre.collection.insertMany([
                  {name: 'Merlin'},
                  {name: 'Legend of the Seeker'},

              ]) 

            const res = await request(server).get('/vidly.com/api/genres');
           
            //expect(res.body.length).toBe(2);
            expect(res.status).toBe(200);
            expect(res.body.some(genres => genres.name === 'Merlin')).toBeTruthy();
            expect(res.body.some(genres => genres.name === 'Legend of the Seeker')).toBeTruthy();
           
           

         });
     });

     describe('GET /:id', () => {
         it('Should return genre if a valid id is passed', async () => {
             const genre = new Genre ({name: 'Wrestlemania'});
             await genre.save();

            const res = await request(server).get('/vidly.com/api/genres/' + genre._id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name)
         });

         it('Should return return error 404 if invalid id for every invalid ID sent', async () => {
           
            const res = await request(server).get('/vidly.com/api/genres/1');
            expect(res.status).toBe(404);

         })
     })
    
     describe('POST / ', () => {
         it('Should return error 401 if user is not logged in to the server', async () =>{
            const res = await request(server)
            .post('/vidly.com/api/genres')
            .send({name: 'Genre Name'})
             expect(res.status).toBe(401);
         });

         it('Should return error 400 if name sent to the server is less than 5', async () =>{
             const token = new User().generateAuthToken();
             const res = await request(server)
             .post('/vidly.com/api/genres')
             .set('x-auth-token', token)
             .send({name: '12'})
             expect(res.status).toBe(400);

          });

          it('Should return error 400 if name sent to the server is more than 50 characters', async () =>{
             const token = new User().generateAuthToken();

             const nameTest = new Array(53).join('A') ; // This line is used to obtain a long string of 51 As
             const res = await request(server)
             .post('/vidly.com/api/genres')
             .set('x-auth-token', token)
             .send({name: nameTest});
             expect(res.status).toBe(400);
          });

          it('Should save the genre if input is valid', async () =>{
             const token = new User().generateAuthToken();

             const res = await request(server)
             .post('/vidly.com/api/genres')
             .set('x-auth-token', token)
             .send({name: "Wrestlemania"});
             const genre = Genre.find({name: 'Wrestlemania'});
             expect(genre).not.toBeNull();
          });

        //    it('Should return the genre if input is valid', async () =>{
        //       const token = new User().generateAuthToken();

        //       const res = await request(server)
        //       .post('/vidly.com/api/genres')
        //       .set('x-auth-token', token)
        //       .send({name: "Wrestlemania"});
        //       console.log(res.body)
        //       expect(res.body).toHaveProperty('name', 'Wrestlemania');
        //    });
     });

      
 });