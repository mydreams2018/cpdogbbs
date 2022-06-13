import './HomeView.css'
import React, {useEffect, useState} from 'react';
import MyCarousel from "../components/MyCarousel";
import {Tabs} from 'antd';
import {FireOutlined, UndoOutlined} from '@ant-design/icons';
import ListSimple from "../components/ListSimple";
import ReplyWeek from "../components/ReplyWeek";
import SignIn from "../components/SignIn";
import Cooperation from "../components/Cooperation";
import TimeLine from "../components/TimeLine";
const {TabPane} = Tabs;

const imgs = ["https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png", "/logo192.png","https://joeschmoe.io/api/v1/random"]

function Home() {
    const [MyCarouselImgs] = useState(imgs);
    return (
        <div className="home-view">
            <div className={"left"}>
                <MyCarousel imgs={MyCarouselImgs}/>
                <Tabs defaultActiveKey="1" centered>
                    <TabPane tab={
                        <span>
                        <UndoOutlined />
                          最新
                        </span>
                    } key="1">
                    </TabPane>
                    <TabPane tab={
                        <span>
                         <FireOutlined />
                          热议
                        </span>
                    } key="2">
                    </TabPane>
                </Tabs>
                <ListSimple />
            </div>
            <div className={"right"}>
                <ReplyWeek showTitle={true} imgs={MyCarouselImgs} />
                <SignIn />
                <Cooperation />
                <TimeLine />
            </div>
        </div>
    );
}

export default Home;