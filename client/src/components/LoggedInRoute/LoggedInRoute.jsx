import React from "react";
import { Route, Redirect } from "react-router-dom";
import User from "../../utils/Account/User";
export default ({ component: Component, ...props }) => {
    const [{user}] = User.useContext();
    return (
        <Route {...props} render={(props) => (
        user.email
            ? <Component {...props} />
            : <Redirect to='/login' />
        )} />
    )
}