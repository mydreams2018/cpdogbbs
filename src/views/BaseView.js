import React,{useState} from 'react';
import './BaseView.css'
import MyCarousel from "../components/MyCarousel";
import BaseSearch from "../components/BaseSearch";
const imgs = ["https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png", "/logo192.png","https://joeschmoe.io/api/v1/random"]

function BaseView(props){
    console.log(props.type);
    const [MyCarouselImgs] = useState(imgs);
    return (
        <div className={"base-view"}>
            <div className={"left"}>
                <MyCarousel imgs={MyCarouselImgs}/>
                <BaseSearch />
            </div>
            <div className={"right"}>
                java-right
            </div>
        </div>
    )
}

export default BaseView