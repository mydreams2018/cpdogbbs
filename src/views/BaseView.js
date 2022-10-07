import React,{useState} from 'react';
import './BaseView.css'
import MyCarousel from "../components/MyCarousel";
import BaseSearch from "../components/BaseSearch";
import ListSimple from "../components/ListSimple";
import HotList from "../components/HotList";
import ReplyWeek from "../components/ReplyWeek";
import HomeHook from "./HomeHook";
const imgs = ["https://pic2.zhimg.com/v2-3b2133fc610d91bd17f71d3539040967_r.jpg?source=172ae18b", "/logo192.png","https://img.zcool.cn/community/01cb875613b3196ac7251df80a8907.jpg@1280w_1l_2o_100sh.jpg"];
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
            portState:"",
            partitionName:""
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
                partitionName:listParam.partitionName
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
                partitionName:listParam.partitionName
            }
        );
    };
    const ptHandleChange = (e) => {
        let ptName = (e==="全部"?"":e);
        setListParam(
            {
                classId: props.classId,
                orderType: listParam.orderType,
                currentPage: 1,
                pageSize: 10,
                name:listParam.name,
                portState:listParam.portState,
                partitionName:ptName
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
                    partitionName:listParam.partitionName
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
                portState:listParam.portState,
                partitionName:listParam.partitionName
            }
        );
    }

    return (
        <div className={"base-view"}>
            <div className={"view-left"}>
                <MyCarousel imgs={MyCarouselImgs}/>
                <BaseSearch handleChange={handleChange} onSearch={onSearch} onTabChange={onTabChange} basePath={props.basePath} ptHandleChange={ptHandleChange} />
                <ListSimple listParam={listParam} pageChange={pageChange} showPaging={true} basePath={props.basePath} />
            </div>
            <div className={"view-right"}>
                <HotList classId={props.classId} basePath={props.basePath} />
                <div style={{width:'100%',height:73}}></div>
                <ReplyWeek showTitle={true} imgs={weekReplyUser} />
            </div>
        </div>
    )
}

export default BaseView