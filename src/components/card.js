/* eslint-disable no-unused-vars */
import React from "react";

function Card(props) {
  return (
    <div>
      <p>{props.days}</p>
      <p>{props.temperatures} °С</p>
    </div>
  );
}

export default Card;
