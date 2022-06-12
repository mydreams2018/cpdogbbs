import { Timeline } from 'antd';
import './TimeLine.css'

function TimeLine(){
    return(
        <div className={"time-line"}>
            <Timeline pending="Recording..." reverse={true}>
                <Timeline.Item>React项目初始化 2022-06-01</Timeline.Item>
                <Timeline.Item>注册、登录完成 2022-06-05</Timeline.Item>
                <Timeline.Item>首页完成 2020-06-12</Timeline.Item>
            </Timeline>
        </div>
    )
}

export default TimeLine