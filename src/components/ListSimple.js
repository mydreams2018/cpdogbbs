import {Avatar, Image, List, Pagination, Skeleton, Space} from 'antd';
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
    const [totalRow,setTotalRow] = useState(()=>1);
    useEffect(() => {
        queryHomeReport(props.listParam,(rsp)=>{
            setList(rsp.datas);
            setTotalRow(rsp.page.totalRow);
        });
    }, [props.listParam]);

    return (
        <>
            <List
                bordered={true}
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={list}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <IconText icon={StarOutlined} text={1} key="list-vertical-star-o" />,
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
            {
                props.showPaging && <Pagination total={totalRow} defaultCurrent={props.listParam.currentPage}
                          onChange={props.pageChange}/>
            }
        </>
    );
};

export default ListSimple;