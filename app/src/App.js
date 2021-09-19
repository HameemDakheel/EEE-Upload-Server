import React, {useState,useContext} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./components/main";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import checkToken from "./token";

export default function App() {
	const [loggedIn, setLoggedIn ] = useState(checkToken());
	const logged = useContext(false)
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/hello">
            <h1>Hello</h1>
          </Route>
          <Route path="/?path">
            <Navbar />
            <Main />
          </Route>
          <Route path="/">
            <Navbar />
            <Main />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}
