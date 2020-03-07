import React, { Component } from "react";
import "./spinners.scss";

class StatusBox extends Component {
  render() {
    let element;

    switch (this.props.status) {
      case "waiting":
        element = (
          //   <div className="spinner-grow m-5" role="status">
          //     <span className="sr-only">Loading...</span>
          //   </div>
          <div className="circonf circonf-5"></div>
        );
        break;
      default:
        element = <p>呀，真是晴天霹雳，系统维护中……</p>;
    }
    return (
      <div className="row justify-content-center m-2">
        <div className="col-4 m-2 text-center">{element}</div>
      </div>
    );
  }
}

export default StatusBox;
