import {
  REGISTER_USER_REQUEST,
  REGISTER_USER,
  REGISTER_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER,
  LOGIN_USER_FAIL,
} from "../constants/chatConstants";
import Axios from "../../../utils/axios";

//Register
export const registerUser = (username, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });

    const { data } = await Axios.post("api/auth/register", {
      username: username,
      email: email,
      password: password,
    });

    dispatch({ type: REGISTER_USER, payload: data });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error,
    });
  }
};

//Login
export const loginUser = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_USER_REQUEST,
    });

    const { data } = await Axios.post("api/auth/login", {
      username: username,
      password: password,
    });

    dispatch({ type: LOGIN_USER, payload: data });
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: error,
    });
  }
};