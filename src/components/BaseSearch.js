import { useMemo} from 'react';
import {Select, Input, Tabs} from 'antd';
import {FireOutlined, UndoOutlined} from '@ant-design/icons';
import {partitionNames} from "../utils/partitionName";
import './BaseSearch.css'
const { Option } = Select;
const { Search } = Input;
const {TabPane} = Tabs;

const children = [<Option key={""}>全部</Option>,<Option key={"未结"}>未结</Option>,<Option key={"已结"}>已结</Option>];

function BaseSearch(props){
    const ptName = useMemo(()=>{
        if(props.basePath.includes("java")){
            return partitionNames["java"];
        }else if(props.basePath.includes("react")){
            return partitionNames["react"];
        }else{
            return [];
        }
    },[props.basePath]);
    return(
        <div className={"base-search"}>
            <Select defaultValue="全部" style={{ width: 130 }} onChange={props.handleChange}>
                {children}
            </Select>
            <Select defaultValue="全部" style={{ width: 130 }} onChange={props.ptHandleChange} >
                {ptName.map((city) => (
                    <Option key={city}>{city}</Option>
                ))}
            </Select>
            <Search
                placeholder="input search text"
                onSearch={props.onSearch}
                style={{
                    width: 200,
                }}
            />
            <Tabs defaultActiveKey="create_time" onChange={props.onTabChange}>
                <TabPane tab={
                    <span>
                        <UndoOutlined />
                          最新
                        </span>
                } key="create_time">
                </TabPane>
                <TabPane tab={
                    <span>
                         <FireOutlined />
                          热议
                        </span>
                } key="reply_number">
                </TabPane>
            </Tabs>
        </div>
    )
}

export default BaseSearch