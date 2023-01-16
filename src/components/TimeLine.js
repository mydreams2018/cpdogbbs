import { Timeline } from 'antd';
import './TimeLine.css'

function TimeLine(){
    return(
        <div className={"time-line"}>
            <Timeline pending="Recording..." reverse={true}>
                <Timeline.Item>首版完成</Timeline.Item>
                <Timeline.Item>后续配合管理模版</Timeline.Item>
            </Timeline>
        </div>
    )
}

export default TimeLine