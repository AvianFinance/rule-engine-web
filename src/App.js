import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";


// Toaster
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LandingPage = React.lazy(() => import("./components/LandingPage.js"));

const loading = (
  <div className="pt-3 text-center bg-slate-50">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
          <Route
            exact
            path="/"
            name="Survey Page"
            render={(props) => <LandingPage {...props} />}
          />
          
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
    </BrowserRouter>
  );
}

export default App;
