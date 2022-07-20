import {
  SET_AVATAR_REQUEST,
  SET_AVATAR,
  SET_AVATAR_FAIL,
} from "../constants/chatConstants";
import Axios from "../../../utils/axios";

//SetAvatar
export const setAvatarDetails = (image) => async (dispatch) => {
  try {
    dispatch({
      type: SET_AVATAR_REQUEST,
    });
    const user = JSON.parse(localStorage.getItem("chat-app"));
    const { data } = await Axios.post(
      `api/auth/setavatar/${user?.registerUser?.user?._id}`,
      {
        image: image,
      }
    );

    dispatch({ type: SET_AVATAR, payload: data });
  } catch (error) {
    dispatch({
      type: SET_AVATAR_FAIL,
      payload: error,
    });
  }
};
