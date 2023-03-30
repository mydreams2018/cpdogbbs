import {Button, Table,DatePicker,Input,Select } from 'antd';
import React,{useState ,useEffect} from 'react';
import AuthReplyPorts from "./AuthReplyPorts";
import {managerAuthPortsReply} from "../utils/HttpUtils";
const { RangePicker } = DatePicker;
const { Option } = Select;

const searchDatas = {
    beginTime:'',
    endTime:'',
    detailsText:'',
    pageSize:100,
    authFlag:0
}
function ManagerReplyPorts(props) {
    const [data,setData] = useState([]);
    const [editReply,setEditReply] = useState(false);
    const [editDatas,setEditDatas] = useState({});
    const changeClassId = (classId) => {
        switch (classId){
            case 1:
                return  "details_text_back";
            case 2:
                return  "details_text_front";
            case 3:
                return "details_text_data";
            case 4:
                return  "details_text_talk";
            default:

        }
        return classId;
    }
    useEffect(() => {
        managerAuthPortsReply(searchDatas,(rsp)=>{
            if(rsp){
                rsp.forEach(item=>{
                    item.key=(item.id+'-'+changeClassId(item.classId));
                });
                setData(rsp);
            }
        });
        return () => {
            searchDatas.beginTime='';
            searchDatas.endTime='';
            searchDatas.detailsText='';
            searchDatas.authFlag=0;
        };
    }, []);
    const columns = [
        {
            title: '标题',
            dataIndex: 'detailsText'
        },
        {
            title: '日期',
            dataIndex: 'createData',
        },
        {
            title: '审核说明',
            dataIndex: 'authDescribe',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'id',
            render: (text) => <span style={{color:"#1890ff",cursor:"pointer"}} onClick={()=>editClick(text)} >edit</span>,
        }
    ];

    const dataChanges = (data,dataString) => {
        searchDatas.beginTime=dataString[0];
        searchDatas.endTime=dataString[1];
    }
    const seleteChanges = (dt) => {
        searchDatas.authFlag=dt;
    }
    const inputChanges = (data) => {
        searchDatas.detailsText=data.target.value;
    }
    const searchChangeData = () => {
        managerAuthPortsReply(searchDatas,(rsp)=>{
            if(rsp){
                rsp.forEach(item=>{
                    item.key=(item.id+'-'+changeClassId(item.classId));
                });
                setData(rsp);
            }
        });
    }

    const editClick = (text) => {
        setEditDatas(text);
        setEditReply(true);
    }
    return (
        <div className={"manager-reply-ports"}>
            <div className={"search"}>
                <RangePicker onChange={dataChanges} bordered={false} size={"large"}/>
                <Input placeholder="回贴内容" onChange={inputChanges} style={{maxWidth:256,marginRight:10}}/>
                <Select
                    defaultValue="0"
                    style={{
                        width: 120
                    }}
                    onChange={seleteChanges}>
                    <Option value="0">审核中</Option>
                    <Option value="1">已审核</Option>
                    <Option value="2">未通过</Option>
                </Select>
                <Button type="primary" onClick={searchChangeData}>查询</Button>
            </div>

            <Table columns={columns} dataSource={data}
                   pagination={{
                        position: ["bottomCenter"]
                     }}
            />

            {editReply && <AuthReplyPorts visible={editReply} setVisible={setEditReply} editDatas={editDatas} />}
        </div>
    );
}

export default React.memo(ManagerReplyPorts);