import {Button, Table,DatePicker,Input,Select } from 'antd';
import {useState ,useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import EditMainPorts from "./EditMainPorts";
import './MySendPorts.css'
import {queryMyPorts,deleteMyPorts} from "../utils/HttpUtils";
import {changeClassPortId} from "../utils/BaseUtils";
const { RangePicker } = DatePicker;
const { Option } = Select;

const searchDatas = {
    beginTime:'',
    endTime:'',
    name:'',
    pageSize:1000,
    authFlag:1
}
function MySendPorts(props) {
    const navigate = useNavigate();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [data,setData] = useState([]);
    const [editPorts,setEditPorts] = useState(false);
    const [editParams,setEditParams] = useState({});
    useEffect(() => {
        queryMyPorts(searchDatas,(rsp)=>{
            if(rsp.datas){
                rsp.datas.forEach(item=>{
                    item.key=(item.id+'-'+changeClassPortId(item.classId));
                });
                setData(rsp.datas);
            }
        });
        return () => {
            searchDatas.beginTime='';
            searchDatas.endTime='';
            searchDatas.name='';
            searchDatas.authFlag=1;
        };
    }, []);
    const columns = [
        {
            title: '标题',
            dataIndex: 'name',
            render: (text,obj) => <span style={{color:"#1890ff",cursor:"pointer"}} onClick={()=>jumperPorts(text,obj)}>{text}</span>
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
            render: (text) => <span style={{color:"#1890ff",cursor:"pointer"}} onClick={()=>editClick(text)} >edit</span>,
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
            case 3:
                navigate("/database/details",{state:{id:obj.id}});
                break;
            default:

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
                    if(!selectedRowKeys.includes(item.id+'-'+changeClassPortId(item.classId))){
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
        queryMyPorts(searchDatas,(rsp)=>{
            if(rsp.datas){
                rsp.datas.forEach(item=>{
                    item.key=(item.id+'-'+changeClassPortId(item.classId));
                });
                setData(rsp.datas);
            }
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
        <div className={"my-send-ports"}>

            <div className={"search"}>
                <RangePicker onChange={dataChanges} bordered={false} size={"large"}/>
                <Input placeholder="贴子标题" onChange={inputChanges} style={{maxWidth:256,marginRight:10}}/>
                <Select
                    defaultValue="1"
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
                        Delete
                    </Button>
                    <span
                        style={{marginLeft: 8,}}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={{
                    position: ["bottomCenter"]
                }}/>
            </div>
            {editPorts && <EditMainPorts visible={editPorts} setVisible={setEditPorts} editParams={editParams} />}
        </div>
    );
}

export default MySendPorts