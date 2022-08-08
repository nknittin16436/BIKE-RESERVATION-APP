import React, { useState } from "react";
import "antd/dist/antd.css";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card, Button } from "antd";
import "../../App.css";
import { updateReservations } from "../../Service/ReservationService";

const { Meta } = Card;

const ReservationCard = ({ reservation, getAllReservations }) => {
  const isAdmin = true;

  const handleCancelReservation = async () => {
    const id = reservation.id;
    console.log(id);
    await updateReservations({ id });
    getAllReservations();
  };

  return (
    <Card
      style={{
        width: 500,
      }}
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <Button onClick={handleCancelReservation}>Cancel Reservation</Button>,
      ]}
    >
      <Meta
        title={`${reservation.bikeName}`}
        description={
          <div>
            {isAdmin && <p>{`User Name : ${reservation.userName}`}</p>}
            <p>{`Duration : ${reservation.fromDate} to ${reservation.toDate}`}</p>
            <p>Rating :</p>
          </div>
        }
      />
    </Card>
  );
};

export default ReservationCard;
