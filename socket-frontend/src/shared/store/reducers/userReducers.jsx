import {
  REGISTER_USER_REQUEST,
  REGISTER_USER,
  REGISTER_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER,
  LOGIN_USER_FAIL,
} from "../constants/chatConstants";

//Register
export const registerReducers = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return state;
    case REGISTER_USER:
      return { ...state, registerUser: action.payload };
    case REGISTER_USER_FAIL:
      return { state, error: action.payload };
    default:
      return state;
  }
};

//Login
export const loginReducers = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return state;
    case LOGIN_USER:
      return { ...state, registerUser: action.payload };
    case LOGIN_USER_FAIL:
      return { state, error: action.payload };
    default:
      return state;
  }
};

