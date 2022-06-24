import {Avatar, Comment, Image, notification} from 'antd';
import {useState,useEffect,useContext} from 'react';
import ReplyComment from "./ReplyComment";
import './CommentList.css'
import {queryDetailsTextAnswer,sendReplyAnswer} from "../utils/HttpUtils";
import MainContext from "../MainContext";

const ExampleComment = ({ children,replyData,addParentAnswer }) => {
    return (
        <Comment
            actions={[<span key="comment-nested-reply-to"  onClick={()=>addParentAnswer(replyData)}>Reply to</span>]}
            author={<a>{replyData.alias}</a>}
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

const RenderData = ({details,addParentAnswer})=>{
    return details.map(item => {
        if(item.childAnswers){
            return  (<ExampleComment key={item.id} replyData={item} addParentAnswer={addParentAnswer} >
                <RenderData details={item.childAnswers} addParentAnswer={addParentAnswer} />
            </ExampleComment>)
        } else {
            return (<ExampleComment key={item.id} replyData={item} addParentAnswer={addParentAnswer}/>)
        }
    });
}

const CommentList = (props) => {
    const usercon = useContext(MainContext);
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
        <RenderData details={portDetails.datas} addParentAnswer={addParentAnswer} />
        {usercon &&  <ReplyComment onAddComment={replyComments} replyMsg={replyMsg} setReplyMsg={setReplyMsg}/> }
    </div>)
};

export default CommentList;