import React, { useState } from "react";
import "antd/dist/antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card, Button, Typography } from "antd";
import "../../App.css";
import { updateReservations } from "../../Service/ReservationService";
import StarRating from "../StarRating/StarRating";
import { Rate } from "antd";
const desc = ["terrible", "bad", "normal", "good", "wonderful"];
const { Text } = Typography;
const { Meta } = Card;

const ReservationCard = ({ reservation, getAllReservations }) => {
  const isAdmin = true;
  const [value, setValue] = useState(3);

  const handleCancelReservation = async () => {
    const id = reservation.id;
    console.log(id);
    await updateReservations({ id });
    getAllReservations();
  };

  return (
    <Card
      style={{
        width: 520,
      }}
      actions={[
        <div>
          <Text type="success">Rate Reservation: </Text>
          <span>
            <Rate tooltips={desc} onChange={setValue} value={value} />
          </span>
        </div>,
        <Button
          onClick={handleCancelReservation}
          disabled={!reservation.status}
        >
          Cancel Reservation
        </Button>,
      ]}
      extra={
        reservation.status ? (
          <Text type="success">Active</Text>
        ) : (
          <Text type="danger">Cancelled</Text>
        )
      }
    >
      <Meta
        title={`${reservation.bikeName}`}
        description={
          <div>
            {isAdmin && <p>{`User Name : ${reservation.userName}`}</p>}
            <p>{`Duration : ${reservation.fromDate} to ${reservation.toDate}`}</p>
            <p>
              Rating : <Rate disabled defaultValue={reservation.rating} />
            </p>
          </div>
        }
      />
    </Card>
  );
};

export default ReservationCard;
