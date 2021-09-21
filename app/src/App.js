import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Main from "./components/main";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

import "./bootstrap.min.css";
import "./mdb.min.css";
import "./style.css";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");

  const checkToken = async () => {
    try {
      const res = await axios.post("http://localhost:8080/user/check-token", {
        token,
      });
      if (!res.data.error && res.data.decode) {
        setLoggedIn(true);
        setUser(res.data.decode);
        console.log(" in token",typeof res.data.decode, user);
        return;
      }
    } catch (e) {
      console.log(e);
      return;
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  // console.log("i am in App", loggedIn, user);
  return (
    <div>
        <Router>
          <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} />
          <Switch>
            <Route exact path="/hello">
              <h1>Hello</h1>
            </Route>
            <Route path="/users/:username?path">
              <Main loggedIn={loggedIn} user={user} />
            </Route>
            <Route path="/users/:username">
              <Main loggedIn={loggedIn} user={user} />
            </Route>
            <Route path="/?path">
              <Main />
            </Route>
            <Route path="/">
              <Main />
            </Route>
          </Switch>
          <Footer />
        </Router>
    </div>
  );
}
