import { Button, Result } from 'antd';
import React from 'react';
import './NoFound.css'
function NoFound () {

    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={() => window.location.href='/'}>Back Home</Button>}
        />
    );
}

export default NoFound;