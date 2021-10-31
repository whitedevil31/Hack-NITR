import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Track from "./pages/Track";
import UserDashboard from "./pages/User/Dashboard";
import UserOrder from "./pages/User/Orders";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminOrder from "./pages/Admin/Orders";
import AdminLogin from "./components/Admin/Login";
import AdminSignup from "./components/Admin/Signup";
import UpdateOrder from "./pages/UpdateOrder";
// @ts-ignore
import Loading from "react-fullscreen-loading";

import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
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
          <Route path="/track" exact component={Track} />
          <Redirect from="/admin/dashboard" to="/" />
          <Redirect from="/admin/orders" to="/" />
          <Redirect from="/dashboard" to="/" />
          <Redirect from="/orders" to="/" />
          <Route path="/admin/login" exact component={AdminLogin} />

          <Route path="/admin/signup" exact component={AdminSignup} />
          <Route path="/signup" exact component={Signup} />
          <Route exact path="/order/:orderId" component={UpdateOrder} />

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
          <Route path="/track" exact component={Track} />{" "}
          <Route path="/admin/dashboard" exact component={AdminDashboard} />
          <Route path="/admin/myorders" exact component={AdminOrder} />
          <Route path="/dashboard" exact component={UserDashboard} />
          <Route path="/myorders" exact component={UserOrder} />
          <Route path="/admin/login" exact component={AdminLogin} />
          <Route path="/admin/signup" exact component={AdminSignup} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} />{" "}
          <Route exact path="/order/:orderId" component={UpdateOrder} />
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
