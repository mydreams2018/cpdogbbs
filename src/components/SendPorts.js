import { Select,Input,Button } from 'antd';
import {HeartTwoTone} from '@ant-design/icons';
import BaseCkedit from "./BaseCkedit";
import './SendPorts.css'

const { Option } = Select;
const children = [];

children.push(<Option key={"1"}>java</Option>);
children.push(<Option key={"2"}>react</Option>);

const handleChange = (value) => {
    console.log(`Selected: ${value}`);
};

function SendPorts(){
    return(
        <div className={"send-port"}>
            <div className={"send-title"}>
                <Select
                    size={'middle'}
                    defaultValue="java"
                    onChange={handleChange}
                    style={{
                        width: 160
                    }}>
                    {children}
                </Select>
                <Input placeholder="赏积分"
                       style={{
                           width: 128
                       }}
                       prefix={ <HeartTwoTone twoToneColor="#eb2f96" />} />
                <Input placeholder="贴子标题" className={"send-con"}
                       maxLength={64}
                       prefix={ <HeartTwoTone twoToneColor="#eb2f96" />} />
            </div>
            <BaseCkedit />
            <div className={"send-message"}>
                <Input
                    prefix={"4+3*9+0="}
                    placeholder={"请回答:"}/>
                <Button type="primary" size="large" loading={false} >
                    发贴
                </Button>
            </div>

        </div>
    )
}

export default SendPorts