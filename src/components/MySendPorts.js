import {Button, Table,DatePicker,Input} from 'antd';
import {useState ,useEffect} from 'react';
import './MySendPorts.css'
import {queryMyPorts} from "../utils/HttpUtils";
const { RangePicker } = DatePicker;

const columns = [
    {
        title: '标题',
        dataIndex: 'name',
        render: (text) => <a>{text}</a>
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
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (text,) => <a onClick={()=>editClick(text )} >edit</a>,
    }
];

const editClick = (text) => {
    console.log(text);
}
let searchDatas = {
    beginTime:'',
    endTime:'',
    name:'',
    pageSize:1000
}
function MySendPorts(props) {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [data,setData] = useState([]);
    useEffect(() => {
        queryMyPorts(searchDatas,(rsp)=>{
            if(rsp.datas){
                rsp.datas.forEach(item=>{
                    item.key=item.id;
                })
                setData(rsp.datas);
            }
        });
    }, []);

    const start = () => {
        setLoading(true);
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
        console.log(selectedRowKeys);
    };
    const dataChanges = (data,dataString) => {
        searchDatas.beginTime=dataString[0];
        searchDatas.endTime=dataString[1];
    }
    const inputChanges = (data) => {
        searchDatas.name=data.target.value;
    }
    const searchChangeData = () => {
        queryMyPorts(searchDatas,(rsp)=>{
            if(rsp.datas){
                rsp.datas.forEach(item=>{
                    item.key=item.id;
                })
                setData(rsp.datas);
            }
            console.log(rsp);
        });
    }

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
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
                        style={{marginLeft: 8,}}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
            </div>
        </div>
    );
}

export default MySendPorts