const { describe, before } = require("node:test");
const url = "http://localhost:3000/api/mountains/search/";
const noResultString = "ugdniodgsn"; //String not in database, empty response expected
const resultString = "Bondone"; //String in database, non-empty response expected (at least one result)
const mongoose = require('mongoose');
require("dotenv").config();

describe('GET api/mountains/search', () => {
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
    test('GET search mountains given search string with non-empty result', async () => {
        console.log(url+ resultString);
        var response = await fetch(url+ resultString, {
            method: 'GET'
        });

        expect((await response.json()).status).toEqual(200);
    });
    
    test('GET search mountains given search string with empty result', async () => {
        var response = await fetch(url+noResultString, {
            method: 'GET'
        });

        expect((await response.json()).status).toEqual(404);
    });

});