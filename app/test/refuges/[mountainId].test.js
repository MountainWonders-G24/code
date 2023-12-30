const { describe, before } = require("node:test");
const url = "http://localhost:3000/api/refuges/search/";
const noResultString = "Sngiewngissbmdp"; //String not in database, empty response expected
const resultString = "Casa%20di%20maria"; //String in database, non-empty response expected (at least one result)
const mongoose = require('mongoose');

describe('GET api/refuges/search', () => {
    // beforeAll(async () => {
    //     mongoose.connect(process.env.ATLAS_URI)
    // });
    afterAll(async () => {
        await mongoose.disconnect();
    });
    console.log("Connected to MongoDB");
    test('GET with non-empty result', async () => {
        console.log(url+ resultString);
        var response = await fetch(url+ resultString, {
            method: 'GET'
        });

        expect((await response.json()).status).toEqual(200);
    });

    test('GET with non-empty result', async () => {
        var response = await fetch(url+noResultString, {
            method: 'GET'
        });

        expect((await response.json()).status).toEqual(404);
    });

});