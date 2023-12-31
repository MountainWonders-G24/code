const { describe, before } = require("node:test");
const url = "http://localhost:3000/api/auth/login/";
const correctPSW = "accountprova"; // String not in the database, empty response expected
const wrongPSW = "accountprovola"; // String in the database, non-empty response expected (at least one result)
const mongoose = require('mongoose');
require("dotenv").config();


describe("POST /api/auth/login", () => {
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
    test("POST login with correct credentials", async () => {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
            email: 'account@prova.it',
            password: correctPSW}),
        });
        
        expect((await res.json()).status).toEqual(200);
    });

    test("POST login with wrong credential", async () => {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
            email: 'account@prova.it',
            password: wrongPSW}),
        });
        
        expect((await res.json()).status).toEqual(401);
    });
});
