import {Button, Table,Input,Select,Modal,message } from 'antd';
import React, {useState ,useEffect} from 'react';
import {managerGetUser,updateUserIsManager} from "../utils/HttpUtils";
const { Option } = Select;

const searchDatas = {
    alias:'',
    pageSize:100,
    state:1,
    isManager:0
}
const updateUser =  {
    id:"",
    "isManager":0
}

function RootManager(props) {
    const [data,setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        managerGetUser(searchDatas,(rsp)=>{
            if(rsp.datas){
                rsp.datas.forEach(item=>{
                    item.key=(item.id);
                });
                setData(rsp.datas);
            }
        });
        return () => {
            searchDatas.alias='';
            searchDatas.isManager=0;
            updateUser.id = "";
        };
    }, []);
    const columns = [
        {
            title: '别名',
            dataIndex: 'alias'
        },
        {
            title: '注册日期',
            dataIndex: 'registerTime',
        },
        {
            title: '积分',
            dataIndex: 'accumulatePoints',
        },
        {
            title: '认证',
            dataIndex: 'authenticate',
        },
        {
            title: '管理员',
            dataIndex: 'isManager',
            render: (isManager) =>isManager?"是":"否"
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'id',
            render: (text) => <a href="javascript:void(0);" onClick={()=>editClick(text)} >edit</a>,
        }
    ];
    const handleOk = (managerState) => {
        if (updateUser.id){
            setLoading(true);
            updateUser.isManager = managerState;
            updateUserIsManager(updateUser,(rsp) => {
                setLoading(false);
                setOpen(false);
                message.info(rsp.msg);
            });
        }
    };
    const handleCancel = () => {
        updateUser.id = "";
        setOpen(false);
    };
    const seleteChanges = (dt) => {
        searchDatas.isManager=dt;
    }
    const inputChanges = (data) => {
        searchDatas.alias=data.target.value;
    }
    const searchChangeData = () => {
        managerGetUser(searchDatas,(rsp)=>{
            if(rsp.datas){
                rsp.datas.forEach(item=>{
                    item.key=(item.id);
                });
                setData(rsp.datas);
            }
        });
    }

    const editClick = (text) => {
        updateUser.id = text.id;
        setOpen(true);
    }
    return (
        <>
            <Modal
                visible={open}
                title="管理员"
                onCancel={handleCancel}
                confirmLoading={loading}
                footer={[
                    <Button type="primary" key="add" onClick={()=>handleOk(1)}>
                        添加管理员
                    </Button>,
                    <Button
                        key="remove"
                        type="primary"
                        onClick={()=>handleOk(0)}>
                        取消管理员
                    </Button>
                ]}>
                <p>把当前用户设置为管理员,或者取消当前用户的管理员</p>
            </Modal>

            <div className={"manager-user"}>
            <div className={"search"}>
                <Input placeholder="用户别名" onChange={inputChanges} style={{maxWidth:256,marginRight:10}}/>
                <Select
                    defaultValue="否"
                    style={{
                        width: 120
                    }}
                    onChange={seleteChanges}>
                    <Option value="0">否</Option>
                    <Option value="1">是</Option>
                </Select>
                <Button type="primary" onClick={searchChangeData}>查询</Button>
            </div>

            <Table columns={columns} dataSource={data}
                   pagination={{
                        position: ["bottomCenter"]
                     }}/>
        </div>

        </>
    );
}

export default React.memo(RootManager);