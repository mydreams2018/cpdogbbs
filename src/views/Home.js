import './HomeView.css'
import {useState,useEffect} from 'react';
import MyCarousel from "../components/MyCarousel";
import {Tabs} from 'antd';
import {FireOutlined, UndoOutlined} from '@ant-design/icons';
import ListSimple from "../components/ListSimple";
import ReplyWeek from "../components/ReplyWeek";
import SignIn from "../components/SignIn";
import Cooperation from "../components/Cooperation";
import TimeLine from "../components/TimeLine";
import HomeHook from "./HomeHook";
import {collaborationCompanyQuery} from "../utils/HttpUtils";
const {TabPane} = Tabs;

function Home() {
    const [weekReplyUser] = HomeHook([]);
    const [listParam,setListParam] = useState(()=>{
        return {
            classId: 1,
            orderType: 'create_time',
            userAccount: 'kungreat',
            currentPage: 1,
            pageSize: 8,
        }
    });
    const [companyData,setCompanyData] = useState([]);
    useEffect(()=>{
        collaborationCompanyQuery({"onlyStatus":1,"isActive":true},(rsp)=>{
            setCompanyData(rsp.datas);
        });
    },[]);

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
                <MyCarousel companyData={companyData}/>
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
                <ListSimple listParam={listParam} basePath={'/java/details'} showPaging={false}/>
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