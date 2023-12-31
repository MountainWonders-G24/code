const { describe, before } = require("node:test");
const url = "http://localhost:3000/api/refuges/search/";
const noResultString = "Sngiewngissbmdp"; //String not in database, empty response expected
const resultString = "/Casa%20di%20maria"; //String in database, non-empty response expected (at least one result)
const mongoose = require('mongoose');

require("dotenv").config();


describe('GET api/refuges/search', () => {
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
    console.log(url+noResultString);
    const searchString= resultString
    test('GET search refuges given searchstring with non-empty result', async () => {
        var response = await fetch(url+"3"+ searchString, {
            method: 'GET'
        });

        expect((await response.json()).status).toEqual(200);
    });

    test('GET search refuges given wrong mountain but valid search string', async () => {
        var response = await fetch(url+"2"+ searchString, {
            method: 'GET'
        });

        expect((await response.json()).status).toEqual(404);
    });


    test('GET search refuges given string with empty result cause of unexisting  searchString', async () => {
        var response = await fetch(url+"0/gsuhsughsuhgiuoshngiuosngiuoniogniofnisnisng", {
            method: 'GET'
        });

        expect((await response.json()).status).toEqual(404);
    });

    test('GET search refuges given invalid mountain but valid search string', async () => {
        var response = await fetch(url+"10000"+ searchString, {
            method: 'GET'
        });

        expect((await response.json()).status).toEqual(404);
    });

});