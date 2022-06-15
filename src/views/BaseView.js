import React,{useState} from 'react';
import { Pagination } from 'antd';
import './BaseView.css'
import MyCarousel from "../components/MyCarousel";
import BaseSearch from "../components/BaseSearch";
import ListSimple from "../components/ListSimple";
import HotList from "../components/HotList";
import ReplyWeek from "../components/ReplyWeek";
const imgs = ["https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png", "/logo192.png","https://joeschmoe.io/api/v1/random"]
const pageChange = (page) =>{
    console.log(page)
}
function BaseView(props){
    console.log(props.type);
    const [MyCarouselImgs] = useState(imgs);
    return (
        <div className={"base-view"}>
            <div className={"view-left"}>
                <MyCarousel imgs={MyCarouselImgs}/>
                <BaseSearch />
                <ListSimple />
                <Pagination defaultCurrent={1} onChange={pageChange} total={50} />
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