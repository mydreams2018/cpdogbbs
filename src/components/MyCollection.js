import {Button, Table,DatePicker,Input} from 'antd';
import {useState ,useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {queryPortCollections,deletePortCollections} from "../utils/HttpUtils";
const { RangePicker } = DatePicker;

let searchDatas = {
    beginTime:'',
    endTime:'',
    name:'',
    pageSize:1000
}
function MyCollection(props) {
    const navigate = useNavigate();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [data,setData] = useState([]);
    useEffect(() => {
        queryPortCollections(searchDatas,(rsp)=>{
            if(rsp.datas){
                rsp.datas.forEach(item=>{
                    item.key=item.id;
                });
                setData(rsp.datas);
            }
        });
    }, []);
    const columns = [
        {
            title: '标题',
            dataIndex: 'portTitle',
            render: (text,obj) => <a onClick={()=>jumperPorts(text,obj)}>{text}</a>
        },
        {
            title: '日期',
            dataIndex: 'collectTime',
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
        deletePortCollections({
            ids:selectedRowKeys.join(","),
        },(rsp)=>{
            if(rsp.status===1){
                setSelectedRowKeys([]);
                let ArrayData = [];
                data.forEach(item=>{
                    if(!selectedRowKeys.includes(item.id)){
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
        queryPortCollections(searchDatas,(rsp)=>{
            if(rsp.datas){
                rsp.datas.forEach(item=>{
                    item.key=item.id;
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

    return (
        <div className={"my-send-ports"}>

            <div className={"search"}>
                <RangePicker onChange={dataChanges} bordered={false} size={"large"}/>
                <Input placeholder="贴子标题" onChange={inputChanges} style={{maxWidth:256,marginRight:10}}/>
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
                        style={{marginLeft: 8}}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
            </div>
        </div>
    );
}

export default MyCollection