import { Tabs,Upload,message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

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

function UserDetailsEdit(props) {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
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
                <TabPane tab="Tab 2" key="2">
                    Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                    Content of Tab Pane 3
                </TabPane>
            </Tabs>
        </div>
    )
}

export default UserDetailsEdit;