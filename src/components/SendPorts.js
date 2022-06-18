import { Select,Input,Button } from 'antd';
import {HeartTwoTone} from '@ant-design/icons';
import BaseCkedit from "./BaseCkedit";
import {useEffect,useState} from 'react';
import {getApiImg} from "../utils/HttpUtils";
import './SendPorts.css';

const { Option } = Select;
const children = [];

children.push(<Option key={"1"}>java</Option>);
children.push(<Option key={"2"}>react</Option>);

const portData = {
    classId: 1,
    title: '',
    cusType1: 'java',
    cusVersion1: 1111,
    useides1: 1111,
    detailsText: 1,
    experience: 0,
    image_code: -22,
    datatype: 'java',
    dataversion: 1111,
    useides: 1111,
    name: '',
}

const handleSend = () => {
    console.log(portData);
};
const handleChange = (value) => {
    console.log(`Selected: ${value}`);
};
function SendPorts(){
    const [checkCode, setCheckCode] = useState(() => "");
    useEffect(()=>{
        getApiImg(setCheckCode);
    },[]);
    return(
        <div className={"send-port"}>
            <div className={"send-title"}>
                <Select
                    size={'middle'}
                    defaultValue="java"
                    onChange={handleChange}
                    style={{
                        width: 160
                    }}>
                    {children}
                </Select>
                <Input placeholder="赏积分"
                       style={{
                           width: 128
                       }}
                       prefix={ <HeartTwoTone twoToneColor="#eb2f96" />} />
                <Input placeholder="贴子标题" className={"send-con"}
                       maxLength={64}
                       prefix={ <HeartTwoTone twoToneColor="#eb2f96" />} />
            </div>
            <BaseCkedit linkContext={portData} />
            <div className={"send-message"}>
                <Input
                    prefix={<span>{checkCode}=</span>}
                    style={{width:160}}
                    placeholder={"请回答:"}/>
                <Button type="primary" onClick={handleSend} size="large" loading={false} >
                    发贴
                </Button>
            </div>

        </div>
    )
}

export default SendPorts