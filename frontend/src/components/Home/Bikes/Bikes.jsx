import { Grid } from "@mui/material";

import React from "react";

const Bikes = () => {
  return (
    <div className="bikes">
      <div className="bikes__container">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(Array(6)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item>xs=2</Item>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Bikes;
