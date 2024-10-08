import {createContext} from "react";

const userContext = createContext({
    logedInUser : "Default User BDS",
});

export default userContext;