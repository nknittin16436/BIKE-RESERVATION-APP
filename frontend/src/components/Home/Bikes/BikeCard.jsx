import React, { useState } from "react";
import "antd/dist/antd";
import { Card, Button, Space, Input, Rate, Typography } from "antd";
import "../../../App.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  createBikeReservation,
  getBikeReservations,
} from "../../../Service/ReservationService";
import { deleteBike, updateBike } from "../../../Service/BikeService";
import { useAlert } from "react-alert";
import { AddBikeSchema } from "../../../JoiSchema/Schema";
const { Meta } = Card;
const { Text } = Typography;

const BikeCard = ({ bike, getAllBikes, duration, setLoading }) => {
  const dispatch = useDispatch();
  const { isManager, isDateFilterAdded, loggedInUser } = useSelector(
    (state) => state.bikeReservation
  );
  const bikeId = bike.id;
  const userId = loggedInUser.id;

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedName, setEditedName] = useState(bike.name);
  const [editedColor, setEditedColor] = useState(bike.color);
  const [editedLocation, setEditedLocation] = useState(bike.location);
  const navigate = useNavigate();
  const alert = useAlert();

  const handleSeeReservations = async () => {
    navigate(`/reservations/bike?bikeId=${bikeId}`);
  };

  const handleEditBike = () => {
    setIsEditMode(true);
  };
  const handleUpdateCancelBike = () => {
    setIsEditMode(false);
    setEditedName(bike.name);
    setEditedColor(bike.color);
    setEditedLocation(bike.location);
  };

  const handleDeleteBike = async () => {
    try {
      setLoading(true);
      const res = await deleteBike(bikeId);
      if (res.success) {
        setLoading(false);
        alert.show("Bike Deleted succesfully");
        await getAllBikes();
      } else {
        setLoading(false);
        alert.show("Some error occured");
      }
    } catch (error) {
      setLoading(false);
      alert.show(error.message);
    }
  };

  const handleUpdateBike = async () => {
    console.log(editedName, editedColor, editedLocation);
    try {
      await AddBikeSchema.validateAsync({
        name: editedName,
        color: editedColor,
        location: editedLocation,
      });
      setLoading(true);
      const res = await updateBike({
        bikeId,
        editedName,
        editedColor,
        editedLocation,
      });
      if (res.success) {
        setLoading(false);
        alert.show("Bike updated succesfully");
        await getAllBikes();
        setIsEditMode(false);
      } else {
        setIsEditMode(false);
        setLoading(false);
        alert.show("Some error occured");
      }
    } catch (error) {
      setIsEditMode(false);
      alert.show(error.message);
    }
  };

  const submitBookNowBike = async () => {
    console.log("Book bike ", bikeId, userId, duration);

    try {
      const res = await createBikeReservation({
        bikeId,
        fromDate: duration[0],
        toDate: duration[1],
        userId,
      });
      if (res.success) {
        alert.show("Bike booked succesfully");
        await getAllBikes();
      }
    } catch (error) {
      alert.show(error.message);
    }
  };

  return (
    <Card
      style={{
        width: 500,
      }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <div>
          {isDateFilterAdded ? (
            <span>
              <Button type="success" onClick={submitBookNowBike}>
                Book Now
              </Button>
            </span>
          ) : (
            <Text type="danger">Select valid duration to book a bike</Text>
          )}
        </div>,
        <Space>
          {isManager && (
            <Button onClick={handleSeeReservations}>See Reservations</Button>
          )}
        </Space>,
      ]}
      extra={
        <Space>
          {isManager && !isEditMode && (
            <Button type="primary" onClick={handleEditBike}>
              Edit
            </Button>
          )}
          {isManager && isEditMode && (
            <Button type="success" onClick={handleUpdateCancelBike}>
              Cancel
            </Button>
          )}
          {isManager && isEditMode && (
            <Button type="primary" onClick={handleUpdateBike}>
              Update
            </Button>
          )}
          {isManager && (
            <Button type="danger" onClick={handleDeleteBike}>
              Delete
            </Button>
          )}
        </Space>
      }
    >
      <Meta
        title={`Bike Name : ${bike.name}`}
        description={
          <div>
            {!isEditMode && (
              <div>
                <p>{`Color : ${bike.color}`}</p>
                <p>{`Location : ${bike.location}`}</p>
                <span>
                  Rating : <Rate disabled defaultValue={bike.averageRating} />
                </span>
              </div>
            )}

            {isEditMode && (
              <div>
                <Space>
                  Name:{" "}
                  <Input
                    placeholder="Enter Bike Name"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                </Space>
                <br />
                <br />
                <Space>
                  Color:{" "}
                  <Input
                    placeholder="Enter Bike Color"
                    value={editedColor}
                    onChange={(e) => setEditedColor(e.target.value)}
                  />
                </Space>
                <br />
                <br />
                <Space>
                  Location:{" "}
                  <Input
                    placeholder="Enter Bike Location"
                    value={editedLocation}
                    onChange={(e) => setEditedLocation(e.target.value)}
                  />
                </Space>
              </div>
            )}
          </div>
        }
      />
    </Card>
  );
};

export default BikeCard;
