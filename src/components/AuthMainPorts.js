import { Modal ,Button,message} from 'antd';
import { useState,useEffect } from 'react';
import PreContent from "./PreContent";
import {managerAuthPortDetails,managerUpdatePortAuth} from "../utils/HttpUtils";

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

    const handleOk = (auth) => {
        setConfirmLoading(true);
        managerUpdatePortAuth({
            authFlag:auth,
            classId:props.editParams.classId,
            id:details.portId
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
                onCancel={handleCancel}
                footer={[
                    <Button key="nosuccess" type="primary" onClick={()=>handleOk(2)}  loading={confirmLoading}>
                        不通过
                    </Button>,
                    <Button key="success" danger onClick={()=>handleOk(1)}  loading={confirmLoading}>
                        通过
                    </Button>
                ]}>
                <PreContent portsInfoDetails={details} />
            </Modal>
        </div>
    );
}

export default AuthMainPorts