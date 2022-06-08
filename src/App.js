import './App.css';
import {Layout, Menu} from 'antd';
import React,{useState} from 'react';
import {Routes,Route ,useNavigate,useLocation} from "react-router-dom";
import Login from "./views/Login"
import Home from "./views/Home";
import NoFound from "./views/NoFound";
import DocCookies from "./utils/Cookies";
import FixedUtils from "./utils/FixedUtils";

const {Header, Content, Footer } = Layout;
const menusTitle = [
    {key:'1',label:'首页',path:"/"},
    {key:'2',label:'java',path:"/java"},
    {key:'3',label:'react',path:"/react"},
    {key:'4',label:'更新日志',path:"/logs"},
];

console.log(process.env);

function App() {
    console.log("首页");
    const [authToken, setAuthToken] = useState(() => false);
    const navigate = useNavigate();
    const locationPath = useLocation();
    let locationKey;
    menusTitle.forEach(item => {
        if(item.path===locationPath.pathname){
            locationKey = item.key;
        }
    });
  return (
    <div className="App">
        <Layout>
            <Header
                style={{
                    position: 'fixed',
                    zIndex: 1,
                    width: '100%',
                }}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[locationKey]}
                    onSelect={function({ item, key, keyPath, selectedKeys, domEvent }){
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
                               navigate("/logs");
                               break;
                       }
                    }}
                    items={menusTitle.map((item, index) => ({
                        key: item.key,
                        label: item.label,
                        title: item.label,
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
                        <Route path="/" element={authToken?<Home />:<Login />} />
                        <Route path="*" element={<NoFound />} />
                    </Routes>
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}>
                Ant Design ©2022 Created by 刘大胖
            </Footer>
        </Layout>
        <FixedUtils />
    </div>
  );
}

export default App;