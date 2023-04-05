import {Button, Table, Input, Modal, Form,DatePicker ,Select,Upload,message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {collaborationCompanyQuery,collaborationInsert} from "../utils/HttpUtils";
import React, {useEffect, useState,useRef} from "react";
const { Option } = Select;

const searchDatas = {
    describe:'',
    pageSize:100
}
const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 16,
    },
};
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
/* eslint-enable no-template-curly-in-string */
const outProps = {
    name: 'file',
    action: '/api/manager/uploadImg',
    maxCount:1,
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            if(info.file.response.status===1){
                message.success(`${info.file.name} 上传成功`);
            }else{
                message.error(info.file.response.msg);
            }
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

function CollaborationCompany() {
    const buttonClickRef = useRef(null);
    const [data,setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        collaborationCompanyQuery(searchDatas,(rsp)=>{
            if(rsp.datas){
                rsp.datas.forEach(item=>{
                    item.key=(item.id);
                });
                setData(rsp.datas);
            }
        });
        return () => {
            searchDatas.describe='';
        };
    }, []);
    const columns = [
        {
            title: '标题',
            dataIndex: 'describe'
        },
        {
            title: '开始时间',
            dataIndex: 'avtiveTime',
        },
        {
            title: '结束时间',
            dataIndex: 'endTime',
        },
        {
            title: '类型',
            dataIndex: 'onlyStatus',
            render: (onlyStatus) => onlyStatus===1?"轮播区域":"合作区域"
        },
        {
            title: '链接地址',
            dataIndex: 'linkUrl'
        },
        {
            title: '业务人员',
            dataIndex: 'businessPeople'
        },
        {
            title: '排序',
            dataIndex: 'baseOrder'
        }
    ];

    const inputChanges = (data) => {
        searchDatas.describe=data.target.value;
    }
    const searchChangeData = () => {
        collaborationCompanyQuery(searchDatas,(rsp)=>{
            if(rsp.datas){
                rsp.datas.forEach(item=>{
                    item.key=(item.id);
                });
                setData(rsp.datas);
            }
        });
    }
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        buttonClickRef.current.click();
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onFinish = (values) => {
        let insertData = {...values.collaboration};
        insertData.avtiveTime = values.collaboration.avtiveTime.format("yyyy-MM-DD");
        insertData.endTime = values.collaboration.endTime.format("yyyy-MM-DD");
        insertData.companyImages = values.collaboration.companyImages.file.response.action;
        collaborationInsert(insertData,(rsp)=>{
            if(rsp.status===1){
                message.success(rsp.msg);
                setIsModalOpen(false);
            }else{
                message.error(rsp.msg);
            }
        });
    };
    return (
        <>
            <div className={"manager-collaboration_company"}>
                <div className={"search"}>
                    <Input placeholder="公司名称" onChange={inputChanges} style={{maxWidth:256,marginRight:10}}/>
                    <Button type="primary" onClick={searchChangeData}>查询</Button>
                    <Button type="primary" onClick={showModal} style={{marginLeft:20}}>添加数据</Button>
                </div>
                <Table columns={columns} dataSource={data} pagination={{
                    position: ["bottomCenter"]
                }}/>
            </div>

            <Modal title="添加合作数据" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true}>

                <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item
                        name={['collaboration', 'describe']}
                        label="公司描述信息"
                        rules={[
                            {
                                required: true
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['collaboration', 'onlyStatus']}
                        label="合作区域"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select placeholder="选择区域">
                            <Option value="1">轮播图</Option>
                            <Option value="2">合作区域</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={['collaboration', 'linkUrl']}
                        label="推广链接"
                        rules={[
                            {
                                required: true,
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['collaboration', 'businessPeople']} label="业务员">
                        <Input />
                    </Form.Item>

                    <Form.Item name={['collaboration', 'avtiveTime']} label="开始时间" rules={[
                        {
                            type: 'object',
                            required: true,
                            message: 'Please select time!'
                        },
                    ]}>
                        <DatePicker style={{width:"100%"}} />
                    </Form.Item>
                    <Form.Item name={['collaboration', 'endTime']} label="结束时间" rules={[
                        {
                            type: 'object',
                            required: true,
                            message: 'Please select time!'
                        },
                    ]}>
                        <DatePicker style={{width:"100%"}} />
                    </Form.Item>

                    <Form.Item name={['collaboration', 'companyImages']} label="上传图片" rules={[
                        {
                            type: 'object',
                            required: true
                        },
                    ]}>
                        <Upload {...outProps}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item hidden={true}
                        wrapperCol={{
                            ...layout.wrapperCol,
                            offset: 8,
                        }}>
                        <Button type="primary" ref={buttonClickRef} htmlType="submit">
                            提交数据
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
         </>
    );
}

export default CollaborationCompany;