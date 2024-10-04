import { useState,useEffect } from "react";
// import { Restro_ID as id} from "../utils/Hard Coded Data/URL";

const useFetchRestroInfo = (resID) => {
    const [data,setData] = useState([]);
    const fetchData = async () => {
        const data = await fetch(
           "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.65200&lng=77.16630&restaurantId=" + resID
      );
      const jsonData = await data.json();
      setData(jsonData);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return data.data;
};

export default useFetchRestroInfo;