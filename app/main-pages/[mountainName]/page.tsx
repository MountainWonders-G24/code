'use client'
import { getAntdFieldRequiredRule } from '@/app/helpers/validation';
import Button from 'antd/es/button';
import Form from 'antd/es/form';
import message from 'antd/es/message';
import axios from 'axios';
import React from 'react';
import { Select, Space } from 'antd';
import { Input } from 'antd';
import { NextRequest, NextResponse } from "next/server";
import { disconnectDB } from "@/configs/dbConfig";
const { TextArea } = Input;
import 'app/globals.css'
import './refuges.css'

import { scrollFunction, topFunction, open_sidebar, close_sidebar } from './script.tsx'


import { useEffect, useState } from 'react';

import { useRouter } from "next/navigation";


var avg_rating=0;
interface Mountain {
    id: string;
    name: string;
    description: String;
    image: string;
}

interface Refuge {
    _id: string;
    name: String;
    avgRating: number;
    description: String;
    mountainId: Number;
    image: String; //nel diagramma delle classi un rifugio non ha un'immagine mentre qui gliela mettiamo???????
    
    
}

function displayAddButton(register: boolean) {
    if (register) {
        (document.getElementById("add-refuge-btn") as HTMLElement).style.display = "block";
        (document.getElementById("up-button") as HTMLElement).style.bottom = "6.5rem";
    } else {
        (document.getElementById("add-refuge-btn") as HTMLElement).style.display = "none";
        (document.getElementById("up-button") as HTMLElement).style.bottom = "1rem";
    }
}

function displayDeleteButton(admin: boolean) {
    if (admin) {
        Array.from((document.getElementsByClassName("delete-refuge-btn") as HTMLCollectionOf<HTMLElement>)).forEach((button) => {
            button.style.display = "block";
        });
    } else {
        Array.from((document.getElementsByClassName("delete-refuge-btn") as HTMLCollectionOf<HTMLElement>)).forEach((button) => {
            button.style.display = "none";
        });
    }
}



function setRating(nStars: number) {
    avg_rating=nStars;
    (document.getElementById("add-refuge-rating") as HTMLInputElement).value = "5";
    const stars = (document.getElementById("review")?.getElementsByClassName("fa fa-star") as HTMLCollectionOf<HTMLElement>);
    let n: number = 0;
    Array.from(stars).forEach((star) => {
        if (n < nStars) {
            star.className += " checked";
            n += (1);
        } else {
            star.className = "fa fa-star";
        }

    });
}


const fetchUser = async () => {
    console.log("Entrato per gettare il current user");
    try {

        const currentUser = await axios.get('/api/auth/currentUser');
        console.log("Status: " + currentUser.data.status);
        console.log("Dati: " + currentUser.data.data);
        console.log("Message: " + currentUser.data.message);
        if (currentUser.data.status == 200) {
            console.log("User data: " + currentUser.data.data);
            const d = currentUser.data.data;
            if (d) {
                if (d.isAdmin) {
                    displayAddButton(false);
                    displayDeleteButton(true);
                    console.log("Admin logged");
                } else {
                    
                    displayAddButton(true);
                    displayDeleteButton(false);
                    console.log("User logged");
                }
            }
        } else {
            displayAddButton(false);
            displayDeleteButton(false);
            console.log("No user");
        }
    } catch (error: any) {
        console.error("Error fetching user data:", error);
    };


};


const validateImageUrl = (_: any, value: string) => {
    const lowerCaseValue = value.toLowerCase();
    if (lowerCaseValue.startsWith('http') && (lowerCaseValue.endsWith('.png') || lowerCaseValue.endsWith('.jpg'))) {
        return Promise.resolve();
    }
    return Promise.reject('Please enter a valid URL ending with .png or .jpg');
};

function Refuges() {
    const [mountain, setMountain] = useState<Mountain | null>();
    const [loading, setLoading] = React.useState(false);
    const [refuges = [], setRefuges] = useState<Refuge[]>([]);

    const router = useRouter();
    function displayAddRefugeForm(authorized: boolean) {
        console.log((document.getElementById("add-refuge-rating") as HTMLInputElement).value);
        if (authorized) {
            (document.getElementById("add-refuge-form") as HTMLElement).style.display = "block";
            (document.getElementById("add-refuge-mountain") as HTMLInputElement).value = String(mountain?.id);
            (document.getElementById("add-refuge-rating") as HTMLInputElement).value = String(avg_rating);
        } else {
            (document.getElementById("add-refuge-form") as HTMLElement).style.display = "none";
        }
    }

    

    useEffect(() => {
        const queryString = window.location.search;
        const params = new URLSearchParams(queryString);
        const idValue = params.get("mountainId");

        displayAddButton(false);
        displayDeleteButton(false);

        fetchUser();
        
        const fetchRefuges = async (path: string) => {
            try {
                const response = await axios.get(path, { timeout: 10000 });

                const responseData = response.data.data;
                
                if (Array.isArray(responseData)) {
                    console.log("Refuges: " + responseData);
                    setRefuges(responseData);
                } else {
                    console.log("Refuges: " + responseData);
                    console.error('Invalid API response structure:', responseData);
                }
            } catch (error) {
                console.error('Error fetching refuge:', error);
            }
        };


        const fetchMountain = async (path: string) => {
            try {
                const response = await axios.get(path, { timeout: 10000 });
                const responseData = response.data.data;
                if ((responseData)) {
                    setMountain(responseData);
                    (document.getElementById("mountain-name") as HTMLElement).innerHTML = responseData.name;
                    (document.getElementById("mountain") as HTMLElement).style.backgroundImage = `url(${responseData.image})`;
                } else {
                    console.error('Invalid API response structure:', responseData);
                }
            } catch (error) {
                console.error('Error fetching mountain:', error);
            }
        };


        

        if (typeof window !== 'undefined') {
            window.onscroll = function () {
                scrollFunction();
            };
        }

        if (idValue != "0") {
            fetchRefuges('/api/refuges/' + idValue);
            fetchMountain('/api/mountains/' + idValue);
            displayAddButton(true);
        } else {
            displayAddButton(false);
            fetchRefuges('/api/refuges');
            for (let i = 0; i < refuges.length; i++) {
                console.log(refuges[i]);                
            }
            (document.getElementById("mountain-name") as HTMLElement).innerHTML = "Rifugi del Trentino";
        }



    }, []);

    const deleteRefuge = async (id: string) => {
        console.log(id);
        try {
            setLoading(true);
            const { data } = await axios.delete("/api/delete/" + id);
            console.log(data);
            if (data.status == "200") {
                message.success(data.message);
                //document.getElementById(id)?.remove();
            } else {
                message.error(data.message)
            }
            console.log("data");
            
        } catch (error: any) {
            message.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const addRefuge = async (values: Refuge) => {
        
        try {
            setLoading(true);
            values.avgRating = avg_rating <= 0 ? 1 : avg_rating;
            values.mountainId=Number(mountain?.id);
            if (mountain?.id == null||mountain?.id=="0") {
                message.error("Errore: montagna non trovata");
                return;
            }
            
            const { data } = await axios.post("/api/" + Number(mountain?.id) + "/addRefuge", values);
            console.log("Dati: " + data);
            
            if (data.status == "201") {
                values._id = data.data;
                message.success(data.message);
                setRefuges((prevRefuges) => [...prevRefuges, values]);
                console.log("Inserito correttamente")
            } else {
                console.log("Non inserito correttamente");
                message.error(data.message);
            }
        } catch (error: any) {
            message.error("Error: " + error);
        } finally {
            setLoading(false);
        }
    }
    

    return (
        <div>
            <Form id='add-refuge-form' onFinish={addRefuge}>
                <button type='button' className="close-add-refuge" onClick={() => displayAddRefugeForm(false)}>&times;</button>
                <div>
                    <Form.Item name="name" label="Nome rifugio:" className='input' rules={[
                            { required: true,
                                message: 'Please enter a name' },
                            {
                                min: 3
                            }]
                    }>
                    <Input type="text" id="add-refuge-name" />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item name="avgRating" label="Avg rating:" className='input'>
                        <Input type="number" id="add-refuge-rating" disabled/>
                    </Form.Item>
                </div>
                <div>
                    <Form.Item name="description" label="Descrizione:" className='input' >
                    <TextArea id="add-refuge-description" cols={10} rows={4} ></TextArea>
                    </Form.Item>
                </div>
                <div>
                <Form.Item name="mountainId" label="Mountain:" className='input'>
                    <Input  type="Number" id="add-refuge-mountain" disabled />     
                </Form.Item>
                </div>
                <div>
                    <Form.Item name="image" label="Immagine" className='input' rules={[
                        { required: true, message: 'Please enter an image URL' },
                        { validator: validateImageUrl },
                    ]}>
                        <Input type='text' id='add-refuge-image' />
                    </Form.Item>



                </div>
                <div>
                
                    <p>Valutazione:</p>
                    <div id="review">
                        <span className="fa fa-star" onClick={() => setRating(1)}></span>
                        <span className="fa fa-star" onClick={() => setRating(2)}></span>
                        <span className="fa fa-star" onClick={() => setRating(3)}></span>
                        <span className="fa fa-star" onClick={() => setRating(4)}></span>
                        <span className="fa fa-star" onClick={() => setRating(5)}></span>
                    </div>
                </div>
                <Button id='sumbit-add-button' type='primary' htmlType='submit' block loading={loading}>
                    Aggiungi
                </Button>
            </Form>
            <div id='sidebar'>
                <button className="closeBtn" onClick={() => close_sidebar()}>Close &times;</button>
                <a href="#">Montagna</a>
                <a href="#">Lunghezza percorso</a>
                <a href="#">Distanza da Trento</a>
            </div>
            <div id='list-refuges'>
                <div id="mountain" >
                    <Button onClick={() => { topFunction(); displayAddRefugeForm(true) }} id="add-refuge-btn" title="Add refuge">
                        <input type="image"
                            src="https://cdn-icons-png.flaticon.com/512/1237/1237946.png"
                            alt="Add refuge" />
                    </Button>

                    <Button onClick={() => topFunction()} id="up-button" title="Go to top">
                        <input type="image"
                            src="https://cdn-icons-png.flaticon.com/512/9693/9693489.png"
                            alt="Top" />
                    </Button>
                    <h1 id="mountain-name"></h1>


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


                    {refuges.map((refuge) => (

                        <div className="refuge" id={refuge._id} key={String(refuge._id)} /*onClick={() => { fetchUser(); }}*/>
                            <div className="refuge-image" style={{ backgroundImage: `url(${refuge.image})` }}>
                            </div>
                            <div className="info-refuge">
                                <h3> {refuge.name} </h3>
                                <p>Descrizione: {refuge.description} </p>
                                <p>Valutazione:</p>
                                <div id='review' > {Array.from({ length: 5 }, (_, index) => (
                                    <span style={{cursor: 'default'}} key={index} className={`fa fa-star${index < refuge.avgRating ? ' checked' : ''}`}></span>
                                ))}</div>
                            </div>

                            <Button onClick={() => deleteRefuge(refuge._id)} className="delete-refuge-btn" title="Delete refuge">
                                <input type="image"
                                    src="https://static-00.iconduck.com/assets.00/trash-icon-462x512-njvey5nf.png"
                                    alt="Delete" />
                            </Button>

                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}




export default Refuges

/*<div className="refuge">
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
                        <Button onClick={() => topFunction()} className="delete-refuge-btn" title="Delete refuge">
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
                        <Button onClick={() => topFunction()} className="delete-refuge-btn" title="Delete refuge">
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
                        <Button onClick={() => topFunction()} className="delete-refuge-btn" title="Delete refuge">
                            <input type="image"
                                src="https://static-00.iconduck.com/assets.00/trash-icon-462x512-njvey5nf.png"
                                alt="Delete" />
                        </Button>
                    </div> */