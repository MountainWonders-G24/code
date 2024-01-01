const { describe, before } = require("node:test");
const url = "http://localhost:3000/api/auth/register/";
const correctPSW = "accountprova"; // String not in the database, empty response expected
const wrongPSW = "accountprovola"; // String in the database, non-empty response expected (at least one result)
const mongoose = require('mongoose');
require("dotenv").config();
import User from "@/app/models/userModel";

describe("POST /api/auth/register", () => {
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
        User.findOneAndDelete({name: "Giacomo"});
        await mongoose.connection.close(true);
    });


    test("POST register with valid parameters", async () => {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                name: 'Giacomo',
                surname: 'Rossi',
                email: 'accounttry@prova.it'+ Math.random(),
                password: correctPSW}),
        });
        
        expect((await res.json()).status).toEqual(201);
    });

    test("POST register with invalid parameters", async () => {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: 'accountprovola@prova.it',
                //password: wrongPSW
            }),
        });
        
        expect((await res.json()).status).toEqual(401);
    });
});
