const request =require('supertest');
const mongoose = require('mongoose');
const { Rental } = require('../../model/rentals');
const { User } = require('../../model/users');


describe('vidly.com/api/returns', () => {
    let server;
    let customerId;
    let movieId;
    let rental;
    let token;

    const exec = () =>{
        return request(server)
            .post('/vidly.com/api/returns')
            .set('x-auth-token', token)
            .send({
                customerId, 
                movieId
            })
    }

    beforeEach( async() => {
    server = require('../../index');
    customerId = mongoose.Types.ObjectId();
    movieId = mongoose.Types.ObjectId();
    token = new User().generateAuthToken();

    rental = new Rental({
        customer: {
            _id: customerId,
            name: 'MallamTY',
            phone: '07037767045',

        },

        movie: {
            _id: movieId,
            title: "Wrestlemania",
            dailyRentalRate: 5

        }

    })
    await rental.save();
});
    


    afterEach( async() => {
        await Rental.remove();
        await server.close();
    
})
        it ('Should return 401 if use is not logged in.', async() => {
            
            token = '';

            const res = await exec();

            expect(res.status).toBe(401)
        })
//Return 401 if client is not logged in
//Return 400 if customer Id is not provided
        it('Should return 400 if customerId was not supplied.', async() => {
            customerId = '';

            const res = await exec();
        
            expect(res.status).toBe(400)

        })
//Return 400 if moviedId is not provided
        it('Should return 400 if movieId was not supplied.', async() => {
            
            movieId = '';

            const res = await exec();
        
            expect(res.status).toBe(400)

        })

//Return 404 if there is no record in rentals for valid CustomerId and MovieId
        it('Should return 404 if rental with details supplied not found.', async() => {
            Rental.remove({});
            // const res = await exec();
           
            const res = await exec();

            expect(res.status).toBe(404);
        })
//Return 400 if rental already returned

        it('Should return 400 if return is already processed', async() => {
            rental.dateReturned = new Date();
            await rental.save();
            // const res = await exec();
        
            const res = await exec();

            expect(res.status).toBe(400);
        })
//Return 200 if valid request
//Set the return date
//Calculate the rental fee
//Update the rental stock 
//Return the renta;

})
