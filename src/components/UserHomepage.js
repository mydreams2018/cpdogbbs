import {Badge, Descriptions, Image} from 'antd';
import MainContext from "../MainContext";
import {useContext} from 'react';

function UserHomepage(props) {
    const usercon = useContext(MainContext);
    console.log(usercon);
    return (
        <Descriptions title="用户详情" bordered style={{textAlign: 'center'}}>
            <Descriptions.Item label="呢称">{usercon.alias}</Descriptions.Item>
            <Descriptions.Item label="性别">纯爷们</Descriptions.Item>
            <Descriptions.Item label="状态">{usercon.state?'正常':'异常'}</Descriptions.Item>
            <Descriptions.Item label="注册时间" >{usercon.registerTime}</Descriptions.Item>
            <Descriptions.Item label="邮箱" span={2}>{usercon.email}</Descriptions.Item>
            <Descriptions.Item label="Status" span={3}>
                <Badge status="processing" text="Running"/>
            </Descriptions.Item>
            <Descriptions.Item label="总积分数">{usercon.accumulatePoints}</Descriptions.Item>
            <Descriptions.Item label="头像" span={2}>
                <Image width={64} src={usercon.img}/>
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