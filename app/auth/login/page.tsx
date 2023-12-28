'use client'
import { getAntdFieldRequiredRule } from '@/app/helpers/validation';
import Button from 'antd/es/button';
import Form from 'antd/es/form';
import React from 'react'
import axios from "axios";
import message from 'antd/es/message';
import { useRouter } from "next/navigation";
import Script from 'next/script';
import '../auth.css'
interface userType {
    email: string;
    password: string;
}

function Login() {
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    const onLogin = async (values: userType) => {
        try {
            setLoading(true);
            const { data } = await axios.post("/api/auth/login", values);
            console.log("data: " + data);
            console.log("data.status: " + data.status);
            if (data.status == "200") {
                message.success(data.message);
                router.push("/");
            } else {
                message.error(data.message)
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
                    <h1 className="form-title">Login</h1>
                    <div className="form">
                        <Form className='' layout='vertical'
                            onFinish={onLogin} >
                            <Form.Item name="email" label="email" rules={getAntdFieldRequiredRule('Please input your email')}>
                                <input type='email' id='email-input' name='login_email' placeholder='' />
                            </Form.Item>
                            <Form.Item name="password" label="password" rules={getAntdFieldRequiredRule('Please input your password')}>
                                <input type='password' id='pass-input' />
                            </Form.Item>
                            <Button className='sumbit-form-button' type='primary' htmlType='submit' block loading={loading}>
                                Login
                            </Button>
                        </Form>
                        <div id="link-register">
                            <a href="/auth/register/">Non hai un account? Registati</a>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Login