import { List, Typography } from 'antd';
const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

function Cooperation(){
    return(
        <List
            style={{backgroundColor:'#fff',marginTop:20}}
            header={<div>Header</div>}
            bordered
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    <Typography.Text mark style={{paddingRight:10}}>cpdog</Typography.Text> {item}
                </List.Item>
            )}
        />
    )
}

export default Cooperation