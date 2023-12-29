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
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { ref } from 'firebase/database';
import { logout } from "@/app/script.tsx"
import 'app/globals.css'
import './refuges.css'
import {
    scrollFunction,
    topFunction,
    open_sidebar,
    close_sidebar,
    displayAddButton,
    displayDeleteButton,
    avg_rating,
    setRating
} from './script.tsx'


const { TextArea } = Input;

let idValue = "0";
type Mountain = {
    id: string;
    name: string;
    description: String;
    image: string;
}

type Refuge = {
    _id: string;
    name: String;
    avgRating: number;
    description: String;
    mountainId: Number;
    image: String; //nel diagramma delle classi un rifugio non ha un'immagine mentre qui gliela mettiamo???????
}

const fetchUser = async () => {
    try {
        logout();
        const currentUser = await axios.get('/api/auth/currentUser');
        if (currentUser.data.status == 200) {
            if (currentUser.data.data) {
                if (currentUser.data.data.isAdmin) {
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
    let [refuges = [], setRefuges] = useState<Refuge[]>([]);

    

    const router = useRouter();
    function displayAddRefugeForm(authorized: boolean) {
        if (authorized) {
            (document.getElementById("add-refuge-form") as HTMLElement).style.display = "block";
            (document.getElementById("add-refuge-mountain") as HTMLInputElement).value = String(mountain?.id);
            (document.getElementById("add-refuge-rating") as HTMLInputElement).value = String(avg_rating);
        } else {
            (document.getElementById("add-refuge-form") as HTMLElement).style.display = "none";
        }
    }

    const fetchRefuges = async (path: string) => {
        try {
            const response = await axios.get(path);
            const responseData = response.data.data;

            if (Array.isArray(responseData)) {
                let array: Refuge[] = [];
                refuges = new Array<Refuge>();
                for (let i = 0; i < responseData.length; i++) {
                    const q: Refuge = {
                        _id: responseData[i]._id,
                        name: responseData[i].name,
                        avgRating: responseData[i].avgRating,
                        description: responseData[i].description,
                        mountainId: responseData[i].mountainId,
                        image: responseData[i].image
                    };
                    refuges.push(q);
                }
                setRefuges(refuges);
            } else {
                console.error('Invalid API response structure:', responseData);
            }
        } catch (error) {
            console.error('Error fetching refuge:', error);
        }
    };

    const fetchSearchRefuge = async () => {
        try {
            let id = "ciao";
            const searchString= (document.getElementById("research-input") as HTMLInputElement).value ;
            console.log("Elemento ricercato: " + searchString);
            console.log('/api/refuges/search/'+ id);
            const response = await axios.get('/api/refuges/search/'+ searchString);
            console.log("Elemento ricercato: " + (document.getElementById("research-input") as HTMLInputElement).value );
            const responseData = response.data.data;
            console.log("Fetch search response: " + responseData);
            console.log("E' array: " + Array.isArray(responseData));
            if (!Array.isArray(responseData)) {
                const queryString = window.location.search;
                const params = new URLSearchParams(queryString);
                idValue = params.get("mountainId") || "0";
                fetchRefuges('/api/refuges/' + idValue);
                return;
            } 
            if (responseData.length==0|| responseData.length==undefined){
                message.error("No refuges founded");
                const queryString = window.location.search;
                const params = new URLSearchParams(queryString);
                idValue = params.get("mountainId") || "0";
                fetchRefuges('/api/refuges/' + idValue);
                return;
            }
            else  {
                refuges = new Array<Refuge>();
                for (let i = 0; i < responseData.length; i++) {
                    const q: Refuge = {
                        _id: responseData[i]._id,
                        name: responseData[i].name,
                        avgRating: responseData[i].avgRating,
                        description: responseData[i].description,
                        mountainId: responseData[i].mountainId,
                        image: responseData[i].image
                    };
                    refuges.push(q);
                }
                setRefuges(refuges);
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

    useEffect(() => {
        displayAddButton(false);
        displayDeleteButton(false);
        const queryString = window.location.search;
        const params = new URLSearchParams(queryString);
        idValue = params.get("mountainId") || "0";

        fetchUser();
        fetchRefuges('/api/refuges/' + idValue);

        if (typeof window !== 'undefined') {
            window.onscroll = function () {
                scrollFunction();
            };
        }
        displayAddButton(true);
        if (idValue != "0") {
            fetchMountain('/api/mountains/' + idValue);
        } else {
            (document.getElementById("mountain-name") as HTMLElement).innerHTML = "Rifugi del Trentino";
        }
        
    }, []);

    

    const deleteRefuge = async (id: string) => {
        try {
            setLoading(true);
            const { data } = await axios.delete("/api/delete/" + id);
            if (data.status == "200") {
                message.success(data.message);
                window.location.reload();
            } else {
                message.error(data.message)
            }
            fetchRefuges('/api/refuges/' + idValue);
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

            var id;
            if (mountain?.id == null || mountain?.id == "0") {
                id = "1";
                values.mountainId = Number("1");
            }
            else {
                id = Number(mountain?.id);
                values.mountainId = Number(mountain?.id);
            }
            const { data } = await axios.post("/api/" + id + "/addRefuge", values);

            if (data.status == "201") {
                values._id = data.data;
                message.success(data.message);
                setRefuges((prevRefuges) => [...prevRefuges, values]);
            } else {
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
                        {
                            required: true,
                            message: 'Please enter a name'
                        },
                        {
                            min: 3
                        }]
                    }>
                        <Input type="text" id="add-refuge-name" />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item name="avgRating" label="Avg rating:" className='input'>
                        <Input type="number" id="add-refuge-rating" disabled />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item name="description" label="Descrizione:" className='input' >
                        <TextArea id="add-refuge-description" cols={10} rows={4} ></TextArea>
                    </Form.Item>
                </div>
                <div>
                    <Form.Item name="mountainId" label="Mountain:" className='input'>
                        <Input type="Number" id="add-refuge-mountain" disabled />
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
                                        alt="Search button" 
                                        onClick={fetchSearchRefuge}/>
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
                                    <span style={{ cursor: 'default' }} key={index} className={`fa fa-star${index < refuge.avgRating ? ' checked' : ''}`}></span>
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