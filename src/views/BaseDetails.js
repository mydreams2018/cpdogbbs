import './BaseDetails.css'
import {useState,useEffect} from 'react';
import {useLocation} from "react-router-dom";
import DetailsTitle from "../components/DetailsTitle";
import { Avatar, Image,Tag  } from 'antd';
import {DownOutlined} from '@ant-design/icons';
import PreContent from "../components/PreContent";
import CommentList from "../components/CommentList";
import HotList from "../components/HotList";
import Cooperation from "../components/Cooperation";
import {queryPortDetails} from "../utils/HttpUtils";
import UserDrawer from "../components/UserDrawer";

function BaseDetails(props){
    const locationPath = useLocation();
    const [portsInfo,setPortsInfo] = useState(()=>{
        return {
            name:'',
            details:{},
            alias:'',
            vipLevel:1,
            createTime:'',
            experience:''
        }
    });
    useEffect(()=>{
        queryPortDetails({
            classId:props.classId,
            id:locationPath.state.id
        },(rsp)=>{
            if(rsp.id){
                setPortsInfo(rsp);
            }
        });
    },[locationPath.state.id, props.classId]);
    return (
        <div className={"base-details"}>
            <div className={"details-left"}>
                <h3>{portsInfo.name}</h3>
                <DetailsTitle portsInfo={portsInfo} classId={props.classId} />
                <div className={"user-list"} style={{backgroundColor:"#f0f2f5"}}>
                    <Avatar size={64} src={<Image src={portsInfo.userImg} style={{width: 64}}/>}/>
                    <UserDrawer alias={portsInfo.alias} />
                    <Tag icon={<DownOutlined />} color="success">{portsInfo.vipLevel}</Tag>
                    <Tag color="success">{portsInfo.createTime}</Tag>
                    <span>悬赏: {portsInfo.experience}飞吻</span>
                </div>
                <PreContent portsInfoDetails={portsInfo.details} />
                <CommentList classId={props.classId} portId={locationPath.state.id} portAlias={portsInfo.alias}/>
            </div>
            <div className={"details-right"}>
                <HotList classId={props.classId} basePath={props.basePath} />
                <Cooperation />
            </div>
        </div>
    )
}

export default BaseDetails