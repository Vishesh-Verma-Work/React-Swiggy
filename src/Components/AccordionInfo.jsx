import "../styles/accordionInfo.css"
import { img as IMG } from "../utils/Hard Coded Data/URL";
function AccordionInfo({data}) {
    console.log(data)
  return (
    <div>
      {
        data.map((data)=>{
            const {name,price,description,ratings,imageId} = data.card.info;
            return(
                <>
                <div key={data.card.info.id} className="acc-con">
                <div className="acc-left">
                    <div className="acc-title">{name}</div>
                    <div className="acc-price">₹{price/100}</div>
                    <div className="acc-rating">{ratings.aggregatedRating.rating}</div>
                    <div className="acc-desc">{description.substring(11,)}</div>
                </div>
                <div className="acc-right">
                    <img src={IMG + imageId} alt="img" />
                </div>
                </div>


                </>
            )
        })
      }
    </div>
  )
}

export default AccordionInfo
