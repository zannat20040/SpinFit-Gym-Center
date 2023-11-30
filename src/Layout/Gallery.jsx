import React, { useContext, useEffect, useState } from "react";
import RouteLabel from "../Shared Component/RouteLabel";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = () => {
    axios
      .get("https://server-psi-tawny-84.vercel.app/gallery")
      .then((res) => {
        const newItems = res.data.slice(items.length, items.length + 12);
        setItems([...items, ...newItems]);

        if (items.length < 76) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="">
      <Helmet>
        <title>SpinFit | Gallery</title>
      </Helmet>
      <RouteLabel label={"gallery"}></RouteLabel>
      <div className="container mx-auto px-4 pb-12">
        <InfiniteScroll
          dataLength={items.length}
          next={fetchData}
          hasMore={hasMore}
          loader={
            <div className="container mx-auto mt-10 text-center">
              <span className="loading loading-ring loading-lg"></span>
            </div>
          }
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
