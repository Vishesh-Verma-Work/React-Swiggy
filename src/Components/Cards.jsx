import { useState } from "react";
import { IMG_URL as img } from "../utils/Hard Coded Data/URL";
const Cards =({name,avgRating,cloudinaryImageId,time,cuisines,header,subHead,areaName})=>{

    const nameExceed =(name)=>{
        if(name.length > 23){
            return name.substring(0,18) + "...";
        }
        return name;
    }
    const cusExceed =(name)=>{
        if(cuisines.length > 28){
            return cuisines.substring(0,28) + "...";
        }
        return cuisines;
    }

    return(
        <>
        <div className="cards-con">
        <div className="card">
            <div className="img-con">
            <img src= {img +cloudinaryImageId} alt="" />
            <div className="offer">
            </div>
            </div>
            <div className="data">
                <h2>{nameExceed(name)}</h2>
                <h3 className="rating">{avgRating}</h3>
                &#8226; &nbsp;
                <h3>{time}</h3>
                <h4>{cusExceed(cuisines )}</h4>
                <h4>{areaName}</h4>
            </div>
        </div>
        </div>
        </>
    )
}

export const LabeledCard = ({name,avgRating,cloudinaryImageId,time,cuisines,header,subHead,areaName})=>{
    return()=>{
        return(
            <>
            <label>Promoted</label>
            <Cards/>
            </>
        )
    }
}

export default Cards;