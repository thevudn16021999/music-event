import React, { useEffect } from "react";
import Artists from "./components/Artists";
import "./App.css";
import Hero from "./components/Hero";
import Description from "./components/Description";
import { MediaContextProvider } from "./components/MediaQuery";
import Schedule from "./components/Schedule";
import Tickets from "./components/Tickets";
import Footer from "./components/Footer";
import Faq from "./components/Faq";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Checkout from "./Checkout";
import Steps from "./components/Steps";
import CheckVe from "./CheckVe";
import { auth } from "./firebase";
import { useGlobalDispatch } from "./store";
import { ACTION } from "./reducer";
import Profile from "./Profile";
import Confirm from "./Confirm";
import ScanVe from "./ScanVe";

function App() {
  const dispatch = useGlobalDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: ACTION.SET_USER,
          user: { id: user.uid, name: user.displayName, email: user.email },
        });
      } else {
        dispatch({
          type: ACTION.SET_USER,
          user: null,
        });
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <MediaContextProvider>
        <Switch>
          <Route path="/" exact>
            <video className="videoTag" autoPlay loop muted>
              <source
                src="https://raw.githubusercontent.com/DreamersConcert/SourceDC/main/img/intro.mp4"
                type="video/mp4"
              />
            </video>
            <Hero />
            <Description />
            <Artists />
            {/* <Tickets /> */}
            <Schedule />
            <Faq />
            <Footer />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/admin">
            <h1>Hello World!</h1>
          </Route>
          <Route path="/checkveveve" exact>
            <CheckVe />
          </Route>
          <Route path="/scnave" exact>
            <ScanVe />
          </Route>
          <Route path="/login">
            <Steps step={0} />
            <Login />
          </Route>
          <Route path="/checkout">
            <Steps step={1} />
            <Checkout />
          </Route>
          <Route path="/confirm">
            <Steps step={2} />
            <Confirm />
          </Route>
          <Route path="/">
            <h1>??ii ????u ????y, quay l???i mua v?? ??i</h1>
          </Route>
        </Switch>
      </MediaContextProvider>
    </BrowserRouter>
  );
}

export default App;
