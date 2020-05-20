import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import authReducer from "./auth.reducer";
import planReducer from "./plan.reducer";
import specReducer from "./specification.reducer";

let reducers = combineReducers({
    form: formReducer,
    auth: authReducer,
    plan: planReducer,
    spec: specReducer,
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

window.store = store;

export default store;