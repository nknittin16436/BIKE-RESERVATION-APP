import React from "react";
import Filter from "./Filter";
import Navbar from "./Navbar/Navbar";

const Home = () => {
  return (
    <div className="home__component">
      <div className="home__component__container">
        <Navbar />
        <Filter />
      </div>
    </div>
  );
};

export default Home;
