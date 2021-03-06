import {Button, Table,DatePicker,Input} from 'antd';
import {useState ,useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import EditReplyPorts from "./EditReplyPorts";
import {queryMyReplyPorts,deleteMyReplyPorts} from "../utils/HttpUtils";
const { RangePicker } = DatePicker;

let searchDatas = {
    beginTime:'',
    endTime:'',
    name:'',
    pageSize:1000
}
function MyReplyPorts(props) {
    const navigate = useNavigate();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
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
        }
        return classId;
    }
    useEffect(() => {
        queryMyReplyPorts(searchDatas,(rsp)=>{
            if(rsp.datas){
                rsp.datas.forEach(item=>{
                    item.key=(item.id+'-'+changeClassId(item.classId));
                });
                setData(rsp.datas);
            }
        });
    }, []);
    const columns = [
        {
            title: '标题',
            dataIndex: 'detailsText',
            render: (text,obj) => <a onClick={()=>jumperPorts(text,obj)}>{text}</a>
        },
        {
            title: '日期',
            dataIndex: 'createData',
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
                navigate("/java/details",{state:{id:obj.portId}});
                break;
            case 2:
                navigate("/react/details",{state:{id:obj.portId}});
                break;
        }
    }
    const start = () => {
        setLoading(true);
        deleteMyReplyPorts({
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
    const inputChanges = (data) => {
        searchDatas.name=data.target.value;
    }
    const searchChangeData = () => {
        queryMyReplyPorts(searchDatas,(rsp)=>{
            if(rsp.datas){
                rsp.datas.forEach(item=>{
                    item.key=(item.id+'-'+changeClassId(item.classId));
                })
                setData(rsp.datas);
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
        setEditDatas(text);
        setEditReply(true);
    }
    return (
        <div className={"my-reply-ports"}>
            <div className={"search"}>
                <RangePicker onChange={dataChanges} bordered={false} size={"large"}/>
                <Input placeholder="回贴内容" onChange={inputChanges} style={{maxWidth:256,marginRight:10}}/>
                <Button type="primary" onClick={searchChangeData}>查询</Button>
            </div>

            <div>
                <div
                    style={{marginBottom: 16}}>
                    <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                        Delete
                    </Button>
                    <span
                        style={{marginLeft: 8,}}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
            </div>
            {editReply && <EditReplyPorts visible={editReply} setVisible={setEditReply} editDatas={editDatas} />}
        </div>
    );
}

export default MyReplyPorts