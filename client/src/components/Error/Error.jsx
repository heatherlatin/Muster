import React, { useEffect, useState } from "react";
import "./Error.css";

export default function ({ message }) {
    const [shownMessage, setShownMessage] = useState("");
    let removeMessageTimeout;
    useEffect(() => {
        clearTimeout(removeMessageTimeout);
        if (message) {
            removeMessageTimeout = setTimeout(() => {
                setShownMessage(message);
            }, 10);
        } else {
            removeMessageTimeout = setTimeout(() => {
                setShownMessage(message);
            }, 500);
        }
    }, [message]);
    let hiddenClass = " hidden";
    let fadeClass = "error-fade-out";
    if (message) {
        hiddenClass = "";
        if (shownMessage) {
            fadeClass = "error-fade-in";
        }
    } else {
        if (shownMessage) {
            hiddenClass = "";
        }
    }
    return (
        <div id="alert" className={`alert alert-danger capp-error ${fadeClass}${hiddenClass}`} role="alert">
            { shownMessage }
        </div>
    );
}