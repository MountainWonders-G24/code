'use client'
import { getAntdFieldRequiredRule } from '@/app/helpers/validation';
import Button from 'antd/es/button';
import Form from 'antd/es/form';
import message from 'antd/es/message';
import axios from 'axios';
import React from 'react';
import '../auth.css';
import { useEffect } from 'react';
import { currentTab, showTab, handleInputChange, nextPrev } from '../script.tsx';

import { useRouter } from "next/navigation";
interface userType {
    name: string;
    surname: string;
    email: string;
    password: string;
}


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
                router.push("/");
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
                                        required: true,
                                        message: "Please input your name",
                                    },
                                    {
                                        min: 3,
                                        message: "name not valid"
                                    }
                                ]}>
                                    <input type='text' id='name-input' name='login_email' placeholder='' onInput={(event) => handleInputChange(event)} />
                                </Form.Item>
                                <Form.Item name="surname" label="surname" className='input' rules={[
                                    {
                                        required: true,
                                        message: "Please input your surname",
                                    },
                                    {
                                        min: 3,
                                        message: "surname not valid"
                                    }
                                ]}>
                                    <input type='text' id='surname-input' onInput={(event) => handleInputChange(event)} />
                                </Form.Item>
                            </div>
                            <div className='tab'>
                                <Form.Item className="input" name="email" label="email" rules={[
                                    {
                                        required: true,
                                        message: "Please input your email",
                                    },
                                    {
                                        min: 5,
                                        message: "Email not valid"
                                    }
                                ]}>
                                    <input type='email' id='email-input' name='login_email' onInput={(event) => handleInputChange(event)} placeholder='' />
                                </Form.Item>
                                <Form.Item name="password" label="password" className='input' rules={[
                                    {
                                        required: true,
                                        message: "Please input your Password",
                                    },
                                    {
                                        min: 8,
                                        message: "Password not valid"
                                    }
                                ]}>
                                    <input type='password' id='pass-input' onInput={(event) => handleInputChange(event)} />
                                </Form.Item>
                            </div>
                            <Button onClick={() => nextPrev(-1)} id='prevBtn' className='sumbit-form-button' type='primary' htmlType='button' >
                                Previous
                            </Button>
                            <Button onClick={() => nextPrev(1)} id='nextBtn' className='sumbit-form-button' type='primary' htmlType='button' >
                                Next
                            </Button>

                        </Form>
                        <div id="link-register">
                            <a href="/auth/login/">Hai già un account? Accedi</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}




export default Register