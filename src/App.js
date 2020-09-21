import React from "react";
import Artists from "./components/Artists";
import "./App.css";
import Hero from "./components/Hero";
import { MediaContextProvider } from "./components/MediaQuery";
import Schedule from "./components/Schedule";
import Tickets from "./components/Tickets";
import Footer from "./components/Footer";
import Map from "./components/Map";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <MediaContextProvider>
            <Hero />
            <Artists />
            <Schedule />
            <Tickets />
            <Map />
            <Footer />
          </MediaContextProvider>
        </Route>
        <Route path="/admin">
          <h1>Hello World!</h1>
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
