'use client'
import { getAntdFieldRequiredRule } from '@/app/helpers/validation';
import Button from 'antd/es/button';
import Form from 'antd/es/form';
import React from 'react'
import {useRouter} from "next/router";
import axios from "axios";
import message from 'antd/es/message';

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
            await axios.post("/api/auth/login", values);
            message.success("Login successful");
            router.push("/");
        } catch (error: any) {
            message.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='grid grid-cols-2 min-h-screen'>
                <div className='h-full bg-black flex items-center justify-center'>
                    <h1 className='text-7xl font-bold text-red-500'>MY</h1>
                    <h1 className='text-7xl font-bold text-gray-500'>-</h1>
                    <h1 className='text-7xl font-bold text-yellow-700'>SHOP</h1>
                </div>
                <div>
                    <Form className='w-[500px] gap-5' layout='vertical'
                        onFinish={onLogin} >
                        <h1 className='text-2x1 font-bold'>Login</h1>
                        <hr />
                        <br />
                        <Form.Item name="email" label="Email" rules = {getAntdFieldRequiredRule('Please input your email')}>
                            <input type='email' />
                        </Form.Item>
                        <Form.Item name="password" label="password" rules={getAntdFieldRequiredRule('Please input your password')}>
                            <input type='password' />
                        </Form.Item>
                        <Button type='primary' htmlType='submit' block loading={loading}>
                            Login
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}
export default Login