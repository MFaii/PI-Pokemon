import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={style.landingContainer}>
      <h1>Welcome to my Pokemon App</h1>
      <Link to="/home">
        <button className={style.button}>Get into</button>
      </Link>
    </div>
  );
};

export default LandingPage;
