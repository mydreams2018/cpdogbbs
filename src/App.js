import {Layout, Menu,Spin} from 'antd';
import React,{useState,useEffect,Suspense} from 'react';
import {Routes,Route ,useNavigate,useLocation} from "react-router-dom";
import {HomeOutlined,createFromIconfontCN ,LinkedinFilled,SettingOutlined,DatabaseOutlined} from '@ant-design/icons';
import {APILoader} from "@uiw/react-amap";
import Login from "./views/Login"
import Home from "./views/Home";
import Forget from "./views/Forget";
import Register from "./views/Register";
import UserView from "./views/UserView";
import Address from "./views/Address";
import BaseView from "./views/BaseView";
import FixedUtils from "./utils/FixedUtils";
import JavaView from "./views/JavaView";
import ReactView from "./views/ReactView";
import DatabaseView from "./views/DatabaseView";
import BaseDetails from "./views/BaseDetails";
import {getUserInfo} from "./utils/HttpUtils";
import NotificationAuth from "./views/NotificationAuth";
import './App.css';
import Context from "./MainContext";
const NoFound =  React.lazy(()=> import("./views/NoFound"));
const {Header, Content, Footer } = Layout;
const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js',
    ],
});
const menusTitle = [
    {key:'1',label:'首页',path:"/",icon:<HomeOutlined />},
    {key:'2',label:'java',path:"/java",icon: <IconFont type="icon-java" />},
    {key:'3',label:'前端',path:"/react",icon: <IconFont type="icon-javascript" />},
    {key:'4',label:'数据库',path:"/database",icon: <DatabaseOutlined />},
    {key:'5',label:'地图',path:"/address",icon: <LinkedinFilled />},
    {key:'6',label:'用户',path:"/user",icon: <SettingOutlined /> },
];
let locationKey='6';
console.log(process.env);

function App() {
    console.log("首页");
    const [authToken, setAuthToken] = useState(()=>false);
    useEffect(()=>{
        //只有刷新时 或者 第一次才会进
        getUserInfo({},(rt)=>{
            if(rt){
                console.log("success",rt);
                setAuthToken(rt);
            }
        });
    },[]);
    const navigate = useNavigate();
    const locationPath = useLocation();
    menusTitle.forEach(item => {
        if(locationPath.pathname === item.path){
            locationKey = item.key;
        }else if(item.path !== "/" && locationPath.pathname.includes(item.path)){
            locationKey = item.key;
        }
    });
  return (
      <Context.Provider value={authToken}>
    <div className="App">
        <Layout>
            <Header
                style={{
                    position: 'fixed',
                    zIndex: 6,
                    width: '100%',
                }}>
                <div className={"header-img"} style={{float:'left',paddingLeft:30,paddingRight:30}} ><img alt={"襄阳it"} src={"/favicon.ico"} style={{maxHeight:'100%'}}/></div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[locationKey]}
                    forceSubMenuRender={true}
                    onClick={function({ key }){
                       switch (key) {
                           case "1":
                               navigate("/");
                               break;
                           case "2":
                               navigate("/java");
                               break;
                           case "3":
                               navigate("/react");
                               break;
                           case "4":
                               navigate("/database");
                               break;
                           case "5":
                               navigate("/address");
                               break;
                           case "6":
                               navigate("/user");
                               break;
                           default:

                       }
                    }}
                    items={menusTitle.map((item, index) => ({
                        key: item.key,
                        label: item.label,
                        title: item.label,
                        icon:item.icon
                    }))}
                />
            </Header>
            <Content
                className="site-layout"
                style={{
                    padding: '0 50px',
                    marginTop: 64,
                }}>
                <div className="site-layout-background"
                    style={{
                        padding: 24,
                        minHeight: 380}}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/address" element={
                            <APILoader version="2.0.5" akay="a7a90e05a37d3f6bf76d4a9032fc9129">
                            <Address />
                            </APILoader>
                        } />
                        <Route path="/forget" element={<Forget />} />
                        <Route path="/java" element={<JavaView />} >
                            <Route index element={<BaseView type={"java"} classId={1} basePath={'/java/details'} />} />
                            <Route path="details" element={<BaseDetails type={"java"} classId={1} basePath={'/java/details'} />} />
                        </Route>
                        <Route path="/react" element={<ReactView />} >
                            <Route index element={<BaseView type={"react"} classId={2} basePath={'/react/details'} />} />
                            <Route path="details" element={<BaseDetails type={"react"} classId={2} basePath={'/react/details'} />} />
                        </Route>
                        <Route path="/database" element={<DatabaseView />} >
                            <Route index element={<BaseView type={"database"} classId={3} basePath={'/database/details'} />} />
                            <Route path="details" element={<BaseDetails type={"database"} classId={3} basePath={'/database/details'} />} />
                        </Route>
                        <Route path="/user" element={authToken.id?<UserView />:<Login onUserChange={(token) => {
                            getUserInfo({},(rt)=>{
                                if(rt){
                                    setAuthToken(rt);
                                }
                            });
                        }} />} />
                        <Route path="*" element={
                            <Suspense fallback={<div style={{
                                margin:'20px 0',
                                marginBottom: '20px',
                                padding: '30px 50px',
                                textAlign: 'center',
                                background: 'rgba(0, 0, 0, 0.05)',
                                borderRadius: '4px'}}>
                                <Spin />
                            </div>} >
                                <NoFound />
                            </Suspense> } />
                    </Routes>
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}>
                ©2023 编程技术 <a rel="noreferrer" target={"_blank"} href={"https://beian.miit.gov.cn"}>粤ICP备19055569号-1</a>
            </Footer>
        </Layout>
        <FixedUtils />
        <NotificationAuth />
    </div>
      </Context.Provider>
  );
}

export default App;