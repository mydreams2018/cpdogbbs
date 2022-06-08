import './Login.css';
import {useEffect,useState} from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import {autoViewformlogin} from "../utils/customEvent";
import {useNavigate } from "react-router-dom";

import axios from "axios";

function Login (props){
    let navigate = useNavigate();
    const [checkCode, setCheckCode] = useState(()=>{
        axios({
            method: 'get',
            url: 'https://www.kungreat.cn/api/image',
            headers: {'Content-Type': 'text/plain',
                "Accept":"*/*"},
            responseType: 'text'
        }).then(function (response) {
            if(response.data){
                setCheckCode(response.data);
            }
        }).catch(function (error) {
            console.log(error);
        });
    });
    useEffect(()=>{
        autoViewformlogin();
    });
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    const navigatePath = (e,ph)=>{
        e.preventDefault();
        navigate(ph,{replace:false});
    }
    return (
        <div id="view-form-login">
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}>
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item
                    name="checkcode"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your checkcode!',
                        },
                    ]}>
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="请回答:"
                    />
                </Form.Item>

                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <a className="login-form-forgot" href="javascript:void(0)">
                        {checkCode}
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    <a href="javascript:void(0)" onClick={(event)=>navigatePath(event,'/register')}> Register now</a>
                    <a className="login-form-forgot" href="javascript:void(0)" onClick={(event)=>navigatePath(event,'/forget')}>
                        Forgot password
                    </a>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;