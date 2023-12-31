const { describe, before } = require("node:test");
const url = "http://localhost:3000/api/refuges/addRefuge/";
const correctMountain = 2;
const wrongMountain = 5;
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const { ObjectId } = mongoose.Types;
require("dotenv").config();
describe("POST /api/refuges/addRefuge/[mountainId]", () => {
    var refugesId = [];
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
        var email = jwt.sign({email: 'admin@admin.mw'}, process.env.jwt_secret, {expiresIn: "7d"});
            var response = await fetch(url + id, {
                method: 'DELETE',
                headers: ({
                    cookie: `email=${email}`
                }),
            });
            console.log
        await mongoose.connection.close(true);
        
    });

    //good
    test("POST add refuge with valid credential", async () => {
        
        var email = jwt.sign({email: 'account@prova.it'}, process.env.jwt_secret , {expiresIn: "7d"});
        const mountainId = correctMountain;
        const res = await fetch(url+mountainId, {
            method: 'POST',
            headers: ({
                cookie: `email=${email}`
            }),
            body: JSON.stringify({
                
                name: "Rifugio Test"+Math.random()*1000,
                description: "Rifugio Test",
                avgRating: 0,
                mountainId: 2,
                image: "image.jpg",
                __v: 0,
        }),});
        let test= (await res.json());
        id= test.data;
        
        expect((test).status).toEqual(201);
    });
    

    //admin no good
    test("POST add refuge with valid incredential", async () => {
        var email = jwt.sign({email: 'admin@admin.mw'}, process.env.jwt_secret, {expiresIn: "7d"});
        const header= new Headers();
        header.append('cookie', `email=${email}`);
        const res = await fetch("http://localhost:3000/api/refuges/addRefuge/2", {
            method: 'POST',
            headers: header,
            body: JSON.stringify({
                name: "Rifugio Test"+Math.random()*100,
                description: "Rifugio Test",
                avgRating: 1,
                mountainId: 2,
                image: "image.jpg",
                __v: 0,
            }),
        });
        expect((await res.json()).status).toEqual(403);
    });

    test("POST add refuge with valid credential", async () => {
        
        var email = jwt.sign({email: 'account@prova.it'}, process.env.jwt_secret , {expiresIn: "7d"});
        const mountainId = correctMountain;
        const res = await fetch(url+mountainId, {
            method: 'POST',
            headers: ({
                cookie: `email=${email}`
            }),
            body: JSON.stringify({
            name: "Rifugio Test"+Math.random()*1000,
            description: "Rifugio Test",
            avgRating: 0,
            mountainId: 2,
            image: "image.notvalid",
            __v: 0,
        }),});
        expect((await res.json()).status).toEqual(415);
    });

    //not logged
    test("POST add refuge without credential", async () => {
        const mountainId = correctMountain;
        const res = await fetch(url+mountainId, {
            method: 'POST',
            body: JSON.stringify({
            name: "Rifugio Test"+Math.random()*10000,
            description: "Rifugio Test",
            avgRating: 0,
            mountainId: mountainId,
            image: "image.jpg",
        }),});
        expect((await res.json()).status).toEqual(401);
    });

    //not existing refuge
    test("POST add refuge with not valid mountain", async () => {
        var email = jwt.sign({email: 'account@prova.it'}, process.env.jwt_secret, {expiresIn: "7d"});
        const mountainId = wrongMountain;
        const res = await fetch(url+mountainId, {
            method: 'POST',
            headers: ({
                cookie: `email=${email}`
            }),
            body: JSON.stringify({
            name: "Rifugio Test",
            description: "Rifugio Test",
            avgRating: 0,
            mountainId: mountainId,
            image: "image.jpg",
        }),});
        expect((await res.json()).status).toEqual(404);
    });

    //duplicated refuge in a mountain
    test("POST add refuge already existing inside a mountain", async () => {
        var email = jwt.sign({email: 'account@prova.it'}, process.env.jwt_secret, {expiresIn: "7d"});
        const mountainId = 3;
        const res = await fetch(url+ mountainId, {
            method: 'POST',
            headers: ({
                cookie: `email=${email}`
            }),
            body: JSON.stringify({
            name: "Casa di maria",
            description: "A due passi dal cielo",
            avgRating: 5,
            mountainId: 3,
            image: "https://w0.peakpx.com/wallpaper/345/769/HD-wallpaper-heaven-paradise-glory-sky-god.jpg",
        }),});
        expect((await res.json()).status).toEqual(409);
    });
});
