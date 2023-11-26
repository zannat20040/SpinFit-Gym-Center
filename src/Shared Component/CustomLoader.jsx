import React from 'react';
import ContentLoader from "react-content-loader"

const CustomLoader = () => {
    return (
        <ContentLoader
        speed={2}
        width={200}
        height={160}
        viewBox="0 0 400 160"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"

      >
        <rect  x="0" y="0" rx="5" ry="5" width="500" height="550" /> 

      </ContentLoader>
    );
};

export default CustomLoader;