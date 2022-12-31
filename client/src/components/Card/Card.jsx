import React from "react";
import style from "./Card.module.css";

const Card = ({ name, img, types, id }) => {
  return (
    <div className={style.cardContainer}>
      <div>
        <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
        <img
          className="img"
          src={img}
          alt="img not found"
          width="200px"
          height="250vh"
        />
        <h5>
          Type/s:
          {types.map((n) => {
            return (
              <p className="types">{n.charAt(0).toUpperCase() + n.slice(1)}</p>
            );
          })}
        </h5>
      </div>
    </div>
  );
};

export default Card;
