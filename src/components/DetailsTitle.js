import './DetailsTitle.css';
import {CheckCircleTwoTone, LikeOutlined, MessageTwoTone, StarOutlined} from '@ant-design/icons';
import {Tag,message} from "antd";
import {useState,useEffect,useContext} from 'react';
import MainContext from "../MainContext";
import {userIsCollect,sendCollect,likePorts} from "../utils/HttpUtils";

function DetailsTitle(props) {
    const userContext = useContext(MainContext);
    const [isCollect, setIsCollect] = useState(()=>({userAccount:""}));
    const [isLiked, setIsLiked] = useState(()=>false);
    useEffect(()=>{
        if(userContext){
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
    },[props.classId, props.portsInfo.id, userContext]);
    useEffect(()=>{
        if(userContext && props.portsInfo.details.likeAccount &&
            props.portsInfo.details.likeAccount.includes(userContext.alias)){
            setIsLiked(true);
        }
    });
    const addCollect = () => {
        if(userContext){
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
        }else{
            message.error("请先登录...");
        }
    }
    const addLiked = () => {
        if(userContext){
            likePorts({
                "classId": props.classId,
                "portId": props.portsInfo.id,
                "id": props.portsInfo.details.id
            },(rsp)=>{
                if(rsp.status===1){
                    setIsLiked(true);
                    props.portsInfo.details.likeNumber++;
                    message.info("点赞成功!");
                }else{
                    message.error(rsp.msg);
                }
            });
        }else{
            message.error("请先登录...");
        }
    }
    return (
        <div className={"details-title"}>
            <Tag color={props.portsInfo.portState==='未结'?'':"success"} icon={<CheckCircleTwoTone />}>{props.portsInfo.portState}</Tag>
            <Tag color={"success"} icon={<MessageTwoTone />}>{props.portsInfo.replyNumber}</Tag>
            <Tag color={isCollect.userAccount?"success":""} onClick={addCollect} icon={<StarOutlined />}>{isCollect.userAccount?"取消收藏":"收藏"}</Tag>
            <Tag color={isLiked?"success":""}
                 onClick={addLiked}
                 icon={<LikeOutlined />}>{props.portsInfo.details.likeNumber}</Tag>
        </div>
    )
}

export default DetailsTitle