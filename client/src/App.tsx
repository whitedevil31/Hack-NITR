import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import AdminLogin from "./components/Admin/Login";
import AdminSignup from "./components/Admin/Signup";
// @ts-ignore
import Loading from "react-fullscreen-loading";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "./userContext/context";

function App() {
  const { loggedIn, setLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const t = localStorage.getItem("token");

    if (t != null) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }

    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, [loggedIn, setLoggedIn]);
  let unProtectedRoutes = (
    <>
      <Router>
        <Switch>
          <Route path="/admin/login" exact component={AdminLogin} />

          <Route path="/admin/signup" exact component={AdminSignup} />
          <Route path="/signup" exact component={Signup} />

          <Route path="/login" exact component={Login} />
          <Route path="/" exact component={Home} />
        </Switch>
      </Router>
    </>
  );
  let protectedRoutes = (
    <>
      <Router>
        <Switch>
          <Route path="/admin/login" exact component={AdminLogin} />
          <Route path="/admin/signup" exact component={AdminSignup} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} />{" "}
          <Route path="/" exact component={Home} />
        </Switch>
      </Router>
    </>
  );

  return (
    <>
      {loading === true ? (
        loggedIn === true ? (
          protectedRoutes
        ) : (
          unProtectedRoutes
        )
      ) : (
        <Loading loading background="#D3D3D3" loaderColor="#f2ff00" />
      )}
    </>
  );
}

export default App;
