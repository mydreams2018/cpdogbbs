import {CheckCircleTwoTone, LikeOutlined, MessageTwoTone, StarOutlined} from '@ant-design/icons';
import {Tag,message} from "antd";
import {useState,useEffect,useContext} from 'react';
import './DetailsTitle.css'
import MainContext from "../MainContext";
import {userIsCollect,sendCollect,likePorts} from "../utils/HttpUtils";

function DetailsTitle(props) {
    const usercon = useContext(MainContext);
    const [isCollect, setIsCollect] = useState(()=>({userAccount:""}));
    const [isliked, setIsliked] = useState(()=>false);
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
    useEffect(()=>{
        if(usercon && props.portsInfo.details.likeAccount &&
            props.portsInfo.details.likeAccount.includes(usercon.alias)){
            setIsliked(true);
        }
    });
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
    const addLiked = () => {
        if(usercon){
            likePorts({
                "classId": props.classId,
                "portId": props.portsInfo.id,
                "id": props.portsInfo.details.id
            },(rsp)=>{
                if(rsp.status===1){
                    setIsliked(true);
                    props.portsInfo.details.likeNumber++;
                    message.info("点赞成功!");
                }else{
                    message.error(rsp.msg);
                }
            });
        }
    }
    return (
        <div className={"details-title"}>
            <Tag color={props.portsInfo.portState==='未结'?'':"success"} icon={<CheckCircleTwoTone />}>{props.portsInfo.portState}</Tag>
            <Tag color={"success"} icon={<MessageTwoTone />}>{props.portsInfo.replyNumber}</Tag>
            <Tag color={isCollect.userAccount?"success":""} onClick={addCollect} icon={<StarOutlined />}>{isCollect.userAccount?"取消收藏":"收藏"}</Tag>
            <Tag color={isliked?"success":""}
                 onClick={addLiked}
                 icon={<LikeOutlined />}>{props.portsInfo.details.likeNumber}</Tag>
        </div>
    )
}

export default DetailsTitle