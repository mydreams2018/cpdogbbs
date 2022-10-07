import {Select, Input, Button, notification} from 'antd';
import {HeartTwoTone,HighlightTwoTone} from '@ant-design/icons';
import BaseCkedit from "./BaseCkedit";
import {useEffect,useState} from 'react';
import {getApiImg,sendPorts} from "../utils/HttpUtils";
import {partitionNames} from "../utils/partitionName";
import './SendPorts.css';

const { Option } = Select;
const children = [];

children.push(<Option key={1}>java</Option>);
children.push(<Option key={2}>react</Option>);
const openNotificationWithIcon = (type,msg) => {
    notification[type]({
        message: '提醒',
        description: msg,
        duration:1.5
    });
};
const portData = {
    classId: 1,
    classIdType: 'java',
    title: '',
    detailsText: '',
    experience: 0,
    image_code: 0,
    name: '',
}

const experienceChange = (e) => {
    portData.experience=e.target.value;
};
const titleChange = (e) => {
    portData.title=e.target.value;
};
const imgcodeChange = (e) => {
    portData.image_code=e.target.value;
};
function SendPorts(){
    const [checkCode, setCheckCode] = useState(() => "");
    const [sendload, setSendload] = useState(() => false);
    const [ptName, setPtName] = useState(()=>partitionNames[portData.classIdType]);
    const [secondPt, setSecondPt] = useState(()=>partitionNames[portData.classIdType][0]);
    useEffect(()=>{
        getApiImg(setCheckCode);
    },[]);
    const handleChange = (value,option ) => {
        portData.classId=value;
        portData.classIdType=option.children;
        setPtName(partitionNames[portData.classIdType]);
        setSecondPt(partitionNames[portData.classIdType][0]);
    };
    const ptHandleChange = (value,option) => {
        setSecondPt(option.children);
    };
    const handleSend = () => {
        setSendload(true);
        portData.name=portData.title;
        if(secondPt!=="全部"){
            portData.partitionName=secondPt;
        }
        sendPorts(portData,(rsp)=>{
            if(rsp.status===1){
                openNotificationWithIcon('success',rsp.msg);
            }else{
                openNotificationWithIcon('warning',rsp.msg);
                getApiImg(setCheckCode);
            }
            setSendload(false);
        });
    };
    return(
        <div className={"send-port"}>
            <div className={"send-title"}>
                <Select
                    size={'middle'}
                    defaultValue={portData.classIdType}
                    onChange={handleChange}
                    style={{
                        width: 160
                    }}>
                    {children}
                </Select>
                <Select
                    size={'middle'}
                    value={secondPt}
                    onChange={ptHandleChange}
                    style={{width: 160}}>
                    {ptName.map((city,inx) => (
                        <Option key={inx}>{city}</Option>
                    ))}
                </Select>
                <Input placeholder="赏积分"
                       style={{
                           width: 128
                       }}
                       maxLength={2}
                       onChange={experienceChange}
                       prefix={ <HeartTwoTone twoToneColor="#eb2f96" />} />
                <Input placeholder="贴子标题" className={"send-con"}
                       maxLength={64}
                       onChange={titleChange}
                       prefix={ <HighlightTwoTone />} />
            </div>
            <BaseCkedit linkContext={portData} />
            <div className={"send-message"}>
                <Input
                    onChange={imgcodeChange}
                    maxLength={3}
                    prefix={<span>{checkCode}=</span>}
                    style={{width:160}}
                    placeholder={"请回答:"}/>
                <Button type="primary" onClick={handleSend} size="large" loading={sendload} >
                    发贴
                </Button>
            </div>

        </div>
    )
}

export default SendPorts