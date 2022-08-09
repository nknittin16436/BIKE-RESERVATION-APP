import React, { useState } from "react";
import "antd/dist/antd";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";
import { Card, Button, Space, Input, Select } from "antd";
import "../../../App.css";
import { useNavigate } from "react-router-dom";
const { Option } = Select;
const { Meta } = Card;

const BikeCard = ({ bike, getAllBikes }) => {
  const isAdmin = true;
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedName, setEditedName] = useState(bike.name);
  const [editedColor, setEditedColor] = useState(bike.color);
  const [editedLocation, setEditedLocation] = useState(bike.location);
  const navigate = useNavigate();

  const handleSeeReservations = async () => {
    // const id = user.id;
    // navigate(`/reservation?userId=${user.id}`);
  };

  const handleEditBike = () => {
    setIsEditMode(true);
  };

  const handleUpdateBike = async () => {
    console.log(editedName, editedColor, editedLocation);
    // await editUser(user.id, editedName, editedColor, editedLocation);
    // await getAllUsers();
    setIsEditMode(false);
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
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <Button onClick={handleSeeReservations}>See Reservations</Button>,
      ]}
      extra={
        <Space>
          {!isEditMode && (
            <Button type="success" onClick={handleEditBike}>
              Edit
            </Button>
          )}
          {isEditMode && (
            <Button type="success" onClick={handleUpdateBike}>
              Update
            </Button>
          )}
          <Button type="danger">Delete</Button>
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