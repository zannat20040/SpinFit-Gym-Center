import React from "react";
import { gymFeatures } from "../../../Utils";
import FeatureHeading from "./FeatureHeading";
import Feature from "./Feature";

const FeatureLayout = () => {
  return (
    <>
      <div className="hero py-10"></div>
      <div className="container m-auto px-4">
        <div className="grid grid-cols-2 py-10 items-center">
          <div className="grid grid-cols-2 gap-4">
            {gymFeatures.map((feature, index) => (
              <Feature feature={feature} key={index}></Feature>
            ))}
          </div>
          <FeatureHeading></FeatureHeading>
        </div>
      </div>
    </>
  );
};

export default FeatureLayout;
