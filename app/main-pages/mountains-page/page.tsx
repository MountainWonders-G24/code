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
    id: String;
    name: String;
    refuges: Array<Number>;
}

const apiResponse: Mountain[] = [];

// Function to render the list in TypeScript
function renderList(items: Mountain[]) {
  const listContainer = document.getElementById("list-container");

}

const printUser = async () => {
    // const  data  = await axios.get("/api/auth/currentUser");
    console.log(await axios.get("/api/auth/currentUser"));

    // if (data) {
    //   console.log(data.data.data);
    // }else{
    //     console.log("No user");
    // }
}

function Mountains() {
    const [mountains = [], setMountains] = useState<Mountain[]>([]);

    useEffect(() => {   
       
        const printUser = async () => {
            const  data  = await axios.get("/api/auth/currentUser");
            if(data.data.status!=200){
                console.log(data.data.data);
            }
            
            // if (data) {
            //   console.log(data.data.data);
            // }else{
            //     console.log("No user");
            // }
        }

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
            console.error('Error fetching data:', error);
          }
        };
      
        fetchMountains();
        printUser();
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
            <div id="mountain">
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
                        <Button id="filters" className='openBtn' onClick={() => /*open_sidebar()*/ printUser()}>
                            <input type="image"
                                src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/filter-512.png"
                                alt="Filter icon" />
                            Filtri
                        </Button>
                    </div>
                    <div id="applied-filters">
                        <div className="single-filter">
                            <p className="name-filter">Filtro1</p>
                            <Button className="delete-filter">
                                <input type="image"
                                    src="https://cdn.iconscout.com/icon/free/png-256/free-clear-1780599-1513754.png"
                                    alt="Clear" />
                            </Button>
                        </div>
                        <div className="single-filter">
                            <p className="name-filter">Filtro2</p>
                            <Button className="delete-filter">
                                <input type="image"
                                    src="https://cdn.iconscout.com/icon/free/png-256/free-clear-1780599-1513754.png"
                                    alt="Clear" />
                            </Button>
                        </div>
                        <div className="single-filter">
                            <p className="name-filter">Filtro3</p>
                            <Button className="delete-filter">
                                <input type="image"
                                    src="https://cdn.iconscout.com/icon/free/png-256/free-clear-1780599-1513754.png"
                                    alt="Clear" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="refuges">
            {mountains.map((mountain) => (
                <div key={String(mountain.id)}  onClick={()=> {window.location.href = '/main-pages/'+mountain.id+'/refuges';}}>
                    <div className="refuge" >
                        <h3> {mountain.name} </h3>
                        <div className="refuge-image">
                        </div>
                        <div className="info-refuge">
                            <h3> {mountain.name} </h3>
                            <p>Descrizione: </p>
                        </div>
                    </div>
                </div>
            ))}
            
            </div>
            </div>
        </div>

    )
}

export default Mountains