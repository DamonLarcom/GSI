import axios from "axios";
import { applyMiddleware, createStore } from "redux";

const defaultState = {
}

const reducer = (state = defaultState, action) => {
    console.log(action);
    switch(action.type) {
        case "STORE_USER":
            return({
                ...state,
                user: {...action.data.User}
            });
        case "LOGOUT_USER":
            axios.get(`${process.env.BACKEND_URL}/logout`);
            let newState = {...state};
            delete newState.user;
            return(newState);
    }
}

let store = createStore(reducer, defaultState, window.devToolsExtension ? window.devToolsExtension() : f => f);
export default store;