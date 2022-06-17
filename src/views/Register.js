import {getApiImg,getRigister} from '../utils/HttpUtils'
import {useEffect,useState} from 'react';
import {useNavigate} from "react-router-dom";
import {
    Button,
    Form,
    Input,
    Select,notification
} from 'antd';
const { Option } = Select;
const openNotificationWithIcon = (type,msg) => {
    notification[type]({
        message: '提醒',
        description: msg,
        duration:1.5
    });
};
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

function Register(){
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );
    const [checkCode, setCheckCode] = useState("");
    useEffect(()=>{
        getApiImg(setCheckCode);
    },[]);
    const onFinish = (values) => {
        getRigister(values,(res)=>{
            if(res.status===1){
                openNotificationWithIcon('success',res.msg);
                navigate("/user");
            }else{
                openNotificationWithIcon('warning',res.msg);
                getApiImg(setCheckCode);
            }
        });
    };
    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
                residence: ['zhejiang', 'hangzhou', 'xihu'],
                prefix: '86',
            }}
            scrollToFirstError
            style={{
                width:480 ,
                margin:'0 auto'
            }}
        >
            <Form.Item
                name="account"
                label="account"
                rules={[
                    {
                        required: true,
                        message: 'Please input your account!',
                    },
                ]}>
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="repassword"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="alias"
                label="Nickname"
                tooltip="What do you want others to call you?"
                rules={[
                    {
                        required: true,
                        message: 'Please input your nickname!',
                        whitespace: true,
                    },
                ]}>
                <Input />
            </Form.Item>

            <Form.Item
                name="phone"
                label="Phone Number">
                <Input
                    addonBefore={prefixSelector}
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>


            <Form.Item
                name="intro"
                label="Intro"
                rules={[
                    {
                        required: true,
                        message: 'Please input Intro',
                    },
                ]}>
                <Input.TextArea showCount maxLength={100} />
            </Form.Item>

            <Form.Item
                name="gender"
                label="Gender"
                rules={[
                    {
                        required: true,
                        message: 'Please select gender!',
                    },
                ]}
            >
                <Select placeholder="select your gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                </Select>
            </Form.Item>

                        <Form.Item label="Captcha" extra="We must make sure that your are a human."
                            name="image_code"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the captcha you got!',
                                },
                            ]}>
                            <Input suffix={checkCode ? checkCode:<span />} />
                        </Form.Item>


            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
}

export default Register;