import {Badge, Descriptions, Drawer, Image} from 'antd';
import {useState} from 'react';
import {queryUserByAlias} from "../utils/HttpUtils";

function UserDrawer(props) {
    const [userInfo, setUserInfo] = useState(() => {});
    const [visible, setVisible] = useState(() => false);
    const queryUserAlias = () => {
        queryUserByAlias({"alias": props.alias}, (rsp) => {
            if (rsp.alias) {
                setUserInfo(rsp);
                setVisible(true);
            }
        })
    }
    const onClose = () => {
        setVisible(false);
    };
    return (
        <>
            <span hv={"tomoto"} onClick={queryUserAlias} style={{cursor: "pointer"}}>{props.alias}</span>
            <Drawer width={560} title="用户信息" placement="right" onClose={onClose} visible={visible}>

                {userInfo && <Descriptions bordered style={{textAlign: 'center'}}>
                    <Descriptions.Item label="呢称" span={2}>{userInfo.alias}</Descriptions.Item>
                    <Descriptions.Item label="状态">{userInfo.state ? '正常' : '异常'}</Descriptions.Item>
                    <Descriptions.Item label="注册时间">{userInfo.registerTime}</Descriptions.Item>
                    <Descriptions.Item label="邮箱" span={2}>{userInfo.email}</Descriptions.Item>
                    <Descriptions.Item label="Status" span={3}>
                        <Badge status="processing" text="Running"/>
                    </Descriptions.Item>
                    <Descriptions.Item label="总积分数">{userInfo.accumulatePoints}</Descriptions.Item>
                    <Descriptions.Item label="头像" span={2}>
                        <Image width={64} src={userInfo.img}/>
                    </Descriptions.Item>
                    <Descriptions.Item label="个人描述" span={3}>
                        <pre style={{
                            whiteSpace: "pre-wrap",
                            wordWrap: "break-word",
                            overflowWrap: "break-word"
                        }}>
                            {userInfo.description}
                        </pre>
                    </Descriptions.Item>
                </Descriptions> }

            </Drawer>
        </>
    );
}

export default UserDrawer