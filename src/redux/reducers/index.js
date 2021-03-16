import { combineReducers } from "redux";

import lists from "./lists";
import popup from "./popup";
import colors from "./colors";
// import addForm from "./addForm";

const rootReducer = combineReducers({ lists, popup, colors });

export default rootReducer;
