import {reducer} from "./reducer";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
export const store = createStore(reducer, applyMiddleware(logger, thunk));
