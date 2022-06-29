import {Avatar, Comment, Image, notification} from 'antd';
import {useState,useEffect,useContext,useMemo} from 'react';
import ReplyComment from "./ReplyComment";
import './CommentList.css'
import {queryDetailsTextAnswer,sendReplyAnswer} from "../utils/HttpUtils";
import MainContext from "../MainContext";
import UserDrawer from "./UserDrawer";

const ExampleComment = ({children,replyData,addParentAnswer,hasPortPermission}) => {
    return (
        <Comment
            actions={[<span key="comment-nested-reply-to"  onClick={()=>addParentAnswer(replyData)}>Reply to</span>,
                hasPortPermission && <span onClick={()=>console.log("1111")}>Accept it</span>]
            }
            author={<div className={"reply-title"}>
                <UserDrawer alias={replyData.alias} />
                <span>{replyData.createData}</span>
            </div>}
            avatar={<Avatar src={<Image src={replyData.userImg} />} alt={replyData.alias} />}
            content={
                <p>
                    {replyData.detailsText}
                </p>
            }>
            {children}
        </Comment>)
}
const openNotificationWithIcon = (type,msg) => {
    notification[type]({
        message: '提醒',
        description: msg,
        duration:1.5
    });
};
const sendReplyMessage = {
    detailsText:'',
    portId:0,
    classId:0,
    replyParent:'',
    replyParentText:'',
    replyObject:{}
}

const RenderData = ({details,addParentAnswer,hasPortPermission})=>{
    return details.map(item => {
        if(item.childAnswers){
            return  (<ExampleComment key={item.id} replyData={item} addParentAnswer={addParentAnswer} hasPortPermission={hasPortPermission}>
                <RenderData details={item.childAnswers} addParentAnswer={addParentAnswer} hasPortPermission={hasPortPermission} />
            </ExampleComment>)
        } else {
            return (<ExampleComment key={item.id} replyData={item} addParentAnswer={addParentAnswer} hasPortPermission={hasPortPermission}/>)
        }
    });
}

const CommentList = (props) => {
    const usercon = useContext(MainContext);
    const hasPortPermission =  useMemo(()=>props.portAlias===usercon.alias,[props.portAlias, usercon.alias]);
    const [portDetails,setPortDetails] = useState(() => ({ page:{},datas:[]}));
    const [replyMsg,setReplyMsg] = useState(() => "");

    useEffect(()=>{
        queryDetailsTextAnswer({
            classId: props.classId,
            portId: props.portId,
        },(rsp)=>{
            if(rsp.page){
                setPortDetails(rsp);
                console.log(rsp);
            }
        });
        sendReplyMessage.classId = props.classId;
        sendReplyMessage.portId = props.portId;
    },[props.classId,props.portId]);

    const replyComments = () => {
        if(replyMsg){
            let newReplyMsg = replyMsg;
            if(sendReplyMessage.replyParent && replyMsg.startsWith(sendReplyMessage.replyParentText)){
                newReplyMsg =  replyMsg.replace(sendReplyMessage.replyParentText,"");
            }
            sendReplyMessage.detailsText = newReplyMsg;
            sendReplyAnswer(sendReplyMessage,(rsp)=>{
                if(rsp.status === 1){
                    if(sendReplyMessage.replyParent && replyMsg.startsWith(sendReplyMessage.replyParentText)){
                        sendReplyMessage.replyObject.childAnswers=[{
                            'alias':usercon.alias,
                            'id':rsp.id,
                            'userImg':usercon.img,
                            'detailsText':newReplyMsg
                        }];
                    }else{
                        portDetails.datas.push({
                            'alias':usercon.alias,
                            'id':rsp.id,
                            'userImg':usercon.img,
                            'detailsText':newReplyMsg
                        });
                    }
                    openNotificationWithIcon('success',"回贴成功");
                    setReplyMsg("");
                    //修改返回数据
                }else{
                    openNotificationWithIcon('warning',"发贴失败");
                }
            });
        }
    }
    const addParentAnswer = (e) => {
        sendReplyMessage.replyObject=e;
        sendReplyMessage.replyParent = e.id;
        sendReplyMessage.replyParentText=`[@${e.id}]`;
        setReplyMsg(`[@${e.id}]`);
    }

    return(
    <div className={"comment-list"}>
        <h2 className={"reply-title"}>回贴</h2>
        <RenderData details={portDetails.datas} addParentAnswer={addParentAnswer} hasPortPermission={hasPortPermission}/>
        {usercon &&  <ReplyComment usercon={usercon} onAddComment={replyComments} replyMsg={replyMsg} setReplyMsg={setReplyMsg}/> }
    </div>)
};

export default CommentList;