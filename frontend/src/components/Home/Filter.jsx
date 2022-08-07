import React from "react";
import 'antd/dist/antd';
import { DatePicker, Space } from "antd";
import moment from 'moment';

const { RangePicker } = DatePicker;

const Filter = () => {
  const handleChange = (date,dateString) => {
    
    console.log("hellooo");
    console.log("Date",date);
    console.log("DateString",dateString);

  };
  return (
    <div>
      <Space direction="vertical" size={12}>
        <RangePicker showTime onChange={handleChange} />
      </Space>
    </div>
  );
};

export default Filter;
