import {Avatar, Image, List} from 'antd';
import './HotList.css'
import {useState,useEffect} from 'react';
import {queryHomeReport} from "../utils/HttpUtils";
import {useNavigate} from "react-router-dom";
import UserDrawer from "./UserDrawer";

const HotList = (props) =>{
    const navigate = useNavigate();
    const [topDatas,setTopDatas] = useState(()=>[]);
    useEffect(()=>{
        queryHomeReport({
            'isTop':1,
            'orderType':'create_time',
            'classId':props.classId
        },(rsp)=>{
            if(rsp.datas && rsp.datas.length > 0){
                setTopDatas(rsp.datas);
            }
        });
    },[props.classId]);
    return(
        <List
            className={"hot-list scollbox"}
            header={<h4 style={{textAlign:"center",color:"#389e0d",marginBottom:0,lineHeight:'30px'}}>推荐贴</h4>}
            itemLayout="horizontal"
            dataSource={topDatas}
            renderItem={(item) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src={<Image src={item.userImg} />} />}
                        title={
                            <div>
                                <UserDrawer alias={item.alias} />
                                <span style={{marginLeft:10}}>{item.createTime}</span>
                            </div>}
                        description={<span onClick={()=>navigate(props.basePath,{state:{id:item.id}})}>{item.name}</span>}
                    />
                </List.Item>
            )}
        />
    );
}

export default HotList;