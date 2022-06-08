import { IeOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import './FixedUtils.css'

function FixedUtil(){
    return (
            <div className="fixedUtils" id='fixed-utils'>
                <div className="btn">
                    <Button type="primary" size={'middle'}
                            onClick={()=> window.open("https://github.com/mydreams2018","github")}>
                        github
                    </Button>
                    <Button type="primary" size={'middle'}
                            onClick={()=> window.open("https://space.bilibili.com/384704339","bilibili")}>
                        bilibili
                    </Button>
                </div>
                <div className="default-show">
                    <IeOutlined style={{ fontSize: '26px', color: '#08c' }} />
                </div>
            </div>
    );
}

export default FixedUtil;