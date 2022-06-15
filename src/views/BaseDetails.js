import './BaseDetails.css'
import DetailsTitle from "../components/DetailsTitle";
import { Avatar, Image,Tag  } from 'antd';
import {DownOutlined} from '@ant-design/icons';
import PreContent from "../components/PreContent";
import CommentList from "../components/CommentList";

function BaseDetails(props){
    return (
        <div className={"base-details"}>
            <div className={"details-left"}>
                <h3>JVM在linux下的随机数缓慢问题</h3>
                <DetailsTitle />
                <div className={"user-list"} style={{backgroundColor:"#f0f2f5"}}>
                    <Avatar size={64} src={<Image src="https://joeschmoe.io/api/v1/random" style={{width: 64}}/>}/>
                    <Tag color="success">版主</Tag>
                    <Tag icon={<DownOutlined />} color="success">3</Tag>
                    <Tag color="success">2020-12-12</Tag>
                    <span>悬赏: 5飞吻</span>
                </div>
                <PreContent />
                <CommentList />
            </div>
            <div className={"details-right"}>

            </div>
        </div>
    )
}

export default BaseDetails