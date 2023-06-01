import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";


// Toaster
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { avalanche, avalancheFuji } from '@wagmi/chains'
import { WagmiConfig, createClient, configureChains } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const LandingPage = React.lazy(() => import("./components/LandingPage.js"));
const BuySell = React.lazy(() => import("./components/BuySell.js"));
const UpfrontRental = React.lazy(() => import("./components/UpfrontRental.js"));
const InstallmentRental = React.lazy(() => import("./components/InstallmentRental.js"));
const ResponsiveAppBar = React.lazy(() => import("./components/navbar.js"));
const VotingTable = React.lazy(() => import("./components/vote.js"));
const ViewCOntract = React.lazy(() => import("./components/viewcontract.js"));

const { chains, provider, webSocketProvider } = configureChains(
    [avalancheFuji, avalanche],
    [
      infuraProvider({ apiKey: 'a7f7989fbb424a1989511ec922db7b38' }),
      publicProvider(),
    ],
)

const client = createClient({
	autoConnect: true,
	connectors: [
	  new MetaMaskConnector({ chains })
	],
	provider,
	webSocketProvider,
})

const loading = (
  <div className="pt-3 text-center bg-slate-50">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

function App() {
  return (
    <WagmiConfig client={client} suppressHydrationWarning="true">
          <BrowserRouter>
          <React.Suspense fallback={loading}>
            <ResponsiveAppBar/>
            <Switch>         
                <Route
                  exact
                  path="/buy&sell"
                  name="buy&sell"
                  render={(props) => <BuySell {...props} />}
                />
                <Route
                  exact
                  path="/viewcontract/:id"
                  name="viewcontract"
                  render={(props) => <ViewCOntract {...props} />}
                />
                <Route
                  exact
                  path="/upfrontrental"
                  name="upfrontrental"
                  render={(props) => <UpfrontRental {...props} />}
                />
                <Route
                  exact
                  path="/vote"
                  name="upfrontrental"
                  render={(props) => <VotingTable {...props} />}
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
			</WagmiConfig>
  );
}

export default App;
