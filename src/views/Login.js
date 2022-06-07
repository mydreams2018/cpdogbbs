import './Login.css';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

function Login(props){
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
                        placeholder="checkcode"
                    />
                </Form.Item>

                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <a className="login-form-forgot" href="">
                        check-code
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    <a href=""> Register now</a>
                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;