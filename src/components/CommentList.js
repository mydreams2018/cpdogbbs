import {Avatar, Comment, Image, notification,Button} from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';
import {useState,useEffect,useContext,useMemo,useRef} from 'react';
import ReplyComment from "./ReplyComment";
import './CommentList.css'
import {queryDetailsTextAnswer,sendReplyAnswer,acceptReply} from "../utils/HttpUtils";
import MainContext from "../MainContext";
import UserDrawer from "./UserDrawer";
let classIdLink = '';
let currentPage = 1;
const imagesGif = ["[img-01.gif]","[img-02.gif]","[img-03.gif]","[img-04.gif]","[img-05.gif]","[img-06.gif]","[img-07.gif]","[img-08.gif]","[img-09.gif]","[img-10.gif]"
    ,"[img-11.gif]","[img-12.gif]","[img-13.gif]","[img-14.gif]","[img-15.gif]","[img-16.gif]","[img-17.gif]","[img-18.gif]","[img-19.gif]","[img-20.gif]"
    ,"[img-21.gif]","[img-22.gif]","[img-23.gif]","[img-24.gif]","[img-25.gif]","[img-26.gif]"];
const imagesGifPath = ["01.gif","02.gif","03.gif","04.gif","05.gif","06.gif","07.gif","08.gif","09.gif","10.gif"
    ,"11.gif","12.gif","13.gif","14.gif","15.gif","16.gif","17.gif","18.gif","19.gif","20.gif"
    ,"21.gif","22.gif","23.gif","24.gif","25.gif","26.gif"];

const ExampleComment = ({children,replyData,addParentAnswer,hasPortPermission}) => {
    const replyMsgCover = useRef(null);
    useEffect(()=>{
        function changeImgGif() {
            const regex = /\[img-\d\d\.gif]/;
            let msgContent = replyData.detailsText;
            let indexOfFirst = 0;
            while((indexOfFirst = msgContent.search(regex)) !== -1){
                let gifStr = msgContent.substring(indexOfFirst,indexOfFirst+12);
                for (let i = 0; i < imagesGif.length; i++) {
                    if(imagesGif[i] === gifStr){
                        replyMsgCover.current.appendChild(
                            document.createTextNode(msgContent.substring(0,indexOfFirst)));
                        let faceImg = document.createElement("img");
                        faceImg.src=`/imagegifs/${imagesGifPath[i]}`;
                        faceImg.title=`${imagesGifPath[i]}`;
                        replyMsgCover.current.appendChild(faceImg);
                        msgContent = msgContent.substring(indexOfFirst+12);
                        break;
                    } else if(i === imagesGif.length-1){
                        replyMsgCover.current.appendChild(
                            document.createTextNode(msgContent.substring(0,indexOfFirst+12)));
                        msgContent = msgContent.substring(indexOfFirst+12);
                    }
                }
            }
            if(msgContent){
                replyMsgCover.current.appendChild(document.createTextNode(msgContent));
            }
        }
        changeImgGif();
    },[]);
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
                replyData.isAdoption && <CheckCircleTwoTone twoToneColor="#52c41a" style={{fontSize:'30px'}}/> ]
            }
            author={<div className={"reply-title"}>
                <UserDrawer alias={replyData.alias} />
                <span>{replyData.createData}</span>
            </div>}
            avatar={<Avatar src={<Image src={replyData.userImg} />} alt={replyData.alias} />}
            content={
                <pre className={"reply-pre"} ref={replyMsgCover}>

                </pre>
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
    const userContext = useContext(MainContext);
    const hasPortPermission =  useMemo(()=>props.portAlias===userContext.alias&&props.portState==="未结",
        [props.portAlias, props.portState, userContext.alias]);
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
            }else{
                //@用户 回贴没有配对上的情况
                sendReplyMessage.replyParent=null;
            }
            sendReplyMessage.detailsText = newReplyMsg;
            sendReplyAnswer(sendReplyMessage,(rsp)=>{
                if(rsp.status === 1){
                    if(sendReplyMessage.replyParent && replyMsg.startsWith(sendReplyMessage.replyParentText)){
                        if(Array.isArray(sendReplyMessage.replyObject.childAnswers)){
                            sendReplyMessage.replyObject.childAnswers.push({
                                    'alias':userContext.alias,
                                    'id':rsp.id,
                                    'userImg':userContext.img,
                                    'detailsText':newReplyMsg
                                });
                        }else{
                            sendReplyMessage.replyObject.childAnswers=[{
                                'alias':userContext.alias,
                                'id':rsp.id,
                                'userImg':userContext.img,
                                'detailsText':newReplyMsg
                            }];
                        }
                    }else{
                        portDetails.datas.push({
                            'alias':userContext.alias,
                            'id':rsp.id,
                            'userImg':userContext.img,
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
        window.scrollTo( 0, document.documentElement.scrollHeight);
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
        {userContext &&  <ReplyComment usercon={userContext} onAddComment={replyComments} replyMsg={replyMsg} setReplyMsg={setReplyMsg}/> }
    </div>)
};

export default CommentList;