import {useContext,useEffect} from 'react';
import {notification } from 'antd';
import MainContext from "../MainContext";
import {selectAuthCount} from "../utils/HttpUtils";

function NotificationAuth(){
    const usercon = useContext(MainContext);
    useEffect(()=>{
        let id = "";
        if (usercon && usercon.isManager === 1){
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
        return () => {
            if (id){
                clearInterval(id);
            }
        };
    },[usercon]);
    return <></>
}

export default NotificationAuth