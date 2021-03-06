import './Login.css';
import {useEffect,useState} from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {Button, Checkbox, Form, Input, notification} from 'antd';
import {autoViewformlogin} from "../utils/customEvent";
import cookies from "../utils/Cookies";
import moment from "moment";
import {getApiImg,userLogin} from '../utils/HttpUtils'
const openNotificationWithIcon = (type,msg) => {
    notification[type]({
        message: '提醒',
        description: msg,
        duration:1.5
    });
};

function Login (props){
    const [checkCode, setCheckCode] = useState("");
    useEffect(()=>{
        getApiImg(setCheckCode);
        autoViewformlogin();
    },[]);
    const onFinish = (values) => {
        userLogin(values,(rsp)=>{
            if(rsp.status===1){
                openNotificationWithIcon('success',"登录成功");
                props.onUserChange(rsp.msg);
                if("true" === rsp.rememberMe){
                    cookies.setItem('jwtToken',rsp.jwtToken,moment().add(7, 'days').toDate(),"/");
                }else {
                    cookies.setItem('jwtToken',rsp.jwtToken,null,"/");
                }
            }else{
                openNotificationWithIcon('warning',rsp.msg);
                getApiImg(setCheckCode);
            }
        });
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
                    name="image_code"
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
                    <Form.Item name="remember-me" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <span className="login-form-forgot">
                        {checkCode}
                    </span>
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