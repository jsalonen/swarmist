import React from "react";

function getReplicaStatusIcon(running, desired) {
  if (desired === 0 && running === 0) {
    return {
      symbol: "\u2716",
      color: "red"
    };
  } else if (desired === running) {
    return {
      symbol: "\u2714",
      color: "green"
    };
  } else if (desired > running && running === 0) {
    return {
      symbol: "\u25B2",
      color: "red"
    };
  } else if (desired > running) {
    return {
      symbol: "\u25B2",
      color: "green"
    };
  } else if (desired < running) {
    return {
      symbol: "\u25BC",
      color: "orange"
    };
  } else {
    return {
      symbol: "?",
      color: "black"
    };
  }
}

const ServiceReplicaStatus = props => {
  const icon = getReplicaStatusIcon(props.running, props.desired);

  return (
    <span>
      <span style={{ color: icon.color }}>{icon.symbol}</span>
      {" "}
      {props.running}
      {" / "}
      {props.desired}
    </span>
  );
};

export default ServiceReplicaStatus;
