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
import { useAlert } from "react-alert";
const desc = ["terrible", "bad", "normal", "good", "wonderful"];
const { Text } = Typography;
const { Meta } = Card;

const ReservationCard = ({ reservation, getAllReservations, setLoading }) => {
  const alert = useAlert();
  const [rating, setRating] = useState(0);
  const { isManager, loggedInUser } = useSelector(
    (state) => state.bikeReservation
  );

  const handleCancelReservation = async () => {
    const id = reservation.id;
    try {
      setLoading(true);
      const res = await updateReservationStatus({ id });
      if (res.success) {
        alert.show("Reservation cancelled Succesfully");
        setLoading(false);
        await getAllReservations();
      } else {
        setLoading(false);
        alert.show("Some Error occured");
      }
    } catch (error) {
      setLoading(false);
      alert.show(error.message);
    }
  };

  const submitReservationRating = async () => {
    const id = reservation.id;
    try {
      setLoading(true);
      const res = await updateReservationRating({ id, rating });
      if (res.success) {
        alert.show("Rating Added succesfully");
        setLoading(false);
        await getAllReservations();
      } else {
        setLoading(false);
        alert.show("Some Error occured");
      }
    } catch (error) {
      setLoading(false);
      alert.show(error.message);
    }
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
