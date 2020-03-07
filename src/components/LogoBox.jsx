import React from "react";
import puppy from "./puppy.png";

const LogoBox = () => {
  return (
    <div className="row m-2 text-center">
      <div className="col">
        <img className="logo" src={puppy} alt="" />
      </div>
    </div>
  );
};

export default LogoBox;
