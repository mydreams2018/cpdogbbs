import {Button, Table,Input,Select,Modal,message } from 'antd';
import React, {useState ,useEffect} from 'react';
import {managerGetUser,deleteUser} from "../utils/HttpUtils";
const { Option } = Select;

const searchDatas = {
    alias:'',
    pageSize:100,
    state:1
}
const updateUserState =  {
    id:""
}

function RootDeleteUser(props) {
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
            searchDatas.state=1;
            updateUserState.id = "";
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
            title: '状态',
            dataIndex: 'state',
            render: (state) =>state?"正常":"禁用"
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'id',
            render: (text) => <a href="javascript:void(0);" onClick={()=>editClick(text)} >edit</a>,
        }
    ];
    const handleOk = (managerState) => {
        if (updateUserState.id){
            setLoading(true);
            updateUserState.curStatus = managerState;
            deleteUser(updateUserState,(rsp) => {
                setLoading(false);
                setOpen(false);
                message.info(rsp.msg);
            });
        }
    };
    const handleCancel = () => {
        updateUserState.id = "";
        setOpen(false);
    };
    const seleteChanges = (dt) => {
        searchDatas.state = dt;
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
        updateUserState.id = text.id;
        setOpen(true);
    }
    return (
        <>
            <Modal
                visible={open}
                title="用户管理"
                onCancel={handleCancel}
                confirmLoading={loading}
                footer={[
                    <Button type="primary" key="add" onClick={()=>handleOk(1)}>
                        激活用户
                    </Button>,
                    <Button
                        key="remove"
                        type="primary"
                        onClick={()=>handleOk(0)}>
                        禁用用户
                    </Button>
                ]}>
                <p>激活用户:可以让用户正常使用,贴子全部初始状态<br/>
                    禁用用户:用户不能正常使用,并且把发的贴子全部禁用掉</p>
            </Modal>

            <div className={"manager-user"}>
            <div className={"search"}>
                <Input placeholder="用户别名" onChange={inputChanges} style={{maxWidth:256,marginRight:10}}/>
                <Select
                    defaultValue="1"
                    style={{
                        width: 120
                    }}
                    onChange={seleteChanges}>
                    <Option value="1">是</Option>
                    <Option value="0">否</Option>
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

export default React.memo(RootDeleteUser);