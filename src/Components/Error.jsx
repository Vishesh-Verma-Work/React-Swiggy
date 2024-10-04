import React from 'react'
import { useRouteError } from 'react-router-dom'

const Error = () => {
    const err = useRouteError();
    console.log(err);
    return (
    <div>
        <h1>Error : {err.error.message}</h1>
        <h3>Status : {err.status} {err.statusText}</h3>
    </div>
  )
}

export default Error;
