import React, { Component } from "react";

const FONT_SIZE = 14;
const COLOR_STDERR = "red";
const COLOR_STDOUT = "inherit";
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

    if (!logs) {
      return <div />;
    } else {
      return (
        <pre style={styles} ref={pre => (this.preElem = pre)}>
          {logs.map(([type, line], index) => {
            return (
              <div
                key={index}
                style={{
                  color: type === "stderr" ? COLOR_STDERR : COLOR_STDOUT
                }}
              >
                {line}
              </div>
            );
          })}
        </pre>
      );
    }
  }
}

export default LogWindow;
