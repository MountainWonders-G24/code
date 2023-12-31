const { describe, before } = require("node:test");
const url = "http://localhost:3000/api/refuges/";
const noResultString = "5"; //String not in database, empty response expected
const resultString = "3"; //String in database, non-empty response expected (at least one result)
const mongoose = require('mongoose');

require("dotenv").config();

describe('GET api/refuges/[mountainId]', () => {
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
    console.log("Connected to MongoDB");
    test('GET retrieve refuges given an existing mountain', async () => {
        console.log(url+ resultString);
        var response = await fetch(url+ resultString, {
            method: 'GET'
        });

        expect((await response.json()).status).toEqual(200);
        //expect(response.status).toBe(200);

    });

    test('GET retrieve refuges given an undefined mountain', async () => {
        var response = await fetch(url+noResultString, {
            method: 'GET'
        });

        //expect((await response.json()).status).toEqual(404);
        //expect(response.message).toBe(200);

    });

});