import React,{useContext} from 'react'
import userContext from '../utils/contextData/userContext'

function ChangeUserName() {
    const {logedInUser,setAuthName} = useContext(userContext)
  return (
    <div>
      <input value={logedInUser} onChange={(e)=>{setAuthName(e.target.value)}}/>
    </div>
  )
}

export default ChangeUserName
