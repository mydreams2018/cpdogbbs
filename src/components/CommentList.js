import { Avatar, Comment ,Image } from 'antd';
import './CommentList.css'

const ExampleComment = ({ children }) => (
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
    </Comment>
);

const CommentList = () => (
    <div className={"comment-list"}>
        <h2 className={"reply-title"}>回贴</h2>
        <ExampleComment >
            <ExampleComment>
                <ExampleComment />
                <ExampleComment />
            </ExampleComment>
        </ExampleComment>
    </div>

);

export default CommentList;