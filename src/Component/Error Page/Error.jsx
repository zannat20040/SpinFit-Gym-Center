import React from "react";
import Button from "../../Shared Component/Button";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="h-screen container mx-auto">
      <img
        src="https://cdn.pixabay.com/photo/2021/07/21/12/49/error-6482984_960_720.png"
        className="w-1/3 mx-auto"
        alt=""
      />
      <Link to="/" className="flex justify-center mt-10">
        <Button label={"Back to Home"}></Button>
      </Link>
    </div>
  );
};

export default Error;
