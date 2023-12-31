const { describe } = require("node:test");
const url = "http://localhost:3000/api/auth/logout";
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

    test("GET with valid logout parameters", async () => {
        const token = "tokentotest";
        const email = "emailtotest";
        const resLogout = await fetch(url, {
            method: 'GET',
            headers: {
                cookie: `token= ${token}`,
                cookie: `email= ${email}`
            }
    });
        expect((await resLogout.json()).status).toEqual(200);
    });


    test("GET without valid logout parameters", async () => {
        const resLogout = await fetch(url, {
            method: 'GET',
            headers: {
                cookie: `noCookie= ${"noCookie"}`,
            }
    });
        expect((await resLogout.json()).status).toEqual(401);
    });
});
