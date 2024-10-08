import { useState, useContext } from "react";
import userContext from "../utils/contextData/userContext";
import { Link } from "react-router-dom";



import { useSelector } from "react-redux";

const Header = () => {
  const [btn, setBtn] = useState("LogIn");
  const ToggleTo = () => {
    btn === "LogIn" ? setBtn("SignUp") : setBtn("LogIn");
  };
  const { logedInUser } = useContext(userContext);

  const cartItems = useSelector((store) => {
    return store.cart.items;
  });

  return (
    <>
      <div className="header">
        <div className="logo">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/11/Swiggy-Logo.png"
            alt="fdgd"
          />
        </div>
        <div className="nav-links">
          <ul>
            <li>
              <a href="">
                <Link to={"/"}>Home</Link>
              </a>
            </li>
            <li>
              <a href="">
                <Link to={"/offer"}>Offers</Link>
              </a>
            </li>
            <li>
              <a href="">
                <Link to={"/order"}>Orders</Link>
              </a>
            </li>
            <li>
              <a href="">
                <Link to={"/grocery"}>Grocery</Link>
              </a>
            </li>
            <li>
              <a href="">
                <Link to={"/user"}>User</Link>
              </a>
            </li>
            <li>
              <a href="">{logedInUser}</a>
            </li>
            <li>
              <img
                src="https://endlessicons.com/wp-content/uploads/2012/11/shopping-cart-icon-614x460.png"
                alt="xxx"
              />
            </li>
            Cart ({cartItems.length})
            <li>
              <button
                onClick={() => {
                  ToggleTo();
                }}
              >
                {btn}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
