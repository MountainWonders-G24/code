'use client'
import { getAntdFieldRequiredRule } from '@/app/helpers/validation';
import Button from 'antd/es/button';
import Form from 'antd/es/form';
import message from 'antd/es/message';
import axios from 'axios';
import React from 'react';
import { Select, Space} from 'antd';
import { Input } from 'antd';
import { NextRequest, NextResponse } from "next/server";

const { TextArea } = Input;

import './refuges.css'
import 'app/globals.css'
import { scrollFunction, topFunction, open_sidebar, close_sidebar } from './script.tsx'


import { useEffect, useState } from 'react';

import { useRouter } from "next/navigation";

interface userType {
    name: string;
    surname: string;
    email: string;
    password: string;
}

interface Refuge{
    id: Number;
    name: String;
    mountain: Number;
    image: String; //nel diagramma delle classi un rifugio non ha un'immagine mentre qui gliela mettiamo???????
}

function displayAddButton(logged: boolean){
    if(logged){
        (document.getElementById("add-refuge-btn") as HTMLElement).style.display = "block";
    }else{
        (document.getElementById("add-refuge-btn") as HTMLElement).style.display = "none";
    }
}

function Refuges() {
    const [user, _] = useState<userType>();
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.onscroll = function () {
                scrollFunction();
            };
        }
        // const fetchUser = async (request: NextRequest) => {
        //     try {
        //       const token = request.cookies.get("token")?.value || "";
        //       if (token) {
        //         // Assuming the API response is an array of mountains
        //         displayAddButton(true);
        //       } else {
        //         displayAddButton(false);
        //         console.error('User not logged: ');
        //       }
        //     } catch (error) {
        //       console.error('Error fetching data:', error);
        //     }
        //   };
        
          const fetchUser = async () => {
            try {
              const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
      
              if (token) {
                // Assuming the API response is an array of mountains
                displayAddButton(true);
              } else {
                displayAddButton(false);
                console.error('User not logged: ');
              }
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchUser();
          
    }, []);

    return (
        <div>
            <div id='add-refuge-form'>
                <div>
                    <p>Nome rifugio: </p>
                    <Input type="text" id="add-refuge-name" />
                </div>
                <div>
                    <p>Montagna: </p>
                    <Select id='add-refuge-mountain'
                        defaultValue=" -- Insert mountain -- "
                        style={{ width: 120 }}
                        options={[
                            { value: '0', label: ' -- Insert mountain -- ' },
                            { value: '1', label: 'Marzola' },
                            { value: '2', label: 'Bondone' },
                            { value: '3', label: 'Pippo' },
                        ]}
                    />
                    </div>   
                <div>
                    <p>Descrizione: </p>
                    <TextArea id="add-refuge-description" cols={10} rows={4}></TextArea>
                </div>
                <div>Immagine: </div>
                <Input type="text" id="add-refuge-image" />

            </div>
            <div id='sidebar'>
                <button className="closeBtn" onClick={() => close_sidebar()}>Close &times;</button>
                <a href="#">Montagna</a>
                <a href="#">Lunghezza percorso</a>
                <a href="#">Distanza da Trento</a>
            </div>
            <div id='list-refuges'>
                <div id="mountain">
                    <Button onClick={() => topFunction()} id="add-refuge-btn" title="Add refuge">
                        <input type="image"
                            src="https://cdn-icons-png.flaticon.com/512/1237/1237946.png"
                            alt="Add refuge" />
                    </Button>
                    <Button onClick={() => topFunction()} id="up-button" title="Go to top">
                        <input type="image"
                            src="https://cdn-icons-png.flaticon.com/512/9693/9693489.png"
                            alt="Top" />
                    </Button>
                    <h1 id="mountain-name">NOME MONTAGNA</h1>
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
                            <Button id="filters" className='openBtn' onClick={() => open_sidebar()}>
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
                    <div className="refuge">
                        <div className="refuge-image">
                        </div>
                        <div className="info-refuge">
                            <h3>Nome rifugio</h3>
                            <p>Descrizione</p>
                            <p>Valutazione:</p>
                            <div id="review">
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star"></span>
                                <span className="fa fa-star"></span>
                            </div>
                        </div>
                        <Button onClick={() => topFunction()} id="delete-refuge-btn" title="Delete refuge">
                            <input type="image"
                                src="https://static-00.iconduck.com/assets.00/trash-icon-462x512-njvey5nf.png"
                                alt="Delete" />
                        </Button>
                    </div>
                    <div className="refuge">
                        <div className="refuge-image">
                        </div>
                        <div className="info-refuge">
                            <h3>Nome rifugio</h3>
                            <p>Descrizione</p>
                            <p>Valutazione:</p>
                            <div id="review">
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star"></span>
                                <span className="fa fa-star"></span>
                            </div>
                        </div>
                        <Button onClick={() => topFunction()} id="delete-refuge-btn" title="Delete refuge">
                            <input type="image"
                                src="https://static-00.iconduck.com/assets.00/trash-icon-462x512-njvey5nf.png"
                                alt="Delete" />
                        </Button>
                    </div>
                    <div className="refuge">
                        <div className="refuge-image">
                        </div>
                        <div className="info-refuge">
                            <h3>Nome rifugio</h3>
                            <p>Descrizione</p>
                            <p>Valutazione:</p>
                            <div id="review">
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star checked"></span>
                                <span className="fa fa-star"></span>
                                <span className="fa fa-star"></span>
                            </div>
                        </div>
                        <Button onClick={() => topFunction()} id="delete-refuge-btn" title="Delete refuge">
                            <input type="image"
                                src="https://static-00.iconduck.com/assets.00/trash-icon-462x512-njvey5nf.png"
                                alt="Delete" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>

    )
}




export default Refuges