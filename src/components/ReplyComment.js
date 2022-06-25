import { Avatar, Button, Comment, Form, Input } from 'antd';

import { useState } from 'react';
import './ReplyComment.css'
const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </>
);

const ReplyComment = (props) => {
    const [submitting, setSubmitting] = useState(false);


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
                        submitting={submitting}//loading
                        value={props.replyMsg}/>}
            />
        </div>
    );
};

export default ReplyComment;