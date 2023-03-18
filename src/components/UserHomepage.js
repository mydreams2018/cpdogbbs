import {Button, Descriptions, Image} from 'antd';
import MainContext from "../MainContext";
import {useContext} from 'react';
import {LogoutOutlined} from "@ant-design/icons";
import {userLogout} from "../utils/HttpUtils";
import cookies from "../utils/Cookies";

function UserHomepage(props) {
    const usercon = useContext(MainContext);
    console.log(usercon);
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
            <Descriptions.Item label="呢称">{usercon.alias}</Descriptions.Item>
            <Descriptions.Item label="性别">纯爷们</Descriptions.Item>
            <Descriptions.Item label="状态">{usercon.state?'正常':'异常'}</Descriptions.Item>
            <Descriptions.Item label="注册时间" >{usercon.registerTime}</Descriptions.Item>
            <Descriptions.Item label="vip等级" span={2}>{usercon.vipLevel}</Descriptions.Item>
            <Descriptions.Item label="认证信息" span={3} style={{color:"red"}}>
                {usercon.authenticate}
            </Descriptions.Item>
            <Descriptions.Item label="总积分数">{usercon.accumulatePoints}</Descriptions.Item>
            <Descriptions.Item label="头像" span={1}>
                <Image width={64} src={usercon.img}/>
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
                {usercon.description}
            </pre>
            </Descriptions.Item>
        </Descriptions>
    );
}

export default UserHomepage;