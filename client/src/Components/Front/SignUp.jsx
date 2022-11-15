import { useState } from "react";
import "../../create.scss";

export default function SignUp({ setCreateData }) {
  const [uname, setUname] = useState("");
  const [upass, setUpass] = useState("");
  const [email, setEmail] = useState("1");

  const buttonHandler = () => {
    setCreateData({
      uname,
      upass,
      email,
    });

    const inputHandler = (e, which) => {
      switch (which) {
        case "uname":
          setUname(e.target.value);
          break;
        case "upass":
          setUpass(e.target.value);
          break;
        case "email":
          setEmail(e.target.value);
          break;
        default:
      }
    };

    return (
      <div className="create-container">
        <div className="create-header">
          <h2>Create Your Account</h2>
        </div>

        <div className="create-body">
          <div className="create-input-box">
            <label className="side-line">Your name</label>
            <input
              type="text"
              className="input-line"
              onChange={(e) => inputHandler(e, "uname")}
              value={uname}
            />
            {/* <small className="side-line">Add new shoe name here.</small> */}
          </div>

          <div className="create-input-box">
            <label className="side-line">Your password</label>
            <input
              type="text"
              className="input-line"
              onChange={(e) => inputHandler(e, "upass")}
              value={upass}
            />
            {/* <small className="side-line">Add new shoe name here.</small> */}
          </div>

          <div className="create-input-box">
            <label className="side-line">Your Email</label>
            <input
              type="text"
              className="input-line"
              onChange={(e) => inputHandler(e, "email")}
              value={email}
            />
            {/* <small className="side-line">Add new shoe name here.</small> */}
          </div>
        </div>

        <div className="buttons">
          <button className="create-button" onClick={buttonHandler}>
            Sign Up
          </button>
        </div>
      </div>
    );
  };
}
