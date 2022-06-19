import {Avatar, Image, List, Skeleton,Space } from 'antd';
import React , { useEffect, useState } from 'react';
import {StarOutlined,LikeOutlined ,MessageOutlined} from '@ant-design/icons';
import {queryHomeReport} from "../utils/HttpUtils";
import './ListSimple.css'

const IconText = ({icon,text}) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
const ListSimple = (props) => {
    const [list,setList] = useState(()=>[]);
    useEffect(() => {
        queryHomeReport(props.listParam,(rsp)=>{
            setList(rsp.datas);
        });
    }, [props.listParam]);

    return (
        <List
            bordered={true}
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item) => (
                <List.Item
                    actions={[
                        <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                        <IconText icon={LikeOutlined} text={item.experience} key="list-vertical-like-o" />,
                        <IconText icon={MessageOutlined} text={item.replyNumber} key="list-vertical-message" />,
                    ]}>
                    <Skeleton avatar title={false} loading={false} active>
                        <List.Item.Meta
                            avatar={<Avatar src={<Image src={item.userImg} />} />}
                            title={
                                <div>
                                    <a href="https://ant.design">{item.alias}</a>
                                    <span className={"title-time"}>{item.createTime}</span>
                                </div>}
                            description={item.name}
                        />
                    </Skeleton>
                </List.Item>
            )}
        />
    );
};

export default ListSimple;