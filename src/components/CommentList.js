import {Avatar, Comment, Image, notification,Button} from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import {useState,useEffect,useContext,useMemo} from 'react';
import ReplyComment from "./ReplyComment";
import './CommentList.css'
import {queryDetailsTextAnswer,sendReplyAnswer,acceptReply} from "../utils/HttpUtils";
import MainContext from "../MainContext";
import UserDrawer from "./UserDrawer";
let classIdLink = '';
let currentPage = 1;
const ExampleComment = ({children,replyData,addParentAnswer,hasPortPermission}) => {
    const accaptAnswer = () => {
        acceptReply({
            id: replyData.id,
            classId: classIdLink
        },(rsp)=>{
            if(rsp.status===1){
                openNotificationWithIcon('success',"接受成功");
            }else{
                openNotificationWithIcon('warning',rsp.msg);
            }
        });
    }
    return (
        <Comment
            actions={[<span key="comment-nested-reply-to"  onClick={()=>addParentAnswer(replyData)}>Reply to</span>,
                hasPortPermission && <span onClick={accaptAnswer}>Accept it</span>,
                replyData.isAdoption && <CheckCircleTwoTone twoToneColor="#52c41a" /> ]
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
    const hasPortPermission =  useMemo(()=>props.portAlias===usercon.alias&&props.portState==="未结",
        [props.portAlias, props.portState, usercon.alias]);
    const [portDetails,setPortDetails] = useState(() => ({ page:{totalPage:1},datas:[]}));
    const [replyMsg,setReplyMsg] = useState(() => "");
    classIdLink = props.classId;
    useEffect(()=>{
        currentPage = 1;
        queryDetailsTextAnswer({
            classId: props.classId,
            portId: props.portId,
            currentPage:currentPage
        },(rsp)=>{
            if(rsp.page){
                setPortDetails(rsp);
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
                        if(Array.isArray(sendReplyMessage.replyObject.childAnswers)){
                            sendReplyMessage.replyObject.childAnswers.push({
                                    'alias':usercon.alias,
                                    'id':rsp.id,
                                    'userImg':usercon.img,
                                    'detailsText':newReplyMsg
                                });
                        }else{
                            sendReplyMessage.replyObject.childAnswers=[{
                                'alias':usercon.alias,
                                'id':rsp.id,
                                'userImg':usercon.img,
                                'detailsText':newReplyMsg
                            }];
                        }
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

    const loadMores = () => {
        currentPage++;
        queryDetailsTextAnswer({
            classId: props.classId,
            portId: props.portId,
            currentPage:currentPage
        },(rsp)=>{
            if(rsp.datas){
                setPortDetails({page:rsp.page,datas:portDetails.datas.concat(rsp.datas)});
            }
        });
    }

    return(
    <div className={"comment-list"}>
        <h2 className={"reply-title"}>回贴</h2>
        <RenderData details={portDetails.datas} addParentAnswer={addParentAnswer} hasPortPermission={hasPortPermission}/>
        {portDetails.page.totalPage > currentPage &&
            <div
            style={{
                textAlign: 'center',
                marginTop: 12,
                height: 32,
                lineHeight: '32px',
            }}>
            <Button onClick={loadMores}>loading more</Button>
        </div>}
        {usercon &&  <ReplyComment usercon={usercon} onAddComment={replyComments} replyMsg={replyMsg} setReplyMsg={setReplyMsg}/> }
    </div>)
};

export default CommentList;