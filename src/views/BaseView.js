import React,{useState} from 'react';
import { Pagination } from 'antd';
import './BaseView.css'
import MyCarousel from "../components/MyCarousel";
import BaseSearch from "../components/BaseSearch";
import ListSimple from "../components/ListSimple";
const imgs = ["https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png", "/logo192.png","https://joeschmoe.io/api/v1/random"]
const pageChange = (page) =>{
    console.log(page)
}
function BaseView(props){
    console.log(props.type);
    const [MyCarouselImgs] = useState(imgs);
    return (
        <div className={"base-view"}>
            <div className={"left"}>
                <MyCarousel imgs={MyCarouselImgs}/>
                <BaseSearch />
                <ListSimple />
                <Pagination defaultCurrent={1} onChange={pageChange} total={50} />
            </div>
            <div className={"right"}>
                java-right
            </div>
        </div>
    )
}

export default BaseView