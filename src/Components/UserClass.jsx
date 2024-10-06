import React, { useState, useContext } from "react";
import userContext from "../utils/contextData/userContext";
import Header from "./Header";
import Error from "./Error";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      info: {
        name: "Dummy User",
        Followers: "xyz",
      },
    };
  }

  async componentDidMount() {
    this.KhudKaTimmer = setInterval(() => {
      console.log("Time is runing");
    }, 1000);

    try {
      const data = await fetch(
        "https://api.github.com/users/Vishesh-Verma-Work"
      );
      const json = await data.json();
      this.setState({
        info: json,
      });
    } catch (e) {
      console.log(e);
    }
  }
  componentDidUpdate() {
    console.log("Updated");
  }
  componentWillUnmount() {
    clearInterval(this.KhudKaTimmer);
    console.log("Timmer session ended   ");
  }

  render() {
    const { name, avatar_url, followers, following, location, bio } =
      this.state.info;
    return (
      <>
        <Header />
        <div className="main">
          <div className="user-profile">
            <div className="profile-card">
              <img src={avatar_url} alt={name} className="profile-pic" />
              <h1 className="user-name">{name}</h1>
              <p className="bio">{bio}</p>
              <userContext.Consumer>
                {({ logedInUser }) => <p>{logedInUser}</p>}
              </userContext.Consumer>

              <div className="user-info">
                <div className="info-item">
                  <span className="label">Followers:</span>{" "}
                  <span className="value">{followers}</span>
                </div>
                <div className="info-item">
                  <span className="label">Following:</span>{" "}
                  <span className="value">{following}</span>
                </div>
                <div className="info-item">
                  <span className="label">Location:</span>{" "}
                  <span className="value">{location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UserClass;
