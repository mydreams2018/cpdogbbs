import {Button, Descriptions, Image} from 'antd';
import MainContext from "../MainContext";
import {useContext} from 'react';
import {LogoutOutlined} from "@ant-design/icons";
import {userLogout} from "../utils/HttpUtils";
import cookies from "../utils/Cookies";

function UserHomepage() {
    const userContext = useContext(MainContext);
    console.log(userContext);
    const logout = () => {
        userLogout({},(rsp)=>{
            if(rsp.status===1){
                cookies.removeItem("jwtToken","/");
                cookies.removeItem("JSESSIONID","/");
                cookies.removeItem("remember-me","/");
                window.location.reload();
            }
        });
    };
    return (
        <Descriptions title="用户详情" bordered style={{textAlign: 'center'}}>
            <Descriptions.Item label="呢称">{userContext.alias}</Descriptions.Item>
            <Descriptions.Item label="城市">{userContext.fromCity}</Descriptions.Item>
            <Descriptions.Item label="状态">{userContext.state?'正常':'异常'}</Descriptions.Item>
            <Descriptions.Item label="注册时间" >{userContext.registerTime}</Descriptions.Item>
            <Descriptions.Item label="vip等级" span={2}>{userContext.vipLevel}</Descriptions.Item>
            <Descriptions.Item label="认证信息" span={3} style={{color:"red"}}>
                {userContext.authenticate}
            </Descriptions.Item>
            <Descriptions.Item label="总积分数">{userContext.accumulatePoints}</Descriptions.Item>
            <Descriptions.Item label="头像" span={1}>
                <Image width={64} src={userContext.img}/>
            </Descriptions.Item>
            <Descriptions.Item label="退出" span={1}>
                <Button type="primary" danger icon={<LogoutOutlined />} onClick={logout}>
                    logout
                </Button>
            </Descriptions.Item>
            <Descriptions.Item label="个人描述" span={3}>
            <pre style={{
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                overflowWrap: "break-word"
            }}>
                {userContext.description}
            </pre>
            </Descriptions.Item>
        </Descriptions>
    );
}

export default UserHomepage;