import { Modal ,message} from 'antd';
import { useState,useEffect } from 'react';
import PreContent from "./PreContent";
import {managerAuthPortDetails,editPortDetails} from "../utils/HttpUtils";

function AuthMainPorts(props){
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [details, setDetails] = useState({detailsText:''});
    useEffect(()=>{
        managerAuthPortDetails({id:props.editParams.id,classId:props.editParams.classId,portIsauth:props.editParams.authFlag},
            (rsp)=>{
            if(rsp && rsp.details){
                setDetails(rsp.details);
            }
        });
    },[props.editParams.id,props.editParams.classId,props.editParams.authFlag]);

    const handleOk = () => {
        setConfirmLoading(true);
        editPortDetails({
            detailsText:details.detailsText,
            classId:props.editParams.classId,
            id:details.id
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
        <div className={"edit-main-ports"}>
            <Modal
                title="审核贴子内容"
                width={710}
                visible={props.visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                cancelText={"不通过"}
                okText={"通过"}>
                <PreContent portsInfoDetails={details} />
            </Modal>
        </div>
    );
}

export default AuthMainPorts