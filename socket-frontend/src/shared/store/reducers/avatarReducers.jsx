import {
  SET_AVATAR_REQUEST,
  SET_AVATAR,
  SET_AVATAR_FAIL,
} from "../constants/chatConstants";

//SetAvatar
export const setAvatarReducers = (state = {}, action) => {
  switch (action.type) {
    case SET_AVATAR_REQUEST:
      return state;
    case SET_AVATAR:
      return { ...state, registerUser: action.payload };
    case SET_AVATAR_FAIL:
      return { state, error: action.payload };
    default:
      return state;
  }
};
