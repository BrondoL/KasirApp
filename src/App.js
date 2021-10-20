import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Success } from "./views";
import { Navbar } from "./components";

export default function App() {
    return (
        <Router>
            <Navbar />
            <main>
                <Switch>
                    <Route path="/success">
                        <Success />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </main>
        </Router>
    );
}
