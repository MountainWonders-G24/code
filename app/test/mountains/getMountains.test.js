const { describe, before } = require("node:test");
const url = "http://localhost:3000/api/mountains/getMountains/";
const mongoose = require('mongoose');


require("dotenv").config();

    describe('GET api/mountains/getMountains', () => {
        beforeAll(async () => {
        
            const timeout = 10000;
            // Promise to connect to MongoDB
            const connectPromise = new Promise((resolve, reject) => {
                const timeoutId = setTimeout(() => {
                    reject(new Error(`Timed out after ${timeout}ms while connecting to MongoDB`));
                }, timeout);
                mongoose.connect(process.env.ATLAS_URI).then(() => {
                    clearTimeout(timeoutId);
                    resolve();
                }).catch((error) => {
                    clearTimeout(timeoutId);
                    reject(error);
                });
            });
        });
        afterAll(async () => {
            await mongoose.connection.close(true);
        });
    
    test('GET retrieve mountains with non-empty result', async () => {
        var response = await fetch(url, {
            method: 'GET'
        });
        expect((await response.json()).status).toEqual(200);
    });

    //cambiare api che ritorna 404 se non esistono montagne nel db
    test('GET retrieve mountains with empty result', async () => {
        var response = await fetch(url, {
            method: 'GET'
        });
        
        expect(response.status).toEqual(200);
        
    });

    

});