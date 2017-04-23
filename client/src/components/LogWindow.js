import React, { Component } from "react";
import reactAnsiStyle from "react-ansi-style";

const styles = {
  margin: "16px",
  padding: "8px",
  backgroundColor: "black",
  color: "#fff",
  fontFamily: "Monospace"
};

const LogWindow = ({ logs }) =>
  (logs
    ? <pre style={styles}>
        {reactAnsiStyle(React, logs)}
      </pre>
    : null);

export default LogWindow;
