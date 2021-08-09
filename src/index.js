import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";
import { CookiesProvider } from 'react-cookie'

axios.defaults.baseURL = "https://flea.purplic.com/apis"

ReactDOM.render(<CookiesProvider><App /></CookiesProvider>, document.getElementById("mvpWeb"));
