import {Button, Table,DatePicker,Input,Select } from 'antd';
import {useState ,useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import AuthMainPorts from "./AuthMainPorts";
import './ManagerPorts.css'
import {managerAuthPort,deleteMyPorts} from "../utils/HttpUtils";
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
    const navigate = useNavigate();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
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
            dataIndex: 'name',
            render: (text,obj) => <a onClick={()=>jumperPorts(text,obj)}>{text}</a>
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
            key: 'x',
            render: (text) => <a onClick={()=>editClick(text )} >edit</a>,
        }
    ];

    const jumperPorts = (text,obj) => {
        switch (obj.classId) {
            case 1:
                navigate("/java/details",{state:{id:obj.id}});
                break;
            case 2:
                navigate("/react/details",{state:{id:obj.id}});
                break;
        }
    }
    const start = () => {
        setLoading(true);
        deleteMyPorts({
            ids:selectedRowKeys.join(","),
        },(rsp)=>{
            if(rsp.status===1){
                setSelectedRowKeys([]);
                let ArrayData = [];
                data.forEach(item=>{
                    if(!selectedRowKeys.includes(item.id+'-'+changeClassId(item.classId))){
                        ArrayData.push(item);
                    }
                });
                setData(ArrayData);
            }
            setLoading(false);
        });
    };
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

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

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
                    defaultValue="审核中"
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

            <div>
                <div
                    style={{
                        marginBottom: 16,
                    }}>
                    <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                        不通过
                    </Button>
                    <span
                        style={{marginLeft: 8,}}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
            </div>
            {editPorts && <AuthMainPorts visible={editPorts} setVisible={setEditPorts} editParams={editParams} />}
        </div>
    );
}

export default ManagerPorts