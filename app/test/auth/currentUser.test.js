const jwt = require("jsonwebtoken");
const { describe, before } = require("node:test");
const url = "http://localhost:3000/api/auth/currentUser/";
const correctPSW = "accountprova"; // String not in the database, empty response expected
const wrongPSW = "accountprovola"; // String in the database, non-empty response expected (at least one result)
const mongoose = require('mongoose');
require("dotenv").config();

describe("GET /api/auth/currentUser", () => {
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
    test("GET with valid login parameters", async () => {
        
        var email = jwt.sign({email: 'account@prova.it'}, process.env.jwt_secret, {expiresIn: "7d"});
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                cookie: `email=${email}`
            }
        });
        
        expect((await res.json()).status).toEqual(200);
    });

    test("GET with invalid login parameters", async () => {
        const res = await fetch(url, {
            method: 'GET',
        });
        
        expect((await res.json()).status).toEqual(404);
    });
});
