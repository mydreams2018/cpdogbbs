import {Button, Table,DatePicker,Input,Select } from 'antd';
import {useState ,useEffect} from 'react';
import AuthMainPorts from "./AuthMainPorts";
import './ManagerPorts.css'
import {managerAuthPort} from "../utils/HttpUtils";
const { RangePicker } = DatePicker;
const { Option } = Select;

const searchDatas = {
    beginTime:'',
    endTime:'',
    name:'',
    pageSize:100,
    authFlag:0
}
function ManagerPorts(props) {
    const [data,setData] = useState([]);
    const [editPorts,setEditPorts] = useState(false);
    const [editParams,setEditParams] = useState({});
    const changeClassId = (classId) => {
        switch (classId){
            case 1:
                return  "report_back";
            case 2:
                return  "report_front";
            case 3:
                return "report_data";
            case 4:
                return  "report_talk";
        }
        return classId;
    }
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
            searchDatas.beginTime='';
            searchDatas.endTime='';
            searchDatas.name='';
            searchDatas.authFlag=0;
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
            title: '审核说明',
            dataIndex: 'authDescribe',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'id',
            render: (text) => <span style={{color:"#1890ff",cursor:"pointer"}} onClick={()=>editClick(text )} >edit</span>,
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
            console.log(rsp);
        });
    }

    const editClick = (text) => {
        setEditParams(text);
        setEditPorts(true);
    }
    return (
        <div className={"manager-ports"}>

            <div className={"search"}>
                <RangePicker onChange={dataChanges} bordered={false} size={"large"}/>
                <Input placeholder="贴子标题" onChange={inputChanges} style={{maxWidth:256,marginRight:10}}/>
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

            <Table columns={columns} dataSource={data} pagination={{
                position: ["bottomCenter"]
            }}/>

            {editPorts && <AuthMainPorts visible={editPorts} setVisible={setEditPorts} editParams={editParams} />}
        </div>
    );
}

export default ManagerPorts