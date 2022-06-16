import { HomeOutlined, SettingOutlined ,MessageOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import UserHomepage from "../components/UserHomepage";
import './UserView.css'

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('个人主页', 'home', <HomeOutlined />, [
        getItem('详情', 'home-1'),
    ]),
    getItem('贴子', 'comments', <MessageOutlined />, [
        getItem('我的发贴', 'comments-1'),
        getItem('我的回贴', 'comments-2'),
        getItem('我的关注', 'comments-3'),
    ]),
    getItem('设置', 'edit', <SettingOutlined />, [
        getItem('个人信息', 'edit-1')
    ]),
];
const rootSubmenuKeys = ['home', 'comments', 'edit'];

function UserView(){
    const [openKeys, setOpenKeys] = useState(['home']);

    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    const onSelectChange = (keys) => {
        console.log(keys);
    };
    return (
        <div className={"user-home"}>
            <div className={"user-left"}>
                <Menu
                    mode="inline"
                    openKeys={openKeys}
                    defaultSelectedKeys={['home-1']}
                    onOpenChange={onOpenChange}
                    onSelect={onSelectChange}
                    style={{
                        width: 220,
                        minHeight:380
                    }}
                    items={items}
                />
            </div>
            <div className={"user-right"}>
                <UserHomepage />
            </div>
        </div>
    );
}

export default UserView