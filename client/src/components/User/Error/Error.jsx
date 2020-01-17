import React, { useEffect } from "react";
import User from '../../../utils/Account/User';
import Error from '../../Error';

const { CLEAR_USER_ERROR } = User.actions;

export default function () {
    const [{ error }, userDispatch] = User.useContext();
    let message = null;
    if (error) {
        if (error.response
            && error.response.data
            && error.response.data.errors
            && error.response.data.errors[0]
            && error.response.data.errors[0].message) {
            message = error.response.data.errors[0].message;
        }
        else if (error.request && error.request.status === 401) {
            message = "Incorrect email or password";
        } else {
            message = error.message || (error.response && error.response.data);
        }
    }
    let messageTimeout;
    useEffect(() => {
        if (!message) {
            return;
        }
        clearTimeout(messageTimeout);
        messageTimeout = setTimeout(() => {
            userDispatch({ type: CLEAR_USER_ERROR })
        }, 5500)
    }, [message])
    return (
        <Error message={message} />
    )
}