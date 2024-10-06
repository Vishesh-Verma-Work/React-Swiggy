

function AccordionInfo({data}) {
  return (
    <div>
      {
        data.map((data,index)=>{
            return(
                <h5>{data.card.info.name}</h5>
            )
        })
      }
    </div>
  )
}

export default AccordionInfo
