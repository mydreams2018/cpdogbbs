import { Modal ,message,Input } from 'antd';
import { useState } from 'react';
import {editPortDetails} from "../utils/HttpUtils";
const { TextArea } = Input;
let dataTemp = "";
function EditReplyPorts(props){
    const [confirmLoading, setConfirmLoading] = useState(false);
    const handleOk = () => {
        setConfirmLoading(true);
        props.editDatas.detailsText = dataTemp;
        editPortDetails({
            detailsText:props.editDatas.detailsText,
            classId:props.editDatas.classId,
            id:props.editDatas.id
        },(rsp)=>{
            if(rsp.status===1){
                message.info("success");
            }else{
                message.error(rsp.msg);
            }
            props.setVisible(false);
            setConfirmLoading(false);
        });
    };
    const handleCancel = () => {
        props.setVisible(false);
    };

    const textChange = (e) => {
        dataTemp= e.currentTarget.value;
    }

    return (
        <div className={"edit-reply-ports"}>
            <Modal
                title="编辑回贴内容"
                width={500}
                visible={props.visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}>
                <TextArea defaultValue={props.editDatas.detailsText} onChange={textChange}/>
            </Modal>
        </div>
    );
}

export default EditReplyPorts