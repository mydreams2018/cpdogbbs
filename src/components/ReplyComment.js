import { Avatar, Button, Comment, Form, Input } from 'antd';

import { useState ,useRef,useEffect} from 'react';
import './ReplyComment.css'
const { TextArea } = Input;
const imagesGif = ["01.gif","02.gif","03.gif","04.gif","05.gif","06.gif","07.gif","08.gif","09.gif","10.gif"
                    ,"11.gif","12.gif","13.gif","14.gif","15.gif","16.gif","17.gif","18.gif","19.gif","20.gif"
                    ,"21.gif","22.gif","23.gif","24.gif","25.gif","26.gif"];
const Editor = ({ onChange, onSubmit, value,setReplyMsg }) => {
    const replyGifRef = useRef(null);
    const replyMsgRef = useRef(null);
    const [replyGifShow,setReplyGifShow] = useState(false);
    useEffect(()=>{
        function listen(event) {
            let dom = event.target;
            if(dom.parentElement.id === "replyGifId"){
                replyMsgRef.current.focus();
                let focusStart = replyMsgRef.current.resizableTextArea.textArea.selectionStart;
                let newMsg = replyMsgRef.current.resizableTextArea.props.value.slice(0,focusStart)+
                    `[img-${dom.getAttribute('alt')}]`
                    +replyMsgRef.current.resizableTextArea.props.value.slice(focusStart);
                setReplyMsg(newMsg);
            }
            setReplyGifShow(false);
            console.log("click");
        }
        document.getElementById("root").addEventListener("click", listen, false);
        return () => {
            console.log("清理click事件");
            document.getElementById("root").removeEventListener("click",listen,false);
        };
    },[]);
    const showGifImgs = (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        let parentWidth = replyGifRef.current.parentElement.clientWidth;
        replyGifRef.current.style.maxWidth = parentWidth+"px";
        let maxh = replyGifRef.current.parentElement.getBoundingClientRect().top-68>408?408:replyGifRef.current.parentElement.getBoundingClientRect().top-68;
        replyGifRef.current.style.maxHeight = maxh+"px";
        replyGifRef.current.style.height = "460px";
        replyGifRef.current.style.width = "380px";
        replyGifRef.current.style.left = 0;
        if(replyGifRef.current.style.maxHeight > replyGifRef.current.style.height){
            replyGifRef.current.style.top = "-"+replyGifRef.current.style.height;
        }else{
            replyGifRef.current.style.top = "-"+replyGifRef.current.style.maxHeight;
        }
        setReplyGifShow(true);
    }
   return (
    <>
        <Form.Item>
            <TextArea ref={replyMsgRef} rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" onClick={onSubmit} type="primary">
                回贴
            </Button>
            <Button style={{marginLeft:10}} onClick={showGifImgs}>
                添加gif
            </Button>
            <div id={"replyGifId"} className={"reply-gif scollbox"} ref={replyGifRef} style={{display:!replyGifShow?"none":"block"}}>
                {imagesGif.map((element, index) => {
                   return <img src={"/imagegifs/"+element} title={element} alt={element} key={element} className={"img-gifs"}/>
                })}
                <div style={{clear:"left"}}></div>
            </div>
        </Form.Item>
    </>
)
};

const ReplyComment = (props) => {

    const handleChange = (e) => {
        props.setReplyMsg(e.target.value);
    };

    return (
        <div className={"reply-comment"}>
            <Comment
                avatar={<Avatar src={props.usercon.img} alt={props.usercon.alias} />}
                content={
                    <Editor
                        onChange={handleChange}
                        onSubmit={props.onAddComment}
                        setReplyMsg={props.setReplyMsg}
                        submitting={false}//loading
                        value={props.replyMsg}/>}
            />
        </div>
    );
};

export default ReplyComment;