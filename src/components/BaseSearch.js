import {Select, Input, Tabs} from 'antd';
import {FireOutlined, UndoOutlined} from '@ant-design/icons';
import './BaseSearch.css'
const { Option } = Select;
const { Search } = Input;
const {TabPane} = Tabs;

const children = [<Option key={1}>全部</Option>,<Option key={2}>未结</Option>,<Option key={3}>已结</Option>,<Option key={4}>精华</Option>];

function BaseSearch(props){
    return(
        <div className={"base-search"}>
            <Select defaultValue="全部" style={{ width: 130 }} onChange={props.handleChange}>
                {children}
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