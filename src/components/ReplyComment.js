import { Avatar, Button, Comment, Form, Input, List } from 'antd';

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
    const [value, setValue] = useState('');

    const handleSubmit = () => {
        if (!value) return;
        props.onAddComment(value);
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <div className={"reply-comment"}>
            <Comment
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                content={
                    <Editor
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={submitting}//loading
                        value={value}/>}
            />
        </div>
    );
};

export default ReplyComment;
