import React,{useState} from 'react';
import './BaseView.css'
import MyCarousel from "../components/MyCarousel";
import BaseSearch from "../components/BaseSearch";
import ListSimple from "../components/ListSimple";
import HotList from "../components/HotList";
import ReplyWeek from "../components/ReplyWeek";
import HomeHook from "./HomeHook";
const imgs = ["https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png", "/logo192.png","https://joeschmoe.io/api/v1/random"];
function BaseView(props){
    const [MyCarouselImgs] = useState(imgs);
    const [weekReplyUser] = HomeHook([]);
    const [listParam,setListParam] = useState(()=>{
        return {
            classId: props.classId,
            orderType: 'create_time',
            currentPage: 1,
            pageSize: 10,
            name:"",
            portState:""
        }
    });

    const pageChange = (page) =>{
        setListParam(
            {
                classId: props.classId,
                orderType: listParam.orderType,
                currentPage: page,
                pageSize: 10,
                portState:listParam.portState,
                name:listParam.name,
            }
        );
    }
    const handleChange = (e) => {
        setListParam(
            {
                classId: props.classId,
                orderType: listParam.orderType,
                currentPage: 1,
                pageSize: 10,
                name:listParam.name,
                portState:e,
            }
        );
    };
    const onSearch = (value) => {
            setListParam(
                {
                    classId: props.classId,
                    orderType: listParam.orderType,
                    currentPage: 1,
                    pageSize: 10,
                    name:value,
                    portState:listParam.portState,
                }
            );
    }
    const onTabChange = (value) => {
        setListParam(
            {
                classId: props.classId,
                orderType: value,
                currentPage: listParam.currentPage,
                pageSize: 10,
                name:listParam.name,
                portState:listParam.portState
            }
        );
    }

    return (
        <div className={"base-view"}>
            <div className={"view-left"}>
                <MyCarousel imgs={MyCarouselImgs}/>
                <BaseSearch handleChange={handleChange} onSearch={onSearch} onTabChange={onTabChange} />
                <ListSimple listParam={listParam} pageChange={pageChange} showPaging={true} basePath={props.basePath} />
            </div>
            <div className={"view-right"}>
                <HotList />
                <div style={{width:'100%',height:73}}></div>
                <ReplyWeek showTitle={true} imgs={weekReplyUser} />
            </div>
        </div>
    )
}

export default BaseView