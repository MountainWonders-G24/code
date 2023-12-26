'use client'
import { getAntdFieldRequiredRule } from '@/app/helpers/validation';
import Button from 'antd/es/button';
import Form from 'antd/es/form';
import message from 'antd/es/message';
import axios from 'axios';
import React from 'react'
import '../auth.css'
// import './register.js'

import { useRouter } from "next/navigation";
interface userType {
    name: string;
    surname: string;
    email: string;
    password: string;
}

let currentTab: number = 0; // Current tab is set to be the first tab (0)



// Set n to a number
function showTab(n: number): void {
    // This function will display the specified tab of the form...
    const x = document.getElementsByClassName("tab") as HTMLCollectionOf<HTMLElement>;
    // Check if the element at index n exists before accessing its style property
    if (x[n]) {
        x[n].style.display = "block";
    }

    // ... and fix the Previous/Next buttons:
    const prevBtnElement = document.getElementById("prevBtn");
    if (prevBtnElement){
        if (n === 0) {
            prevBtnElement.style.display = "none";
        } else {
            prevBtnElement.style.display = "inline";
        }
    }
        

    if (n === (x.length - 1)) {
        const nextBtnElement = document.getElementById("nextBtn") ;
        if (nextBtnElement){
            nextBtnElement.innerHTML = "Submit";
            (nextBtnElement as HTMLButtonElement).type = "submit"; 
            
        }
        
    } else {
        const nextBtnElement = document.getElementById("nextBtn");
        if (nextBtnElement){
            nextBtnElement.innerHTML = "Next";
        }
    }

    // ... and run a function that displays the correct step indicator:
    
}

function nextPrev(n: number): boolean {
    // This function will figure out which tab to display
    const x = document.getElementsByClassName("tab") as HTMLCollectionOf<HTMLElement>;
    // Exit the function if any field in the current tab is invalid:
    




    if (n == 1 && !validateForm()) {
        return false;
    }
    x[currentTab].style.display = "none";  

    // If you have reached the end of the form... :
    if (currentTab >= x.length-1) {
        //...the form gets submitted:
        if(!validateForm()){
            console.log("form not valid");
        }else{
            console.log("submitting form");
                // window.location.href = "../auth/login/";
        }
        return false;
    }
    else if ((validateForm() && n==1) || n==-1) {
        currentTab = currentTab + n;
    }else{
        
    }

    // Otherwise, display the correct tab:
    showTab(currentTab);

    return true;
}



function validateForm(): boolean {
    // This function deals with validation of the form fields
    let x: HTMLCollectionOf<HTMLElement>, y: HTMLCollectionOf<HTMLInputElement>, i: number, valid: boolean = true;
    x = document.getElementsByClassName("tab") as HTMLCollectionOf<HTMLElement>;
    y = x[currentTab].getElementsByTagName("input") as HTMLCollectionOf<HTMLInputElement>;
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if (y[i].value === "" ) {
            // add an "invalid" class to the field:
            if(!y[i].className.endsWith("invalid")){
                y[i].className += " invalid";
            }
            // and set the current valid status to false:
            valid = false;
        }else if (!y[i].className.endsWith("invalid")){
            y[i].className.replace(" invalid", "");
        }
    }

    // If the valid status is true, mark the step as finished and valid:
    // if (valid) {
    //     (document.getElementsByClassName("step")[currentTab] as HTMLElement).className += " finish";
    // }

    return valid; // return the valid status
}




import { useEffect } from 'react';




function Register() {
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    useEffect(() => {
        showTab(0);
    }, []);


    const onRegister = async (values: userType) => {
            try {
                setLoading(true);
                const { data } = await axios.post("/api/auth/register", values);
                console.log("data: " + data);
    
                if (data.status == "201") {
                    
                    message.success(data.message);
                    router.push("/")
                } else {
                    message.error(data.message);
                }
            } catch (error: any) {
                
                message.error(error.response.data.message);
            } finally {
                setLoading(false);
            }
    };

    return (
        <div>
            <div className="center-page">
                <div className="login-form">
                    <h1 className="form-title">Register</h1>
                    <div className="form">
                        <Form id='register-form' layout='vertical'
                            onFinish={(values => onRegister(values))}>
                            <div className='tab'>
                                <Form.Item id='name' name="name" label="name" className='input' rules={[
                                        {   
                                            required : true,
                                            message : "Please input your name",
                                        },
                                        {
                                            min: 3,
                                            message : "name not valid"
                                        }
                                    ]}>
                                    <input type='text' id='name-input' name='login_email' placeholder='' />
                                </Form.Item>
                                <Form.Item name="surname" label="surname" className='input' rules={[
                                        {
                                            required : true,
                                            message : "Please input your surname",
                                        },
                                        {
                                            min: 3,
                                            message : "surname not valid"
                                        }
                                    ]}>
                                    <input type='text' id='surname-input' />
                                </Form.Item>
                            </div>
                            <div className='tab'>
                                <Form.Item className = "input" name="email" label="email"  rules={getAntdFieldRequiredRule('Please input your password')}>
                                    <input type='email' id='email-input' name='login_email' placeholder='' />
                                </Form.Item>
                                <Form.Item name="password" label="password" className='input' rules={getAntdFieldRequiredRule('Please input your password')}>
                                    <input type='password' id='pass-input' />
                                </Form.Item>
                            </div>
                            <Button onClick={() => nextPrev(-1)} id='prevBtn' className='sumbit-form-button' type='primary' htmlType='button' >
                                Previous
                            </Button>
                            <Button onClick={() => nextPrev(1)} id='nextBtn' className='sumbit-form-button' type='primary' htmlType='button' >
                                Next
                            </Button>
                            
                        </Form>
                    </div>
                </div>
            </div>
        </div>

    )
}




export default Register