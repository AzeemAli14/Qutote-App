import { createStore } from "redux";
import { dataReducer } from ".././redux/reducers";

const store = createStore(dataReducer)

export default store;