import './Login.css';
import {useEffect,useState} from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import {autoViewformlogin} from "../utils/customEvent";

import {getApiImg} from '../utils/HttpUtils'

function Login (props){
    const [checkCode, setCheckCode] = useState("");
    useEffect(()=>{
        getApiImg(setCheckCode);
        autoViewformlogin();
    },[]);
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

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
                    <div className="login-form-forgot">
                        {checkCode}
                    </div>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    <a href={"/register"} > Register now</a>
                    <a className="login-form-forgot" href={"/forget"}>
                        Forgot password
                    </a>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;