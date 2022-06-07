import './App.css';
import { Layout, Menu} from 'antd';
import React,{useState} from 'react';
import { Routes, Route } from "react-router-dom";
import Login from "./views/Login"
import DocCookies from "./utils/Cookies";

const {Header, Content, Footer } = Layout;
const menusTitle = [
    {key:'1',label:'首页'},
    {key:'2',label:'java'},
    {key:'3',label:'react'},
    {key:'4',label:'更新日志'},
];

console.log(process.env);

function App() {
    const [session, setSession] = useState(() => DocCookies.getItem("auth-token"));
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
                    defaultSelectedKeys={['1']}
                    items={menusTitle.map((item, index) => ({
                        key: item.key,
                        label: item.label,
                    }))}
                />
            </Header>
            <Content
                className="site-layout"
                style={{
                    padding: '0 50px',
                    marginTop: 64,
                }}>
                <div
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        minHeight: 380}}>
                    <Routes>
                        <Route path="/" element={<Login />} />
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
    </div>
  );
}

export default App;