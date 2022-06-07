import { IeOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import './FixedUtils.css'

function FixedUtil() {

    return (
            <div className="fixedUtils">
                <Button type="primary" icon={<IeOutlined />} size={'large'}
                        onClick={()=> window.open("https://github.com/mydreams2018","github")}>
                    github
                </Button>
                <Button type="primary" icon={<IeOutlined />} size={'large'}
                        onClick={()=> window.open("https://space.bilibili.com/384704339","bilibili")}>
                    bilibili
                </Button>
            </div>
    );
}

export default FixedUtil;