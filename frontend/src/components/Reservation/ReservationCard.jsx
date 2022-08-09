import React, { useState } from "react";
import "antd/dist/antd";
import { Card, Button, Typography } from "antd";
import "../../App.css";
import { updateReservationStatus ,updateReservationRating} from "../../Service/ReservationService";
import { Rate } from "antd";
const desc = ["terrible", "bad", "normal", "good", "wonderful"];
const { Text } = Typography;
const { Meta } = Card;

const ReservationCard = ({ reservation, getAllReservations }) => {
  const isAdmin = true;
  const [rating, setRating] = useState(0);

  const handleCancelReservation = async () => {
    const id = reservation.id;
    console.log(id);
    await updateReservationStatus({ id});
    getAllReservations();
  };

  const submitReservationRating = async () => {
    const id = reservation.id;
    console.log(rating,id);
    await updateReservationRating({ id,rating });
    getAllReservations();
  };

  return (
    <Card
      style={{
        width: 520,
      }}
      actions={[
        <div>
          {!reservation.isRated ? (
            <span>
              <Rate tooltips={desc} onChange={setRating} value={rating} />
              <Button type="success" onClick={submitReservationRating}>
                Rate Reservation
              </Button>
            </span>
          ) : (
            <Text type="success">You've Already rated</Text>
          )}
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
            <span>
              Rating : <Rate disabled defaultValue={reservation.rating} />
            </span>
          </div>
        }
      />
    </Card>
  );
};

export default ReservationCard;
