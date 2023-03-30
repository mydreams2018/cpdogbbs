import {Button, Table, Input, Modal, message} from 'antd';
import React, {useState ,useEffect} from 'react';
import {managerAuthPort, updatePortIsTop} from "../utils/HttpUtils";

const searchDatas = {
    name:'',
    pageSize:100,
    authFlag:1
}
const updatePortTop =  {
    id:"",
    classId:""
}
function ManagerPortTop(props) {
    const [data,setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        managerAuthPort(searchDatas,(rsp)=>{
            if(rsp){
                rsp.forEach(item=>{
                    item.key=(item.id+'-'+changeClassId(item.classId));
                });
                setData(rsp);
            }
        });
        return () => {
            searchDatas.name='';
            updatePortTop.id = "";
            updatePortTop.classId="";
        };
    }, []);
    const columns = [
        {
            title: '标题',
            dataIndex: 'name'
        },
        {
            title: '回复',
            dataIndex: 'replyNumber',
        },
        {
            title: '日期',
            dataIndex: 'createTime',
        },
        {
            title: '类型',
            dataIndex: 'classId',
            render: (classId) => changeClassId(classId)
        },
        {
            title: '推荐状态',
            dataIndex: 'isTop',
            render: (isTop) => isTop?"已推荐":"无"
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'id',
            render: (text) => <span style={{color:"#1890ff",cursor:"pointer"}} onClick={()=>editClick(text)}>edit</span>
        }
    ];
    const changeClassId = (classId) => {
        switch (classId){
            case 1:
                return  "java";
            case 2:
                return  "前端";
            case 3:
                return  "数据库";
            case 4:
                return  "report_talk";
            default:

        }
        return classId;
    }
    const handleOk = (state) => {
        if (updatePortTop.id && updatePortTop.classId){
            setLoading(true);
            updatePortTop.isTop = state;
            updatePortIsTop(updatePortTop,(rsp) => {
                setLoading(false);
                setOpen(false);
                message.info(rsp.msg);
            });
        }
    };
    const handleCancel = () => {
        updatePortTop.id = "";
        updatePortTop.classId="";
        setOpen(false);
    };
    const inputChanges = (data) => {
        searchDatas.name=data.target.value;
    }
    const searchChangeData = () => {
        managerAuthPort(searchDatas,(rsp)=>{
            if(rsp){
                rsp.forEach(item=>{
                    item.key=(item.id+'-'+changeClassId(item.classId));
                });
                setData(rsp);
            }
        });
    }

    const editClick = (text) => {
        updatePortTop.id = text.id;
        updatePortTop.classId = text.classId;
        setOpen(true);
    }
    return (
        <>
            <Modal
                visible={open}
                title="推荐贴管理"
                onCancel={handleCancel}
                confirmLoading={loading}
                footer={[
                    <Button type="primary" key="add" onClick={()=>handleOk(1)}>
                        推荐此贴
                    </Button>,
                    <Button
                        key="remove"
                        type="primary"
                        onClick={()=>handleOk(0)}>
                        撤消推荐
                    </Button>
                ]}>
                <p> 推荐此贴:可以放此贴位于页面的推荐位置<br/>
                    撤消推荐:取消当前贴子的推荐</p>
            </Modal>

            <div className={"manager-port-top"}>

                <div className={"search"}>
                    <Input placeholder="贴子标题" onChange={inputChanges} style={{maxWidth:256,marginRight:10}}/>
                    <Button type="primary" onClick={searchChangeData}>查询</Button>
                </div>

                <Table columns={columns} dataSource={data} pagination={{
                    position: ["bottomCenter"]
                }}/>

            </div>

        </>
    );
}

export default ManagerPortTop