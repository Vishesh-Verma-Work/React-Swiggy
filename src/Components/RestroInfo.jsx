import React, { useEffect, useState } from "react";
import { Restro_IMG_URL as imgg } from "../utils/Hard Coded Data/URL";
import { Restro_ID as id } from "../utils/Hard Coded Data/URL";
import ShimmerCard from "./ShimmerCard";
import { useParams } from "react-router-dom";
import Header from "./Header";
const RestroInfo = () => {
  const [res, setRes] = useState({});
  const [list, setList] = useState([]);
  const { resID } = useParams();
  const [toggle, setToggle] = useState(false);

  const fetchData = async () => {
    const data = await fetch(id + resID);
    const jsonData = await data.json();

    setRes(jsonData);
    const d = jsonData?.data?.cards.filter((c) => {
      return (
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      );
    });
    console.log(d);
    const itemCards =
      jsonData?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]
        ?.card?.card?.itemCards;
    setList(itemCards);
  };

  const funCall = ()=>{
    setToggle(!toggle);
    console.log(toggle);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (Object.keys(res).length === 0) {
    return <ShimmerCard />;
  } else {
    return (
      <>
        <Header />
        <div className="restro-info">
          <h1 className="title">
            {res?.data?.cards[2]?.card?.card?.info?.name}
          </h1>
          <div className="details">
            <div className="d">
              <h3>
                City: <span>{res?.data?.cards[2]?.card?.card?.info?.city}</span>
              </h3>
              <h3>
                Address:{" "}
                <span>
                  {res?.data?.cards[2]?.card?.card?.info?.slugs?.restaurant}
                </span>
              </h3>
              <h3>
                Cost for Two:{" "}
                <span>
                  {res?.data?.cards[2]?.card?.card?.info?.costForTwoMessage}
                </span>
              </h3>
              <h3>
                Cuisines:{" "}
                <span>
                  {res?.data?.cards[2]?.card?.card?.info?.cuisines?.join(", ")}
                </span>
              </h3>
              <h3>
                Avg Rating:{" "}
                <span>{res?.data?.cards[2]?.card?.card?.info?.avgRating}</span>
              </h3>
              <h3>
                Fee Details:{" "}
                <span>
                  {res?.data?.cards[2]?.card?.card?.info?.feeDetails?.message?.slice(
                    17
                  )}
                </span>
              </h3>
            </div>
          </div>
        </div>
        <div className="bar-cont" onClick={()=>{funCall()}}>
          <div className="bar">
          <h2>Recommended</h2>
          <span>⬇️</span>
          </div>
        </div>
        
        {
          toggle ? 
        
        <div className="restro-list">
          {list.map((item) => {
            return (
              <div key={item?.card?.info?.id} className="restro-card">
                <div className="data">
                  <h4 className="h4">{item?.card?.info?.name}</h4>
                  <h5>
                    {item?.card?.info?.description
                      ? item.card.info.description.substring(0, 145) + "..."
                      : ""}
                  </h5>

                  <h5>
                    ₹
                    {item?.card?.info?.defaultPrice / 100 ||
                      item?.card?.info?.finalPrice / 100 ||
                      item?.card?.info?.price / 100}
                  </h5>
                  <h5>Is Veg: {item?.card?.info?.isVeg ? "Yes" : "No"}</h5>
                </div>
                <div className="img">
                  <img
                    src={imgg + item?.card?.info?.imageId}
                    alt={item?.card?.info?.name}
                  />
                </div>
              </div>
            );
          })}
        </div>
        : ""
      }



      </>
    );
  }
};

export default RestroInfo;
