'use client'
import { getAntdFieldRequiredRule } from '@/app/helpers/validation';
import Button from 'antd/es/button';
import Form from 'antd/es/form';
import message from 'antd/es/message';
import axios from 'axios';
import React from 'react'
import './refuges.css'
import 'app/globals.css'

import { useEffect } from 'react';

import { useRouter } from "next/navigation";
interface userType {
    name: string;
    surname: string;
    email: string;
    password: string;
}



// Get the button:


// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    let mybutton = document.getElementById("up-button");
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}




function Refuges() {
    useEffect(() => {
        scrollFunction();
    }, []);

    return (
        <div>
            <div>
                <div id="mountain">
                    <div className="topnav">
                        <a className="active" href="homepage.html">Home</a>
                        <div className="topnav-right">
                            <a href="#search">Supporto</a>
                            <a href="#profile">Profile</a>
                        </div>
                    </div>
                    <Button onClick={() => topFunction()} id="up-button" title="Go to top">
                        <input type="image"
                            src="https://icons.veryicon.com/png/o/miscellaneous/unicons/top-arrow-to-top.png"
                            alt="Top"/>
                    </Button>
                    <h1 id="mountain-name">NOME MONTAGNA</h1>
                    <div id="research">
                        <div id="make-search">
                            <div id="search-bar">
                                <input id="research-input" type="text" placeholder="Research"/>
                                    <Button id="search-button">
                                        <input type="image"
                                            src="https://cdn.iconscout.com/icon/free/png-256/free-search-1291-434390.png"
                                            alt="Search button"/>
                                    </Button>
                            </div>
                            <Button id="filters">
                                <input type="image"
                                    src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/filter-512.png"
                                    alt="Filter icon"/>
                                    Filtri
                            </Button>
                        </div>
                        <div id="applied-filters">
                            <div className="single-filter">
                                <p className="name-filter">Filtro1</p>
                                <Button className="delete-filter">
                                    <input type="image"
                                        src="https://cdn.iconscout.com/icon/free/png-256/free-clear-1780599-1513754.png"
                                        alt="Clear"/>
                                </Button>
                            </div>
                            <div className="single-filter">
                                <p className="name-filter">Filtro2</p>
                                <Button className="delete-filter">
                                    <input type="image"
                                        src="https://cdn.iconscout.com/icon/free/png-256/free-clear-1780599-1513754.png"
                                        alt="Clear"/>
                                </Button>
                            </div>
                            <div className="single-filter">
                                <p className="name-filter">Filtro3</p>
                                <Button className="delete-filter">
                                    <input type="image"
                                        src="https://cdn.iconscout.com/icon/free/png-256/free-clear-1780599-1513754.png"
                                        alt="Clear"/>
                                </Button>
                            </div>
                        </div>
                    </div>
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
                </div>
            </div>

        </div>

    )
}




export default Refuges