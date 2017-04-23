import React from "react";
import Paper from "material-ui/Paper";

const style = {
  margin: 0,
  padding: 1 + "rem"
};

const ConnectionStatusInfo = ({ title, subtitle }) => {
  return (
    <Paper style={style} zDepth={2}>
      <h2>{title}</h2>
      <h3>{subtitle}</h3>
    </Paper>
  );
};

export default ConnectionStatusInfo;
