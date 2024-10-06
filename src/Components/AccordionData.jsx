import "../styles/accordionData.css";
import AccordionInfo from "./AccordionInfo";
import { useState } from "react";

const AccordionData = ({ data,show,setShowIndex }) => {
// if want parent AbortController, code down there
// const handelClick = ()=>{
//     setShowIndex();
// }
const [toggle,setToggle] = useState(false);
const handelClick = ()=>{
    setToggle(!toggle);
}


  return (
    <>
      <div className="acc">
        <div className="acc-header" onClick={handelClick} >
          <h3>
            {data.title}
            <b>({data.itemCards.length})</b>
          </h3>
          <h3>⬆️</h3>
        </div>
        <div className="acc-data">
            {   toggle ? 
                <AccordionInfo data={data.itemCards} /> : ""
            }
            </div>
        
       
      </div>
    </>
  );
};

export default AccordionData;
