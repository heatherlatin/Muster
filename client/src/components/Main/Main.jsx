/* eslint-disable react/prefer-stateless-function */
import React, { Fragment } from "react";
import User from "../../utils/Account/User";
import Event from "../../utils/Account/Events";
import { Switch, Route } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import {
    LoggedInRoute,
    LoggedOutRoute,
} from "../index.js";
import {
    NotFound,
    Login,
    Signup,
    Home,
    ExploreEvents,
    ProfilePage,
    Mob
} from "../../pages";

function Main() {
    const [{ pageLoading }] = User.useContext();
    User.refreshOnLoad();
    return (
        <Fragment>
            {pageLoading ? (
                <div className="d-flex justify-content-center mt-5">
                    <Spinner className="mt-5" animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <Event.Provider>
                    <Switch>
                        <LoggedInRoute exact path="/" component={Home} />
                        {/* <LoggedInRoute exact path="/user/about" component={AboutUser} /> */}
                        <LoggedInRoute exact path="/event/explore" component={ExploreEvents} />
                        <LoggedInRoute exact path="/user/profilepage" component={ProfilePage} />
                        <LoggedInRoute exact path="/mob" component={Mob} />
                        <LoggedOutRoute exact path="/login" component={Login} />
                        <LoggedOutRoute exact path="/signup" component={Signup} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </Event.Provider>
            )}
        </Fragment>
    );
}

export default Main;
