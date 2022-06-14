import {CheckCircleTwoTone,MessageTwoTone,EyeTwoTone} from '@ant-design/icons';
import {Tag} from "antd";
import './DetailsTitle.css'

function DetailsTitle() {
    return (
        <div className={"details-title"}>
            <Tag color={"success"} icon={<CheckCircleTwoTone />}>已结</Tag>
            <Tag color={"success"} icon={<MessageTwoTone />}>22</Tag>
            <Tag color={"success"} icon={<EyeTwoTone />}>收藏</Tag>
        </div>
    )
}

export default DetailsTitle