const { describe, before } = require("node:test");
const url = "http://localhost:3000/api/refuges/delete/";
const noResultString = "5"; //String not in database, empty response expected
const resultString = "3"; //String in database, non-empty response expected (at least one result)
const mongoose = require('mongoose');
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { ObjectId } = mongoose.Types;
const _id = new ObjectId();    

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
        var email = jwt.sign({email: 'account@prova.it'}, process.env.jwt_secret , {expiresIn: "7d"});
        const res = await fetch("http://localhost:3000/api/refuges/addRefuge/2", {
            method: 'POST',
            headers: ({
                cookie: `email=${email}`
            }),
            body: JSON.stringify({
            _id: _id,
            name: "Rifugio Test"+Math.random()*1000,
            description: "Rifugio Test",
            avgRating: 0,
            mountainId: 2,
            image: "image.jpg",
            __v: 0,
        }),});
        console.log((await res.json()).status);
        });
        afterAll(async () => {
            await mongoose.connection.close(true);
        });

        test('GET with non-empty result', async () => {
            var email = jwt.sign({email: 'admin@admin.mw'}, process.env.jwt_secret, {expiresIn: "7d"});
            var response = await fetch(url + _id, {
                method: 'DELETE',
                headers: ({
                    cookie: `email=${email}`
                }),
            });
            expect((await response.json()).status).toEqual(200);
        
            
        });

    
        test('GET with non-empty result', async () => {
            var response = await fetch(url + '6590232a0e8587080224cd18', {
                method: 'DELETE',
            });
            expect((await response.json()).status).toEqual(401);
        });
        
        test('GET with non-empty result', async () => {
            var email = jwt.sign({email: 'account@prova.it'}, process.env.jwt_secret, {expiresIn: "7d"});
            var response = await fetch(url + '6590232a0e8587080224cd18', {
                method: 'DELETE',
                headers: ({
                    cookie: `email=${email}`
                }),
            });
            expect((await response.json()).status).toEqual(403);
        });
    
        
        test('GET with non-empty result', async () => {
            var email = jwt.sign({email: 'admin@admin.mw'}, process.env.jwt_secret, {expiresIn: "7d"});
            var response = await fetch(url + '6510232a0e8587080224cd19', {
                method: 'DELETE',
                headers: ({
                    cookie: `email=${email}`
                }),
            });
            expect((await response.json()).status).toEqual(404);
        });
    
        
        test('GET with non-empty result 2', async () => {
            var email = jwt.sign({email: 'admin@admin.mw'}, process.env.jwt_secret, {expiresIn: "7d"});
            var response = await fetch(url + '7510232a0e8587080224cd10', {
                method: 'DELETE',
                headers: ({
                    cookie: `email=${email}`
                }),
            });
            expect((await response.json()).status).toEqual(404);
        });
    });