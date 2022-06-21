import {CheckCircleTwoTone,MessageTwoTone,EyeTwoTone} from '@ant-design/icons';
import {Tag} from "antd";
import './DetailsTitle.css'

function DetailsTitle(props) {
    return (
        <div className={"details-title"}>
            <Tag color={props.portsInfo.portState==='未结'?'':"success"} icon={<CheckCircleTwoTone />}>{props.portsInfo.portState}</Tag>
            <Tag color={"success"} icon={<MessageTwoTone />}>{props.portsInfo.replyNumber}</Tag>
            <Tag color={"success"} icon={<EyeTwoTone />}>收藏</Tag>
        </div>
    )
}

export default DetailsTitle