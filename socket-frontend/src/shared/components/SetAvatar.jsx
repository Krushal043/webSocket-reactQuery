import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/styles/Avatar/SetAvatar.css";
import loader from "../../assets/images/loader.gif";
import { setAvatarDetails } from "../store/actions/avatarActions";
import { Buffer } from "buffer";
import axios from "axios";

export default function SetAvatar() {
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const setAvatarDetail = useSelector((state) => state.setAvatarDetails);
  console.log(setAvatarDetail);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const api = `https://api.multiavatar.com/45678945`;

  const toastValidation = {
    position: "top-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  //console.log(JSON.parse(localStorage.getItem("chat-app")));

  useEffect(() => {
    if (!localStorage.getItem("chat-app")) {
      navigate("/login");
    }
  }, []);

  const setAvatarPicture = () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select Avatar", toastValidation);
    } else {
      const user = JSON.parse(localStorage.getItem("chat-app")).registerUser
        ?.user;
      const image = avatars[selectedAvatar];
      dispatch(setAvatarDetails(image)).then(() => {
        if (!dispatch(setAvatarDetails()).isSet) {
          user.isAvatarImageSet = true;
          user.avatarIamge = image;
          localStorage.setItem("chat-app", JSON.stringify(user));
          navigate("/");
        } else {
          toast.error(
            "Error something is worng,Please try again",
            toastValidation
          );
        }
      });
    }
  };

  //Avatar Images
  async function fetchAvatarData() {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
  }
  useEffect(() => {
    fetchAvatarData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="avatar-profile">
          <img src={loader} alt="loader" className="loader" />
        </div>
      ) : (
        <div className="avatar-profile">
          <div className="title-container">
            <h1>Pick your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                  key={index}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={setAvatarPicture}>
            Set Profile Picture
          </button>
        </div>
      )}

      <ToastContainer />
    </>
  );
}
