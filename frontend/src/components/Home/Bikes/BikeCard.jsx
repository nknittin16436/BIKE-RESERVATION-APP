import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

const { Meta } = Card;

const BikeCard = ({bike}) => (
  <Card
    style={{
      width: 300,
    }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
      title={bike.name}
      description={[
        <div>
            <p>{`Color : ${bike.color}`}</p>
            <p>{`Color : ${bike.location}`}</p>
         </div>
       ]}
    />
  </Card>
);

export default BikeCard;