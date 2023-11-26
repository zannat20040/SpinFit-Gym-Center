import React, { useContext, useEffect, useState } from "react";
import RouteLabel from "../Shared Component/RouteLabel";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import CustomLoader from "../Shared Component/CustomLoader";

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    const response = await axios.get('http://localhost:5000/gallery');
      const newItems = response.data.slice(items.length, items.length + 12);
      setItems([...items, ...newItems]);

      if (items.length < 76) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(items);
  return (
    <div className="">
      <RouteLabel label={"gallery"}></RouteLabel>
      <div className="container mx-auto px-4 pb-12">
        <InfiniteScroll
          dataLength={items.length} 
          next={fetchData}
          hasMore={hasMore}
          loader={<CustomLoader></CustomLoader>}
          endMessage={
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              <b className="text-white ">Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="grid grid-cols-5 gap-5 justify-center">
            {items.map((item, index) => (
              <img
              src={item?.src}
              key={index}
              className="w-full h-[250px]"
              alt=""
            /> 
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Gallery;