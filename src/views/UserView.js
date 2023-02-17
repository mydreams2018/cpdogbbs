import { HomeOutlined, SettingOutlined ,MessageOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
import { useState ,useContext} from 'react';
import UserHomepage from "../components/UserHomepage";
import SendPorts from "../components/SendPorts";
import UserDetailsEdit from "../components/UserDetailsEdit";
import MySendPorts from "../components/MySendPorts";
import MyCollection from "../components/MyCollection";
import MyReplyPorts from "../components/MyReplyPorts";
import ManagerPorts from "../components/ManagerPorts";
import ManagerReplyPorts from "../components/ManagerReplyPorts";
import MainContext from "../MainContext";
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
        getItem('发贴', 'home-2')
    ]),
    getItem('贴子', 'comments', <MessageOutlined />, [
        getItem('我的发贴', 'comments-1'),
        getItem('我的回贴', 'comments-2'),
        getItem('我的收藏', 'comments-3')
    ]),
    getItem('设置', 'edit', <SettingOutlined />, [
        getItem('个人信息', 'edit-1')
    ])
];
const rootSubmenuKeys = ['home', 'comments', 'edit'];

function UserView(){
    const usercon = useContext(MainContext);
    const [openKeys, setOpenKeys] = useState(['home']);
    const [openKeysItem, setOpenKeysItem] = useState( <UserHomepage />);
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    const onSelectChange = (keys) => {
        //异步的
        switch (keys.key) {
            case 'home-1':
                setOpenKeysItem( <UserHomepage />);
                break;
            case 'home-2':
                setOpenKeysItem( <SendPorts />);
                break;
            case 'edit-1':
                setOpenKeysItem( <UserDetailsEdit />);
                break;
            case 'comments-1':
                setOpenKeysItem( <MySendPorts />);
                break;
            case 'comments-2':
                setOpenKeysItem( <MyReplyPorts />);
                break;
            case 'comments-3':
                setOpenKeysItem(<MyCollection />);
                break;
            case 'port-1':
                setOpenKeysItem(<ManagerPorts />);
                break;
            case 'reply-1':
                setOpenKeysItem(<ManagerReplyPorts />);
                break;
            default:

        }

    };
    if(usercon && usercon.isManager === 1 && rootSubmenuKeys.length === 3){
        items.push(getItem('管理', 'manager', <SettingOutlined />, [
            getItem('主贴管理', 'port-1'),
            getItem('回贴管理', 'reply-1')
        ]));
        rootSubmenuKeys.push("manager");
    }
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
                {openKeysItem}
            </div>
        </div>
    );
}

export default UserView