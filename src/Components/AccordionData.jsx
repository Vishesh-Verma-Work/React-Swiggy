import "../styles/accordionData.css";
import AccordionInfo from "./AccordionInfo";
import { useState } from "react";

const AccordionData = ({ data }) => {
    const [toggle,setToggle] = useState(false)
//   console.log(toggle);
const toggleCase = ()=>{
    toggle ? setToggle(false) : setToggle(true)
}
  return (
    <>
      <div className="acc">
        <div className="acc-header" onClick={toggleCase}>
          <h3>
            {data.title}
            <b>({data.itemCards.length})</b>
          </h3>
          <h3>⬆️</h3>
        </div>
        {
            toggle ?  <div className="acc-data">
            {
                <AccordionInfo data={data.itemCards} />
            }
            </div> : ""
        }
       
      </div>
    </>
  );
};

export default AccordionData;
