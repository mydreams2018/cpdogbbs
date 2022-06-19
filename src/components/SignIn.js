import './SignIn.css'
import { notification ,Table,Button } from 'antd';
import MainContext from "../MainContext";
import {useState,useEffect,useContext} from 'react';
import { HighlightTwoTone } from '@ant-design/icons';
import {signByOn, signByPrimaryKey} from "../utils/HttpUtils";
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
const openNotificationWithIcon = (type,msg) => {
    notification[type]({
        message: '提醒',
        description: msg,
        duration:1.5
    });
};
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
    const usercon = useContext(MainContext);
    const [isLoad, setIsLoad] = useState(()=>false);
    const [signState, setSignState] = useState(()=>{
        return {
            accumulateSign: 0,
            currentSign: true,
            lastSignTime: "0",
            countSign:5
        }
    });
    const setCountSign = (rt) => {
        setSignState(rt);
        if(rt.accumulateSign >= 30){
            rt.countSign = 30;
        }else if(rt.accumulateSign >= 15){
            rt.countSign = 15;
        }else if(rt.accumulateSign >= 5){
            rt.countSign = 10;
        }else{
            rt.countSign = 5;
        }
    }
    useEffect(()=>{
        signByPrimaryKey({},(rt)=>{
            if(rt.id){
                setCountSign(rt);
            }
        });
    },[usercon]);
    const signOn = () => {
        if(usercon){
            setIsLoad(true);
            signByOn({},(rt)=>{
                if(rt.status===1){
                    openNotificationWithIcon('success',rt.msg);
                    signByPrimaryKey({},(rt)=>{
                        if(rt.id){
                            setCountSign(rt);
                        }
                    });
                }else{
                    openNotificationWithIcon('warning',rt.msg);
                }
                setIsLoad(false);
            });
        }
    }
    return(
        <div className={"sign-in"}>
            <div className={"sign-titile"}>
                <span onClick={openNotification}>说明</span>
                <span>连续签到第{signState.accumulateSign}天</span>
            </div>
            <div className={"sign-con"}>
                <Button type="primary" onClick={signOn} disabled={signState.currentSign} icon={<HighlightTwoTone />} loading={isLoad} >
                    签到
                </Button>
                <span>今天签到可获得{signState.countSign}积分</span>
            </div>
        </div>
    );
}

export default SignIn