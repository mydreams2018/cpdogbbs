import { Avatar, Badge,Space,Image  } from 'antd';
import './ReplyWeek.css'
function ReplyWeek(props){
    return(
        <div className={"reply-week"}>
            {
                props.showTitle &&  <div className={"title"}>
                                        <h3>回贴周榜</h3>
                                     </div>
            }
            <Space size={[10, 10]} wrap>
                {
                    props.imgs && props.imgs.map((item)=>{
                        return  <Badge count={item.replyNumber} key={item.id}>
                            <Avatar size={56} src={<Image title={item.userAccount} src={item.userImg} style={{ width: 56 }} />} shape="square" />
                        </Badge>
                    })
                }
            </Space>

        </div>
    );
}

export default ReplyWeek;