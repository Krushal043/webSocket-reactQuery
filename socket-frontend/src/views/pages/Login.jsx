import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/styles/RegisterLogin/RegisterLogin.css";
import Logo from "../../assets/images/logo.jpeg";
import { loginUser } from "../../shared/store/actions/userActions";

export default function Login() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });

  const loginUserDetails = useSelector((state) => state.loginUserDetails);
  localStorage.setItem("chat-app", JSON.stringify(loginUserDetails));
  console.log("loginUserDetails", loginUserDetails);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const toastValidation = {
    position: "top-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form");
    const { username, password } = userDetails;
    if (handleValidation()) {
      dispatch(loginUser(username, password))
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { username, password } = userDetails;
    if (username === "") {
      toast.error("Username is require", toastValidation);
      return false;
    } else if (password === "") {
      toast.error("Password is require", toastValidation);
      return false;
    }
    return true;
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="logo">
          <img src={Logo} alt="Logo" />
          <h1>Chat-Bot</h1>
        </div>
        <input
          type="text"
          placeholder="Enter your name ..."
          name="username"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          onChange={handleChange}
        />

        <button type="submit" onClick={handleValidation}>
          Login
        </button>
        <span>
          Do not have account ? <Link to="/register">Register</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}
