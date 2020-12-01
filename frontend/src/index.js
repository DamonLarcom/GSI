import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import store from "./stores/store"

import App from './pages/App';
import axios from 'axios';
axios.defaults.withCredentials = true;
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("app"));