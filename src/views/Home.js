import './HomeView.css'
import React, {useEffect, useState} from 'react';
import MyCarousel from "../components/MyCarousel";
import {Tabs} from 'antd';
import {FireOutlined, UndoOutlined} from '@ant-design/icons';

const {TabPane} = Tabs;

const imgs = ["https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png", "/logo192.png"]

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
                        最新
                    </TabPane>
                    <TabPane tab={
                        <span>
                         <FireOutlined />
                          热议
                        </span>
                    } key="2">
                        热议
                    </TabPane>
                </Tabs>
            </div>
            <div className={"right"}>
                right
            </div>
        </div>
    );
}

export default Home;