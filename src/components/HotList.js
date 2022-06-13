import {Avatar, Image, List} from 'antd';
import './HotList.css'
const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
    {
        title: 'Ant Design Title 4',
    },
    {
        title: 'Ant Design Title 4',
    },
    {
        title: 'Ant Design Title 4',
    }
];
const HotList = () => (
    <List
        className={"hot-list scollbox"}
        header={<h4 style={{textAlign:"center",color:"#389e0d",marginBottom:0,lineHeight:'30px'}}>推荐贴</h4>}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
            <List.Item>
                <List.Item.Meta
                    avatar={<Avatar src={<Image src={"https://joeschmoe.io/api/v1/random"} />} />}
                    title={<a href="https://ant.design">{item.title}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
            </List.Item>
        )}
    />
);

export default HotList;