import { Button, Result } from 'antd';
import React from 'react';
import './NoFound.css'
import {useNavigate} from "react-router-dom";

function NoFound () {
    const navigate = useNavigate();
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={()=> navigate("/")}>Back Home</Button>}
        />
    );
}

export default NoFound;