import {useEffect, useState} from 'react';
import {queryReplyWeek} from "../utils/HttpUtils";

function HomeHook(init){
    const [weekReplyUser, setWeekReplyUser] = useState(()=>init);
    useEffect(()=>{
        queryReplyWeek({},(rsp)=>{
            if(rsp instanceof Array){
                setWeekReplyUser(rsp);
            }
        });
    },[]);
    return [weekReplyUser, setWeekReplyUser];
}

export default HomeHook;