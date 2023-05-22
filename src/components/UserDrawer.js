import { Descriptions, Drawer, Image} from 'antd';
import {useState} from 'react';
import {queryUserByAlias} from "../utils/HttpUtils";

function UserDrawer(props) {
    const [userInfo, setUserInfo] = useState( {alias:''});
    const [visible, setVisible] = useState(() => false);
    const [drawerWidth, setDrawerWidth] = useState(560);
    const queryUserAlias = () => {
        let windowWidth = document.documentElement.clientWidth;
        if (windowWidth < 610){
            windowWidth = Math.floor(windowWidth * 0.9);
            setDrawerWidth(windowWidth);
        }
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
            {userInfo.alias &&
                <Drawer width={drawerWidth} zIndex={1000} title="用户信息" placement="right" onClose={onClose} visible={visible}>
                 <Descriptions bordered style={{textAlign: 'center'}}>
                    <Descriptions.Item label="呢称" span={2}>{userInfo.alias}</Descriptions.Item>
                    <Descriptions.Item label="状态">{userInfo.state ? '正常' : '异常'}</Descriptions.Item>
                    <Descriptions.Item label="注册时间">{userInfo.registerTime}</Descriptions.Item>
                    <Descriptions.Item label="vip等级" span={2}>{userInfo.vipLevel}</Descriptions.Item>
                    <Descriptions.Item label="认证信息" span={3} style={{color:"red"}}>
                        {userInfo.authenticate}
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
                </Descriptions>
            </Drawer>
            }
        </>
    );
}

export default UserDrawer