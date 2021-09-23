import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route,Link } from "react-router-dom";
import axios from "axios";
import Main from "./components/main";
import AdminPanel from "./components/adminPanel";
import UserPanel from "./components/userPanel"
import Navbar from "./components/navbar";
import Footer from "./components/footer";

import "./bootstrap.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "./style.css";



export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
  const checkToken = async () => {
    try {
      const res = await axios.post("http://localhost:8080/user/check-token", {
        token,
      });
      if (!res.data.error && res.data.decode) {
        setLoggedIn(true);
        setUser(res.data.decode);
        return;
      }
    } catch (e) {
      console.log(e);
      return;
    }
  };

    checkToken();
  }, [token]);

  // console.log("i am in App", loggedIn, user);
  return (
    <div>
      <Router>
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} />
        <Switch>
          <Route exact path="/users/:username?path">
            <UserPanel loggedIn={loggedIn} user={user} />
          </Route>
          <Route exact path="/users/:username">
            <UserPanel loggedIn={loggedIn} user={user} />
          </Route>
          <Route exact path="/admin-panel/:username">
            <AdminPanel loggedIn={loggedIn} user={user} />
          </Route>
          <Route exact path="/?path">
            <Main />
          </Route>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="*">
            <section className="mb-4 mt-4">
              <div className="card">
                <div className="card-header text-center py-3">
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <h1 className="display-1 h1 d-block big-font">404</h1>
                    <h1 className="h1 my-3">Opsss!!!</h1>
                  </div>
                  <Link className="btn btn-outline-black btn-lg mb-5 shadow-5-soft" to="/">Go Back Home</Link>
                </div>
              </div>
            </section>
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}
