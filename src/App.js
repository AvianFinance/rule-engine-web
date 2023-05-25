import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";


// Toaster
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LandingPage = React.lazy(() => import("./components/LandingPage.js"));
const BuySell = React.lazy(() => import("./components/BuySell.js"));
const UpfrontRental = React.lazy(() => import("./components/UpfrontRental.js"));
const InstallmentRental = React.lazy(() => import("./components/InstallmentRental.js"));

const loading = (
  <div className="pt-3 text-center bg-slate-50">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <Switch>         
            <Route
              exact
              path="/buy&sell"
              name="buy&sell"
              render={(props) => <BuySell {...props} />}
            />
            <Route
              exact
              path="/upfrontrental"
              name="upfrontrental"
              render={(props) => <UpfrontRental {...props} />}
            />
            <Route
              exact
              path="/installmentrental"
              name="installmentrental"
              render={(props) => <InstallmentRental {...props} />}
            />

            <Route
              exact
              path="/"
              name="LandingPage"
              render={(props) => <LandingPage {...props} />}
            />
            
            <Redirect
              to={{
                pathname: "/",
              }}
            />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
