import React, { useEffect } from "react";
import Event from '../../../utils/Account/Events';
import User from '../../../utils/Account/User';
import Error from '../../Error';
import { useHistory } from "react-router-dom";

const { CLEAR_EVENTS_ERROR } = Event.actions;
const { USER_ERROR } = User.actions;

export default function () {
    const [{ error }, eventDispatch] = Event.useContext();
    const [/* user not needed */, userDispatch] = User.useContext();
    const history = useHistory();
    let message = null;
    if (error) {
        if (error.response
            && error.response.data
            && error.response.data.errors
            && error.response.data.errors[0]
            && error.response.data.errors[0].message) {
            message = error.response.data.errors[0].message;
        }
        else if (error.request && error.request.status === 403) {
            setTimeout(() => userDispatch({
                type: USER_ERROR,
                message: {
                    response: {
                        data: "You have been logged off, please sign in again."
                    }
                }
            }), 10)
            history.push("/login");
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
            eventDispatch({ type: CLEAR_EVENTS_ERROR })
        }, 5500)
    }, [message])
    return (
        <Error message={message} />
    )
}