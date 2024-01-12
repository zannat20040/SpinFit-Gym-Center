import React from "react";

const PageTitle = ({title}) => {
  return (
    <h1 className="text-4xl uppercase font-oswald font-bold  text-white  mb-10 p-6 border-l-8 border-[#dde244]">
      {title}
    </h1>
  );
};

export default PageTitle;
