import React, { Component } from "react";
import reactAnsiStyle from "react-ansi-style";

const FONT_SIZE = 14;
const styles = {
  margin: "16px",
  padding: "8px",
  backgroundColor: "black",
  color: "#fff",
  fontFamily: "Monospace",
  fontSize: FONT_SIZE + "px",
  height: 30 * FONT_SIZE + "px",
  overflow: "scroll"
};

class LogWindow extends Component {
  componentDidUpdate() {
    if (this.preElem) {
      this.preElem.scrollTop = this.preElem.scrollHeight;
    }
  }

  render() {
    const { logs } = this.props;

    if (logs === undefined || logs === null) {
      return <div />;
    } else {
      return (
        <pre style={styles} ref={pre => (this.preElem = pre)}>
          {reactAnsiStyle(React, logs)}
        </pre>
      );
    }
  }
}

export default LogWindow;
