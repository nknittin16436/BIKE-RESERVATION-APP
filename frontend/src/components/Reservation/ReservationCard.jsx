import React, { useState } from "react";
import "antd/dist/antd";
import { Card, Button, Typography } from "antd";
import "../../App.css";
import {
  updateReservationStatus,
  updateReservationRating,
} from "../../Service/ReservationService";
import { useSelector } from "react-redux";
import { Rate } from "antd";
const desc = ["terrible", "bad", "normal", "good", "wonderful"];
const { Text } = Typography;
const { Meta } = Card;

const ReservationCard = ({ reservation, getAllReservations }) => {
  const [rating, setRating] = useState(0);
  const { isManager, loggedInUser } = useSelector(
    (state) => state.bikeReservation
  );

  const handleCancelReservation = async () => {
    const id = reservation.id;
    console.log(id);
    await updateReservationStatus({ id });
    await getAllReservations();
  };

  const submitReservationRating = async () => {
    const id = reservation.id;
    console.log(rating, id);
    await updateReservationRating({ id, rating });
    await getAllReservations();
  };

  return (
    <Card
      style={{
        width: 520,
      }}
      actions={[
        <div>
          {reservation.userId === loggedInUser.id ? (
            reservation.status ? (
              !reservation.isRated ? (
                <span>
                  <Rate tooltips={desc} onChange={setRating} value={rating} />
                  <Button type="success" onClick={submitReservationRating}>
                    Rate Reservation
                  </Button>
                </span>
              ) : (
                <Text type="success">You've Already rated</Text>
              )
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>,
        <span>
          {(isManager || reservation.userId === loggedInUser.id) && (
            <Button
              onClick={handleCancelReservation}
              disabled={reservation.isRated || !reservation.status}
            >
              Cancel Reservation
            </Button>
          )}
          ,
        </span>,
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
            <p>{`User Name : ${reservation.userName}`}</p>
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
