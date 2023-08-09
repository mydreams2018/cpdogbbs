import {useContext,useEffect} from 'react';
import {notification } from 'antd';
import MainContext from "../MainContext";
import {useNavigate} from "react-router-dom";
import {selectAuthCount, selectUserMessageAll} from "../utils/HttpUtils";

function NotificationAuth(){
    const userContext = useContext(MainContext);
    const navigate = useNavigate();
    useEffect(()=>{
        let id = "";
        let messageId = "";
        if (userContext && userContext.isManager === 1){
            id = setInterval(()=>{
                selectAuthCount({},(rsp)=>{
                    if (rsp.port > 0 || rsp.answerPort > 0){
                        notification.info({
                            message: "审核提醒",
                            description: `需要审核贴子数量:${rsp.port}、需要审核回贴数量:${rsp.answerPort}`,
                            placement:"topRight",
                            duration:3
                        });
                        document.getElementById("clearMp3").play();
                    }
                });
            },60000);
        }
        if (userContext){
            messageId = setInterval(()=>{
                selectUserMessageAll({pageSize:2,msgState:0},(rsp)=>{
                    if (rsp && rsp.length > 0){
                        notification.info({
                            message: "站内信提醒",
                            description: `有站内信,点击跳转查看...`,
                            placement:"bottomRight",
                            duration:3,
                            onClick:()=>{
                                navigate("/user",{state:{menuData:{openKeys:['edit'],defaultSelectedKey:['edit-2']}}});
                            }
                        });
                        document.getElementById("clearMp3").play();
                    }
                });
            },100000);
        }
        return () => {
            if (id){
                clearInterval(id);
            }
            if (messageId){
                clearInterval(messageId);
            }
        };
    },[userContext]);
    return <></>
}

export default NotificationAuth