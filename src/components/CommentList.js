import { Avatar, Comment ,Image } from 'antd';
import {useState,useEffect} from 'react';
import ReplyComment from "./ReplyComment";
import './CommentList.css'
import {queryDetailsTextAnswer} from "../utils/HttpUtils";

const ExampleComment = ({ children,replyData }) => {
    return (
        <Comment
            actions={[<span key="comment-nested-reply-to">Reply to</span>]}
            author={<a>Han Solo</a>}
            avatar={<Avatar src={<Image src="/logo192.png"/>} alt="Han Solo" />}
            content={
                <p>
                    We supply a series of design principles, practical patterns and high quality design
                    resources (Sketch and Axure).
                </p>
            }>
            {children}
        </Comment>)
}

const replyComments = (obj) => {
    console.log(obj);
}

/* useCallback(fn, deps) 相当于 useMemo(() => fn, deps)*/

const CommentList = (props) => {
    const [portDetails,setPortDetails] = useState(() => ({ page:{},datas:[]}));

    useEffect(()=>{
        queryDetailsTextAnswer({
            classId: props.classId,
            portId: props.portId,
        },(rsp)=>{
            if(rsp.page){
                setPortDetails(rsp);
            }
        });
    },[props.classId,props.portId]);

    return(
    <div className={"comment-list"}>
        <h2 className={"reply-title"}>回贴</h2>
        <ExampleComment replyData={"dfsdf"}>
            <ExampleComment>
                <ExampleComment />
                <ExampleComment />
            </ExampleComment>
        </ExampleComment>
        <ReplyComment onAddComment={replyComments} />
    </div>)
};

export default CommentList;