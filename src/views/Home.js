import './HomeView.css'
import {useState} from 'react';
import MyCarousel from "../components/MyCarousel";
import {Tabs} from 'antd';
import {FireOutlined, UndoOutlined} from '@ant-design/icons';
import ListSimple from "../components/ListSimple";
import ReplyWeek from "../components/ReplyWeek";
import SignIn from "../components/SignIn";
import Cooperation from "../components/Cooperation";
import TimeLine from "../components/TimeLine";
import HomeHook from "./HomeHook";
const {TabPane} = Tabs;

const imgs = ["https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png", "/logo192.png","https://joeschmoe.io/api/v1/random"]
function Home() {
    const [weekReplyUser] = HomeHook([]);
    const [MyCarouselImgs] = useState(imgs);
    const [listParam,setListParam] = useState(()=>{
        return {
            classId: 1,
            orderType: 'create_time',
            userAccount: 'kungreat',
            currentPage: 1,
            pageSize: 8,
        }
    });
    const listParamChange = (e) => {
        setListParam({
            classId: 1,
            orderType: e,
            userAccount: 'kungreat',
            currentPage: 1,
            pageSize: 8,
        });
    }
    return (
        <div className="home-view">
            <div className={"home-left"}>
                <MyCarousel imgs={MyCarouselImgs}/>
                <Tabs defaultActiveKey="create_time" centered onChange={listParamChange}>
                    <TabPane tab={
                        <span>
                        <UndoOutlined />
                          最新
                        </span>
                    } key="create_time">
                    </TabPane>
                    <TabPane tab={
                        <span>
                         <FireOutlined />
                          热议
                        </span>
                    } key="reply_number">
                    </TabPane>
                </Tabs>
                <ListSimple listParam={listParam} showPaging={false}/>
            </div>
            <div className={"home-right"}>
                <ReplyWeek showTitle={true} imgs={weekReplyUser} />
                <SignIn />
                <Cooperation />
                <TimeLine />
            </div>
        </div>
    );
}

export default Home;