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
import { deleteBike } from "../../../Service/BikeService";
const { Meta } = Card;
const { Text } = Typography;

const BikeCard = ({ bike, getAllBikes, duration }) => {
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

  const handleSeeReservations = async () => {
    navigate(`/reservations/bike?bikeId=${bikeId}`);
  };

  const handleEditBike = () => {
    setIsEditMode(true);
  };

  const handleDeleteBike = async () => {
    await deleteBike(bikeId);
    await getAllBikes();
  };

  const handleUpdateBike = async () => {
    console.log(editedName, editedColor, editedLocation);
    // await editUser(user.id, editedName, editedColor, editedLocation);
    // await getAllUsers();
    setIsEditMode(false);
  };
  const submitBookNowBike = async () => {
    console.log("Book bike ", bikeId, userId, duration);
    const data = await createBikeReservation({
      bikeId,
      fromDate: duration[0],
      toDate: duration[1],
      userId,
    });
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
            <Button type="success" onClick={handleEditBike}>
              Edit
            </Button>
          )}
          {isManager && isEditMode && (
            <Button type="success" onClick={handleUpdateBike}>
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
                    placeholder="Enter Your Name"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                </Space>
                <br />
                <br />
                <Space>
                  Email:{" "}
                  <Input
                    placeholder="Enter Your Email"
                    value={editedColor}
                    onChange={(e) => setEditedColor(e.target.value)}
                  />
                </Space>
                <br />
                <br />
                <Space>
                  Email:{" "}
                  <Input
                    placeholder="Enter Your Email"
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
