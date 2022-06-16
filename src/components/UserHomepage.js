import { Badge, Descriptions,Image } from 'antd';

const UserHomepage = () => (
    <Descriptions title="用户详情" bordered style={{textAlign:'center'}}>
        <Descriptions.Item label="呢称">刘大胖</Descriptions.Item>
        <Descriptions.Item label="性别">纯爷们</Descriptions.Item>
        <Descriptions.Item label="状态">正常</Descriptions.Item>
        <Descriptions.Item label="注册时间">2018-04-24 18:00:00</Descriptions.Item>
        <Descriptions.Item label="最后上线时间" span={2}>
            2019-04-24 18:00:00
        </Descriptions.Item>
        <Descriptions.Item label="Status" span={3}>
            <Badge status="processing" text="Running" />
        </Descriptions.Item>
        <Descriptions.Item label="总积分数">80</Descriptions.Item>
        <Descriptions.Item label="头像">
            <Image
                width={64} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
        </Descriptions.Item>
        <Descriptions.Item label="邮箱">qepau886@130.com</Descriptions.Item>
        <Descriptions.Item label="个人描述">
            <pre style={{
                whiteSpace:"pre-wrap",
                wordWrap:"break-word",
                overflowWrap:"break-word"
            }}>
                既然我们已经设置了 canvas 环境，
                我们可以深入了解如何在 canvas 上绘制。到本文的最后，你将学会如何绘制矩形，三角形，
                直线，圆弧和曲线，变得熟悉这些基本的形状。绘制物体到 Canvas 前，需掌握路径，我们看看到底怎么做。
            </pre>
        </Descriptions.Item>
    </Descriptions>
);

export default UserHomepage;