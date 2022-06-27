import {CheckCircleTwoTone, MessageTwoTone, StarOutlined} from '@ant-design/icons';
import {Tag} from "antd";
import {useState,useEffect,useContext} from 'react';
import './DetailsTitle.css'
import MainContext from "../MainContext";
import {userIsCollect,sendCollect} from "../utils/HttpUtils";

function DetailsTitle(props) {
    console.log(props);
    const usercon = useContext(MainContext);
    const [isCollect, setIsCollect] = useState(()=>({userAccount:""}));
    useEffect(()=>{
        if(usercon){
            userIsCollect({
                "classId": props.classId,
                "portId": props.portsInfo.id
            },(rsp)=>{
                if(rsp.userAccount){
                    setIsCollect(rsp);
                }else{
                    setIsCollect({userAccount:""});
                }
            });
        }
    },[props.classId, props.portsInfo.id, usercon]);

    const addCollect = () => {
        if(usercon){
            sendCollect({
                "classId": props.classId,
                "portId": props.portsInfo.id,
                "id": isCollect.id,
                "portTitle":props.portsInfo.name
            },(rsp)=>{
                if(rsp.userAccount){
                    setIsCollect(rsp);
                }else{
                    setIsCollect({userAccount:""});
                }
            });
        }
    }
    return (
        <div className={"details-title"}>
            <Tag color={props.portsInfo.portState==='未结'?'':"success"} icon={<CheckCircleTwoTone />}>{props.portsInfo.portState}</Tag>
            <Tag color={"success"} icon={<MessageTwoTone />}>{props.portsInfo.replyNumber}</Tag>
            <Tag color={isCollect.userAccount?"success":""} onClick={addCollect} icon={<StarOutlined />}>{isCollect.userAccount?"取消收藏":"收藏"}</Tag>
        </div>
    )
}

export default DetailsTitle