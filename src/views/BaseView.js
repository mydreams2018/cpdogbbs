import React,{useState,useEffect} from 'react';
import './BaseView.css'
import MyCarousel from "../components/MyCarousel";
import BaseSearch from "../components/BaseSearch";
import ListSimple from "../components/ListSimple";
import HotList from "../components/HotList";
import ReplyWeek from "../components/ReplyWeek";
import HomeHook from "./HomeHook";
import {collaborationCompanyQuery} from "../utils/HttpUtils";

function BaseView(props){
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
    const [companyData,setCompanyData] = useState([]);
    useEffect(()=>{
        collaborationCompanyQuery({"onlyStatus":1,"isActive":true},(rsp)=>{
            setCompanyData(rsp.datas);
        });
    },[]);
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
                <MyCarousel companyData={companyData} />
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