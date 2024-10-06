import React, { createElement, useState, useEffect, lazy,Suspense,useContext } from "react";
import {createBrowserRouter, RouterProvider, Outlet,Link } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Header from "./src/Components/Header";
import Cards  from "./src/Components/Cards";
import Offer from "./src/Components/Offer";
import Line from "./src/Components/Line";
import useOnlineStatus from "./src/utils/Hooks/useOnlineStatus";
import Error from "./src/Components/Error";
import Contact from "./src/Components/Contact";
import ChangeUserName from "./src/Components/ChangeUserName";
import Order from "./src/Components/Order";
import ShimmerCard from "./src/Components/ShimmerCard";
import UserClass from './src/Components/UserClass';
import RestroInfo from "./src/Components/RestroInfo";
import "./src/styles/header.css";
import "./src/styles/cards.css";
import "./src/styles/appJS.css";
import "./src/styles/filter.css";
import "./src/styles/userClass.css";
import "./src/styles/shimmerCard.css";
import "./src/styles/restroInfo.css";

import userContext from "./src/utils/contextData/userContext";

const Grocery = lazy(() => import("./src/Components/Grocery"));

const Body = () => {
  const [List, setList] = useState([]);
  const [dummyList, setDummyList] = useState([])
  const [data, setData] = useState("");
  // this is an higher order function 
  // const RestroPromotedCard = LabeledCard(Cards);
  useEffect(() => {
    fetchData();
    //functional compo mai cleanup fun nahi hota, like in class based comp componentWillUnmount, hence we clean like this
    const timmer = setInterval(()=>{
      console.log("Timer is runing");
    },1000)
    return ()=>{
      clearInterval(timmer);
      console.log("Timmer ended");
    }
  }, []);

  const [authName, setAuthName] = useState("default user");

  useEffect(()=>{
    //auth check se data user name aaega
    const data =  {
      name : "Lucifer",
    }
    setAuthName(data.name);
  },[])

  



  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.65200&lng=77.16630&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const jsonData = await data.json();
    setList(
      jsonData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants 
    );
    setDummyList( jsonData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
      ?.restaurants);
  };

  const flterBySearch = ()=>{
    let SearchedList = List.filter((res)=>{
      return res.info.name.toLowerCase().includes(data.toLowerCase());
    })

    if(SearchedList.length === 0){
      return (  
        console.log("Not Found")
      )
    }
    setDummyList(SearchedList);
    
  }

  const checkStatus = useOnlineStatus;
  
  if(checkStatus === false){
    return(
      <h1>This is on</h1>
    )
  }


  if (dummyList.length === 0) {
    return (
      <>
        <Header />
        <Outlet/>
        <Line />
        <ShimmerCard/>
      </>
    );
  }
  else{
  
  return (
    <>
    <userContext.Provider value={{logedInUser : authName, setAuthName}}>
      <Header />
      {/* {console.log(dummyList)} */}
      {/* <Outlet/> */}
      
      <div className="mn">
        <div className="srch">
        <input type="text"  placeholder="Restaurant"className="inp"  value={data} onChange={(e)=>{setData(e.target.value)}}/>
        <button className="btn" onClick={()=>{flterBySearch()}}>Search</button>
        </div>
      </div>  

      <Line />

      <div className="container">
        <button
          className="button"
          onClick={() => {
            let FilteredList = List.filter((res) => res.info.avgRating > 4.2);
            setDummyList(FilteredList);
          }}
        >
          +4.2 Restaurants
        </button>
      </div>

      <Line />

      <div className="cards-container">
        {dummyList.map((res) => (
          <Link key={res.info.id} to={"/restro/"+res.info.id}>
           
          <Cards
            key={res.info.id}
            name={res.info.name}
            avgRating={res.info.avgRating}
            cloudinaryImageId={res.info.cloudinaryImageId}
            time={res.info.sla.slaString}
            cuisines={res.info.cuisines.join(", ")}
            areaName={res.info.areaName}
            header={res.info.aggregatedDiscountInfoV3?.header}
            subHead={res.info.aggregatedDiscountInfoV3?.subHeader}
          />
        </Link>
        ))}
      </div>

      <ChangeUserName/>
      </userContext.Provider>
    </>
  );
};


}

// const appRouter = createBrowserRouter([
//   {
//     path : "/",
//     element : <Body/>,
//     errorElement : <Error/>,
//     children : [
//       {
//         path : "/offer",
//         element : <Offer/>,
//         errorElement : <Error/>
//       },
//       {
//         path : "/order",
//         element : <Order/>,
//         errorElement : <Error/>
//       },
//       {
//         path : "/contact",
//         element : <Contact/>,
//         errorElement : <Error/>
//       },
//     ]
//   }
 
// ]);

const appRouter = createBrowserRouter([
  {
    path : "/",
    element : <Body/>,
    errorElement : <Error/>,
  },
      {
        path : "/offer",
        element : <Offer/>,
        errorElement : <Error/>
      },
      {
        path : "/order",
        element : <Order/>,
        errorElement : <Error/>
      },
      {
        path : "/contact",
        element : <Contact/>,
        errorElement : <Error/>
      },
      {
        path : "/restro/:resID",
        element : <RestroInfo/>,
        // errorElement : <Error/>
      },
      {
        path : "/user",
        element : <UserClass name={"Vishesh Verma"} branch={"CS"} year={"3rd"}/>,
        errorElement : <Error/>
      },
      {
        path : "/grocery",
        element : <Suspense fallback={<><ShimmerCard/></>}><Grocery/></Suspense>,
        // errorElement : <Error/>
      }
  
 
]);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
