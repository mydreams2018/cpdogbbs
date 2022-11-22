import {Modal, message, Input, Button} from 'antd';
import { useState } from 'react';
import {managerUpdateReplyPort} from "../utils/HttpUtils";
const { TextArea } = Input;

function AuthReplyPorts(props){
    const [confirmLoading, setConfirmLoading] = useState(false);
    const handleOk = (flag) => {
        setConfirmLoading(true);
        managerUpdateReplyPort({
            authFlag:flag,
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

    return (
        <div className={"auth-replyports"}>
            <Modal
                title="审核回贴内容"
                width={500}
                visible={props.visible}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={[
                    <Button key="nosuccess" type="primary" onClick={()=>handleOk(2)}  loading={confirmLoading}>
                        不通过
                    </Button>,
                    <Button key="success" danger onClick={()=>handleOk(1)}  loading={confirmLoading}>
                        通过
                    </Button>
                ]}>
                <TextArea disabled={true} defaultValue={props.editDatas.detailsText} />
            </Modal>
        </div>
    );
}

export default AuthReplyPorts