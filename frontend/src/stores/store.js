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
    }
}

let store = createStore(reducer, defaultState, window.devToolsExtension ? window.devToolsExtension() : f => f);
export default store;