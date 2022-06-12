import { Avatar, List, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { CheckCircleTwoTone, HeartTwoTone,MessageTwoTone } from '@ant-design/icons';

import './ListSimple.css'
const count = 10;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const ListSimple = () => {
    const [list, setList] = useState([]);
    useEffect(() => {
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                setList(res.results);
            });
    }, []);

    return (
        <List
            bordered={true}
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item) => (
                <List.Item
                    actions={[<CheckCircleTwoTone twoToneColor="#52c41a" />, <HeartTwoTone title={"已经"} twoToneColor="#eb2f96" />]}>
                    <Skeleton avatar title={false} loading={item.loading} active>
                        <List.Item.Meta
                            avatar={<Avatar src={item.picture.large} />}
                            title={
                                <div>
                                    <a href="https://ant.design">{item.name?.last}</a>
                                    <span className={"title-time"}>2020-20-20</span>
                                    <span className={"title-time"} > <MessageTwoTone />23</span>
                                </div>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                    </Skeleton>
                </List.Item>
            )}
        />
    );
};

export default ListSimple;