import './SignIn.css'
import { notification ,Table,Button } from 'antd';
import { HighlightTwoTone } from '@ant-design/icons';

const columns = [
    {
        title: '连续签到天数',
        dataIndex: 'name',
    },
    {
        title: '每次可获得积分',
        dataIndex: 'nums',
    },
];
const data = [
    {
        key: '1',
        name: '<5',
        nums: '5',
    },
    {
        key: '2',
        name: '>=5',
        nums: '10',
    },
    {
        key: '3',
        name: '>=15',
        nums: '15',
    },
    {
        key: '4',
        name: '>=30',
        nums: '30',
    }
];

const openNotification = () => {
    const args = {
        message: '提示',
        description: <Table
            pagination={false}
            columns={columns}
            dataSource={data}
            bordered
            title={() => '签到可以获得社区积分、规则如下'}/>,
        duration: 2,
    };
    notification.open(args);
};


function SignIn(){
    return(
        <div className={"sign-in"}>
            <div className={"sign-titile"}>
                <span onClick={openNotification}>说明</span>
                <span>连续签到第{5}天</span>
            </div>
            <div className={"sign-con"}>
                <Button type="primary" disabled={false} icon={<HighlightTwoTone />} loading={false} >
                    签到
                </Button>
                <span>今天签到可获得5积分</span>
            </div>
        </div>
    );
}

export default SignIn