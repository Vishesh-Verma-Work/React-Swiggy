import React, { useEffect, useState } from "react";
import { Restro_IMG_URL as imgg } from "../utils/Hard Coded Data/URL";
import { Restro_ID as id } from "../utils/Hard Coded Data/URL";
import ShimmerCard from "./ShimmerCard";
import { useParams } from "react-router-dom";
import Header from "./Header";
import AccordionData from "./AccordionData";

const RestroInfo = () => {
  const [res, setRes] = useState({});
  const [list, setList] = useState([]);
  const { resID } = useParams();
  const [toggle, setToggle] = useState(false);
  const [accordion, setAccordion] = useState([]);
  const [accordionToggle, setAccordionToggle] = useState(false);
  const [accordionDataSend, setAccordionDataSend] = useState([])

  const fetchData = async () => {
    try {
      const data = await fetch(id + resID);
      const jsonData = await data.json();

      const restaurantInfo = jsonData?.data?.cards[2]?.card?.card?.info;
      setRes(restaurantInfo);

      const itemCards =
        jsonData?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]
          ?.card?.card?.itemCards;
      setList(itemCards);

      const x =
        jsonData?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
          (data) => {
            return (
              data?.card?.card?.["@type"] ===
              "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
            );
          }
        );
      setAccordion(x);

     
    } catch (error) {
      console.error("Failed to fetch restaurant data:", error);
    }
  };



  const funCall = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Check if the restaurant info is loaded, otherwise show shimmer effect
  if (!res?.name) {
    return <ShimmerCard />;
  }

  return (
    <>
      <Header />
      <div className="restro-info">
        <h1 className="title">{res.name}</h1>
        <div className="details">
          <div className="d">
            <h3>
              City: <span>{res.city}</span>
            </h3>
            <h3>
              Address: <span>{res.slugs?.restaurant}</span>
            </h3>
            <h3>
              Cost for Two: <span>{res.costForTwoMessage}</span>
            </h3>
            <h3>
              Cuisines: <span>{res.cuisines?.join(", ")}</span>
            </h3>
            <h3>
              Avg Rating: <span>{res.avgRating}</span>
            </h3>
            <h3>
              Fee Details: <span>{res.feeDetails?.message?.slice(17)}</span>
            </h3>
          </div>
        </div>
      </div>

      <div className="bar-cont" onClick={() => funCall()}>
        <div className="bar">
          <h2>Recommended</h2>
          <span>⬇️</span>
        </div>
      </div>

      {toggle ? (
        <div className="restro-list">
          {list?.map((item) => (
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
          ))}
        </div>
      ) : (
        ""
      )}

      <div className="acc-cont">
        {accordion.map((data, index) => {
          return (
            // <>
            //   <div key={index} className="acc" onClick={()=>{setAccordionDataSend(data?.card?.card?.itemCards)}}>
            //     <h3>{data?.card?.card?.title}</h3>
            //     <h3>⬇️</h3>
            //   </div>
            //     <AccordionData data={accordionDataSend}/>
            // </>
            <>
            <AccordionData key={index} data={data?.card?.card}/>
            </>
          );
        })}
      </div>
    </>
  );
};

export default RestroInfo;
