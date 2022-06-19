import React,{useState} from 'react';
import './BaseView.css'
import MyCarousel from "../components/MyCarousel";
import BaseSearch from "../components/BaseSearch";
import ListSimple from "../components/ListSimple";
import HotList from "../components/HotList";
import ReplyWeek from "../components/ReplyWeek";
const imgs = ["https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png", "/logo192.png","https://joeschmoe.io/api/v1/random"];
function BaseView(props){
    const [MyCarouselImgs] = useState(imgs);
    const [listParam,setListParam] = useState(()=>{
        return {
            classId: props.classId,
            orderType: 'create_time',
            currentPage: 1,
            pageSize: 10,
            name:""
        }
    });

    const pageChange = (page) =>{
        setListParam(
            {
                classId: props.classId,
                orderType: listParam.orderType,
                currentPage: page,
                pageSize: 10
            }
        );
    }
    const handleChange = (e) => {
        console.log(e);
    };
    const onSearch = (value) => {
        console.log(value);
    }
    const onTabChange = (value) => {
        setListParam(
            {
                classId: props.classId,
                orderType: value,
                currentPage: 1,
                pageSize: 10,
                name:listParam.name,
            }
        );
    }

    return (
        <div className={"base-view"}>
            <div className={"view-left"}>
                <MyCarousel imgs={MyCarouselImgs}/>
                <BaseSearch handleChange={handleChange} onSearch={onSearch} onTabChange={onTabChange} />
                <ListSimple listParam={listParam} pageChange={pageChange} showPaging={true} />
            </div>
            <div className={"view-right"}>
                <HotList />
                <div style={{width:'100%',height:56}}></div>
                <ReplyWeek showTitle={true} imgs={MyCarouselImgs} />
            </div>
        </div>
    )
}

export default BaseView