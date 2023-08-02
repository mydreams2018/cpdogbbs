import "./UserMail.css";
import {Table,message} from 'antd';
import React,{useState,useEffect} from 'react';
import {selectUserMessageAll,userMessageUpdateMsgState} from "../utils/HttpUtils";
import {changeClassPortName,changeUserMessageType} from "../utils/BaseUtils";
import {useNavigate} from "react-router-dom";
import UserDrawer from "./UserDrawer";
function UserMail() {
    const navigate = useNavigate();
    const [msgState, setMsgState] = useState(0);
    const [userMailData, setUserMailData] = useState([]);
    useEffect(()=>{
        selectUserMessageAll({pageSize:100,msgState:msgState},(rsp)=>{
            if (rsp.length > 0){
                rsp.forEach(item=> item.key=item.id);
                setUserMailData(rsp);
            }else{
                setUserMailData([]);
            }
        });
    },[msgState]);
    const UserMailColumns = [
        {
            title: '主贴',
            dataIndex: 'portTitle',
            render: (text,obj) => <span style={{color:"#1890ff",cursor:"pointer"}} onClick={()=>jumperPorts(text,obj)}>{text}</span>
        },
        {
            title: '分区',
            dataIndex: 'classId',
            render: (classId) => changeClassPortName(classId)
        },
        {
            title: '类型',
            dataIndex: 'msgType',
            render: (msgType) => changeUserMessageType(msgType)
        },
        {
            title: '信息来源',
            dataIndex: 'userAlias',
            render: (userAlias) => <UserDrawer alias={userAlias}/>
        },
        {
            title: '创建日期',
            dataIndex: 'createDate',
        },
        {
            title: '查看日期',
            dataIndex: 'viewDate',
        },
    ];
    const onChange = (key) => {
        setMsgState(key);
    };
    const onShowAccept = (expanded, record) => {
        if (expanded && record.msgState===0){
            userMessageUpdateMsgState(record,(rsp)=>{
                if (rsp.status === 1){
                    record.msgState = 1;
                    message.info("查看数据成功");
                }else{
                    message.error("数据可能正在修改审核中...");
                }
            });
        }
    }
    const jumperPorts = (text,obj) => {
        if (obj.msgType !== 1){
            switch (obj.classId) {
                case 1:
                    navigate("/java/details",{state:{id:obj.portId}});
                    break;
                case 2:
                    navigate("/react/details",{state:{id:obj.portId}});
                    break;
                case 3:
                    navigate("/database/details",{state:{id:obj.portId}});
                    break;
                default:
            }
        }
    }
    return (
        <div className={"user-mail"}>
            <div className={"user-mail-header"}>
                <span className={msgState===0?"current-span":""} onClick={()=>onChange(0)}>未读</span>
                <span className={msgState===1?"current-span":""} onClick={()=>onChange(1)}>已读</span>
            </div>
            <Table
                columns={UserMailColumns}
                expandable={{
                    expandedRowRender: (record) => (
                        <pre>
                            {record.msgType===1?record.msgInfo:record.detailsText}
                        </pre>
                    ),
                    rowExpandable:()=>true,
                    onExpand:(expanded, record) => onShowAccept(expanded, record)
                }}
                dataSource={userMailData}
            />
        </div>
    );
}
export default UserMail;