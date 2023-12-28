'use client'
import Button from 'antd/es/button';
import axios from 'axios';
import React, { Ref } from 'react'
import './mountains.css'
import 'app/globals.css'
import {topFunction, open_sidebar, close_sidebar} from './script.tsx'
import { useEffect, useState } from 'react';

interface userType {
    name: string;
    surname: string;
    email: string;
    password: string;
}

interface Mountain{
    id: Number;
    image: String;
    name: String;
    description: String;
    
}

const apiResponse: Mountain[] = [];

// Function to render the list in TypeScript
function renderList(items: Mountain[]) {
  const listContainer = document.getElementById("list-container");

}



function Mountains() {
    const [mountains = [], setMountains] = useState<Mountain[]>([]);

    useEffect(() => {   
        const fetchMountains = async () => {
            try {
            const response  = await axios.get('/api/mountains');
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
                            <input id="research-input" type="text" placeholder="Research" />
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
                    <div className="mountain" key={String(mountain.id)} onClick={()=> {window.location.href = '/main-pages/refuges?mountainId='+mountain.id;}}>
                        
                        
                        <div className="mountain-image" id={'mountain'+mountain.id} style={{backgroundImage: `url(${mountain.image})`}}>
                        </div>
                        <div className="info-mountain">
                            <h3> {mountain.name} </h3>
                            <p>Descrizione: </p>
                        </div>
                    </div>
            ))}
            
            </div>
            </div>
        </div>

    )
}

export default Mountains