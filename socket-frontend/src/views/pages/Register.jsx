import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/styles/RegisterLogin/RegisterLogin.css";
import Logo from "../../assets/images/logo.jpeg";
import { registerUser } from "../../shared/store/actions/userActions";

export default function Register() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const registerUserDetails = useSelector((state) => state.registerUserDetails);
  localStorage.setItem("chat-app", JSON.stringify(registerUserDetails));
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const toastValidation = {
    position: "top-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = userDetails;
    if (handleValidation()) {
      dispatch(registerUser(username, email, password))
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  // useEffect(() => {
  //   if (localStorage.getItem("UserName")) {
  //     navigate("/");
  //   }
  // }, []);

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { username, email, password, confirm_password } = userDetails;
    if (password !== confirm_password) {
      toast.error(
        "Passowrd and Confirm Password should be Same",
        toastValidation
      );
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be atleast 3 characters", toastValidation);
      return false;
    } else if (email === "") {
      toast.error("Email is Require", toastValidation);
      return false;
    } else if (password.length < 6) {
      toast.error("at least 6 characters", toastValidation);
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
          type="email"
          placeholder="Enter your Email ..."
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirm_password"
          onChange={handleChange}
        />

        <button type="submit" onClick={handleValidation}>
          Create User
        </button>
        <span>
          Already you have account ? <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}
