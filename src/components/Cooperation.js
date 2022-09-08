import { List } from 'antd';
const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.'
];

function Cooperation(){
    return(
        <List
            style={{backgroundColor:'#fff',marginTop:20}}
            header={<div>合作区域</div>}
            bordered
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    <div className={"cooperation-img"}>
                        {item}
                    </div>
                </List.Item>
            )}
        />
    )
}

export default Cooperation