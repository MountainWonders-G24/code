'use client'
import Button from 'antd/es/button';
import axios from 'axios';
import React, { Ref } from 'react'
import './mountains.css'
import 'app/globals.css'
import { topFunction, open_sidebar, close_sidebar } from './script.tsx'
import { useEffect, useState } from 'react';
import { cookies } from "next/headers";
import { logout } from "@/app/script.tsx"
import { message } from 'antd';
interface userType {
    name: string;
    surname: string;
    email: string;
    password: string;
}

interface Mountain {
    id: Number;
    image: String;
    name: String;
    description: String;
}



const apiResponse: Mountain[] = [];

function Mountains() {
    var [mountains = [], setMountains] = useState<Mountain[]>([]);
    const fetchMountains = async () => {
            try {
                const response = await axios.get('/api/mountains');
                const responseData = response.data.data;

                if (Array.isArray(responseData)) {
                    // Assuming the API response is an array of mountains
                    setMountains(responseData);
                } else {
                    console.error('Invalid API response structure:', responseData);
                }
            } catch (error) {
                console.error('Error fetching mountains:', error);
            }
        };


    const fetchSearchMountain = async () => {

            try {
                const searchString= String((document.getElementById("research-input") as HTMLInputElement).value) ;
                
                console.log("Elemento ricercato: " + searchString);
                const response = await axios.get('/api/mountains/search/'+searchString);
                const responseData = response.data.data;
                console.log("Fetch search response: " + responseData);
                console.log("E' array: " + Array.isArray(responseData));
                
                if (!Array.isArray(responseData)||responseData.length==0|| responseData.length==undefined){
                    throw new Error("No mountain founded");
                }
                else  {
                    console.log(responseData[0].name);
                    mountains = new Array<Mountain>();
                    for (let i = 0; i < responseData.length; i++) {
                        const q: Mountain = {
                            id: responseData[i].id,
                            name: responseData[i].name,
                            description: responseData[i].description,
                            image: responseData[i].image
                        };
                        mountains.push(q);
                    }
                    setMountains(mountains);
                }
            } catch (error) {
                message.error("No mountain founded");
                fetchMountains();
                console.error('Error fetching mountains:', error);
            }
            
        };
    useEffect(() => {
        logout();
        
        fetchMountains();
    }, []);
    return (
        <div>
            <div id='sidebar'>
                <button className="closeBtn" onClick={() => close_sidebar()}>Close &times;</button>
                <a href="#">Montagna</a>
                <a href="#">Lunghezza percorso</a>
                <a href="#">Distanza da Trento</a>
            </div>
            <div id='list-refuges'>
                <div id="mountain-bg">
                    <Button onClick={() => topFunction()} id="up-button" title="Go to top">
                        <input type="image"
                            src="https://icons.veryicon.com/png/o/miscellaneous/unicons/top-arrow-to-top.png"
                            alt="Top" />
                    </Button>
                    <h1 id="mountain-name">Montagne del Trentino</h1>
                    <div id="research">
                        <div id="make-search">
                            <div id="search-bar">
                                <input id="research-input" type="text" placeholder="Research" onClick={fetchSearchMountain} />
                                <Button id="search-button">
                                    <input type="image"
                                        src="https://cdn.iconscout.com/icon/free/png-256/free-search-1291-434390.png"
                                        alt="Search button" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="mountains">
                    {mountains.map((mountain) => (
                        <div className="mountain" key={String(mountain.id)} onClick={() => { window.location.href = '/main-pages/refuges?mountainId=' + mountain.id; }}>
                            <div className="mountain-image" id={'mountain' + mountain.id} style={{ backgroundImage: `url(${mountain.image})` }}>
                            </div>
                            <div className="info-mountain">
                                <h3> {mountain.name} </h3>
                                <p>Descrizione: {mountain.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Mountains