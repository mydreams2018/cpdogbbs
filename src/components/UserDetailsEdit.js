import { Tabs,Upload,message,Input,Button } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useState ,useContext } from 'react';
import MainContext from "../MainContext";
import {updateUserDes,updateUserPassword} from "../utils/HttpUtils";
import './UserDetailsEdit.css'
const { TextArea } = Input;

const { TabPane } = Tabs;

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      || file.type === 'image/gif';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
        message.error('Image must smaller than 1MB!');
    }
    return isJpgOrPng && isLt1M;
};
let destemp = {
    description:"",
    email:"email",
    fromCity:"地球"
};
const rePassword = {
    password:'',
    rePass:'',
    rePassRepeet:''
}
const passwordChange = (e) => {
    rePassword.password=e.target.value;
}
const rePassChange = (e) => {
    rePassword.rePass=e.target.value;
}
const rePassRepeetChange = (e) => {
    rePassword.rePassRepeet=e.target.value;
}
const changePasswordSend = () => {
    if(rePassword.password && rePassword.rePass && rePassword.rePassRepeet){
        if(rePassword.rePass===rePassword.rePassRepeet){
            updateUserPassword(rePassword,(rsp)=>{
                if(rsp.status===1){
                    message.info(rsp.msg);
                }else{
                    message.error(rsp.msg);
                }
            });
        }else{
            message.error('新密码二次内容不一致');
        }
    }else{
        message.error('数据不能为空');
    }
    console.log(rePassword);
}
const descriptionChange = (e) => {
    destemp.description = e.currentTarget.value;
}
const emailChange = (e) => {
    destemp.email = e.target.value;
}

function UserDetailsEdit(props) {
    const usercon = useContext(MainContext);
    destemp.description=usercon.description;
    destemp.email = usercon.email || "";
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(usercon.img);
    const [email, setEmail] = useState(destemp.email?true:false);
    const postDescription = () => {
        if(destemp.description && destemp.email){
            updateUserDes(destemp,(rsp)=>{
                if(rsp.status===1){
                    setEmail(true);
                    message.info(rsp.msg);
                }else{
                    message.error(rsp.msg);
                }
            });
        }
    }
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            if(!loading){
                setLoading(true);
            }
            return;
        }
        if (info.file.status === 'done') {
            if(info.file.response.status===1){
                setImageUrl(info.file.response.action);
            }else{
                message.error(info.file.response.msg);
            }
        }
        if (info.file.status === 'error') {
            message.error(info.file.response.msg);
        }
        setLoading(false);
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}>
                Upload
            </div>
        </div>
    );
    return(
        <div className={"user-details-edit"}>
            <Tabs defaultActiveKey="1" centered>
                <TabPane tab="头像上传" key="1">
                    <Upload
                        name="file"
                        maxCount={1}
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="/api/user/uploadImg"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}>
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="avatar"
                                style={{width: '100%'}}/>)
                            : (uploadButton)}
                    </Upload>
                </TabPane>
                <TabPane tab="个人描述信息" key="2" >
                    <TextArea
                        showCount
                        allowClear
                        maxLength={100}
                        defaultValue={usercon.description}
                        onChange={descriptionChange} />
                    <Input addonBefore="输入密保问题" defaultValue={usercon.email} onChange={emailChange}
                           disabled={email} maxLength={66} showCount={true}/>

                    <Button type="primary" style={{marginTop:10}} onClick={postDescription}>
                        提并修改
                    </Button>
                </TabPane>
                <TabPane tab="修改密码" key="3">
                    <div className={"user-details-repas"}>
                        <Input.Password addonBefore="输入旧密码" onChange={passwordChange}
                               maxLength={12} showCount={true}/>
                        <Input.Password addonBefore="输入新密码" onChange={rePassChange}
                               maxLength={12} showCount={true}/>
                        <Input.Password addonBefore="再次确认新密码" onChange={rePassRepeetChange}
                               maxLength={12} showCount={true}/>
                        <Button type="primary" style={{marginTop:10}} onClick={changePasswordSend}>
                            提并修改
                        </Button>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default UserDetailsEdit;