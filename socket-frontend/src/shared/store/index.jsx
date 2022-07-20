import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { registerReducers, loginReducers } from "./reducers/userReducers";
import { setAvatarReducers } from "./reducers/avatarReducers";

const reducer = combineReducers({
  registerUserDetails: registerReducers,
  loginUserDetails: loginReducers,
  setAvatarDetails: setAvatarReducers,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
