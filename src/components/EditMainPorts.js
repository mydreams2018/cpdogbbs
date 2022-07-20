import { Modal ,message} from 'antd';
import { useState,useEffect } from 'react';
import BaseCkedit from "./BaseCkedit";
import {queryPortDetails,editPortDetails} from "../utils/HttpUtils";

function EditMainPorts(props){
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [details, setDetails] = useState({detailsText:''});
    useEffect(()=>{
        queryPortDetails({id:props.editParams.id,classId:props.editParams.classId},
            (rsp)=>{
            if(rsp && rsp.details){
                setDetails(rsp.details);
            }
        });
    },[props.editParams.id,props.editParams.classId]);

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
                title="编辑贴子内容"
                width={710}
                visible={props.visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}>
                <BaseCkedit linkContext={details} />
            </Modal>
        </div>
    );
}

export default EditMainPorts