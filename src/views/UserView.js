import { HomeOutlined, SettingOutlined ,MessageOutlined,UserAddOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
import { useState ,useContext} from 'react';
import UserHomepage from "../components/UserHomepage";
import SendPorts from "../components/SendPorts";
import UserDetailsEdit from "../components/UserDetailsEdit";
import UserMail from "../components/UserMail";
import MySendPorts from "../components/MySendPorts";
import MyCollection from "../components/MyCollection";
import MyReplyPorts from "../components/MyReplyPorts";
import ManagerPorts from "../components/ManagerPorts";
import ManagerReplyPorts from "../components/ManagerReplyPorts";
import RootManager from "../components/RootManager";
import RootDeleteUser from "../components/RootDeleteUser";
import ManagerPortTop from "../components/ManagerPortTop";
import CollaborationCompany from "../components/CollaborationCompany";
import MainContext from "../MainContext";
import './UserView.css';

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
        getItem('个人信息', 'edit-1'),
        getItem('站内信', 'edit-2')
    ])
];
const rootSubmenuKeys = ['home', 'comments', 'edit'];
const rootAlias = ["deathwater","kungreat"];

function UserView(){
    const userContext = useContext(MainContext);
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
            case 'edit-2':
                setOpenKeysItem(<UserMail />);
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
            case 'root-user':
                setOpenKeysItem(<RootManager />);
                break;
            case 'delete-user':
                setOpenKeysItem(<RootDeleteUser />);
                break;
            case 'recommend-port':
                setOpenKeysItem(<ManagerPortTop />);
                break;
            case 'collaboration-company':
                setOpenKeysItem(<CollaborationCompany />);
                break;
            default:

        }

    };
    if(userContext && userContext.isManager === 1 && rootSubmenuKeys.length === 3){
        items.push(getItem('管理', 'manager', <SettingOutlined />, [
            getItem('主贴管理', 'port-1'),
            getItem('回贴管理', 'reply-1')
        ]));
        rootSubmenuKeys.push("manager");
        if (rootAlias.includes(userContext.alias)){
            items.push(getItem('用户管理', 'rootManager', <UserAddOutlined />, [
                getItem('设置管理员', 'root-user'),
                getItem('删除用户', 'delete-user'),
                getItem('推荐贴子', 'recommend-port'),
                getItem('合作区域', 'collaboration-company')
            ]));
            rootSubmenuKeys.push("rootManager");
        }
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
                        minHeight:"70vh"
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