import "../styles/accordionData.css";
import AccordionInfo from "./AccordionInfo";

const AccordionData = ({ data }) => {
  console.log(data);
  return (
    <>

    <div className="acc">
      <h3>{data.title}<b>({data.itemCards.length})</b></h3>
      <h3>⬇️</h3>
    </div>
    <div className="downData">
        <AccordionInfo data={data.itemCards} />
    </div>
    </>
  );
};

export default AccordionData;
