import './Cooperation.css';
import { List } from 'antd';
import {useState,useEffect} from 'react';
import {collaborationCompanyQuery} from "../utils/HttpUtils";

function Cooperation(){
    const [data,setData] = useState([]);
    useEffect(()=>{
        collaborationCompanyQuery({"onlyStatus":2,"isActive":true},(rsp)=>{
            setData(rsp.datas);
        });
    },[]);
    return(
        <List
            style={{backgroundColor:'#fff',marginTop:20}}
            header={<div>合作区域</div>}
            bordered
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    <div className={"cooperation-img"}>
                        <img alt={item.describe} src={item.companyImages}/>
                        <a rel="noreferrer" href={item.linkUrl} target={"_blank"}>{item.describe}</a>
                    </div>
                </List.Item>
            )}
        />
    )
}

export default Cooperation