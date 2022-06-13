import {Select, Input, Tabs} from 'antd';
import {FireOutlined, UndoOutlined} from '@ant-design/icons';
import './BaseSearch.css'
const { Option } = Select;
const { Search } = Input;
const {TabPane} = Tabs;

const children = [<Option key={1}>全部</Option>,<Option key={2}>未结</Option>,<Option key={3}>已结</Option>,<Option key={4}>精华</Option>];

const handleChange = (e) => {
    console.log(e);
};
const onSearch = (value) => {
    console.log(value);
}
const onTabChange = (value) => {
    console.log(value);
}
function BaseSearch(){
    return(
        <div className={"base-search"}>
            <Select defaultValue="全部" style={{ width: 130 }} onChange={handleChange}>
                {children}
            </Select>
            <Search
                placeholder="input search text"
                onSearch={onSearch}
                style={{
                    width: 200,
                }}
            />
            <Tabs defaultActiveKey="1" onChange={onTabChange}>
                <TabPane tab={
                    <span>
                        <UndoOutlined />
                          最新
                        </span>
                } key="1">
                </TabPane>
                <TabPane tab={
                    <span>
                         <FireOutlined />
                          热议
                        </span>
                } key="2">
                </TabPane>
            </Tabs>
        </div>
    )
}

export default BaseSearch