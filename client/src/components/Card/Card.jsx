import React from "react";

const Card = ({ name, img, types, id }) => {
  return (
    <div>
      <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      <h5>
        Type:
        {types.map((n) => {
          return (
            <p className="types">{n.charAt(0).toUpperCase() + n.slice(1)}</p>
          );
        })}
      </h5>
      <img src={img} alt="img not found" width="200px" height="250px" />
    </div>
  );
};

export default Card;
