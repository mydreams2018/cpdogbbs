import {Button, Form, Input, notification} from 'antd';
import React,{useState,useEffect} from 'react';
import {getApiImg,rePassWord} from "../utils/HttpUtils";
import {useNavigate} from "react-router-dom";
import './Forget.css'
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const openNotificationWithIcon = (type,msg) => {
    notification[type]({
        message: '提醒',
        description: msg,
        duration:1.5
    });
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

function Forget() {
    const navigate = useNavigate();
    const [checkCode, setCheckCode] = useState("");
    const onFinish = (values) => {
        rePassWord(values.user,(rps)=>{
            if(rps.status===1){
                openNotificationWithIcon('success',rps.msg);
                navigate("/user");
            }else{
                openNotificationWithIcon('warning',rps.msg);
                getApiImg(setCheckCode);
            }
        })
    };
    useEffect(()=>{
        getApiImg(setCheckCode);
    },[]);
    return (
        <Form {...layout} className={"forget-view"} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}
              style={{width: 360,paddingTop:20}}>
            <Form.Item
                name={['user', 'account']}
                label="用户名"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name={['user', 'email']}
                label="密保"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name={['user', 'rePass']}
                label="新密码"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item name={['user', 'image_code']}
                       rules={[
                           {
                               required: true,
                           },
                       ]} label="验证码">
                <Input suffix={checkCode ? checkCode:<span />} />
            </Form.Item>
            <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>
        </Form>
    );
}

export default Forget;