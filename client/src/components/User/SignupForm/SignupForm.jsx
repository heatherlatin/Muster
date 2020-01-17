import React, { useState, useRef, Fragment } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import User from '../../../utils/Account/User';
import UserError from '../Error';
import { Link } from 'react-router-dom';
import "./SignupForm.css";
import Drag from "./Drag";
const { USER_LOADING, SET_USER, USER_ERROR, ABOUT_USER } = User.actions;

export default function ({
    api,
    name,
    className,
    emailPattern,
    passwordPattern,
    EmailMessage = "",
    PasswordMessage = "",
    DisplayNameMessage = ""
}) {
    User.refreshOnLoad();
    const [dragAbout, setDragAbout] = useState(["Have a Quiet Night in", "Try a New Restaurant", "Go to a Concert/Show", "Watch Sports"]);
    const [validated, setValidated] = useState(false);
    const [/* user not needed */, userDispatch] = User.useContext();
    const firstNameInput = useRef();
    const lastNameInput = useRef();
    const displayNameInput = useRef();
    const emailInput = useRef();
    const passwordInput = useRef();
    const cityInput = useRef();
    const stateInput = useRef();
    const zipInput = useRef();

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }
        const firstName = firstNameInput.current.value;
        const lastName = lastNameInput.current.value;
        const displayName = displayNameInput.current.value;
        const email = emailInput.current.value;
        const password = passwordInput.current.value;
        const location = {
            city: cityInput.current.value,
            state: stateInput.current.value,
            zip: zipInput.current.value
        }
        console.log("dragAbout: ", dragAbout);
        doUserFunc(email, password, displayName, firstName, lastName, location)    
    };

    // doUserFunc does a post to our "api/login" route and if successful, *will (hopefully)* redirect them to the AboutUser page
    function doUserFunc(email, password, displayName, firstName, lastName, location) {
        setValidated(false);
        userDispatch({ type: USER_LOADING });
        api({
            email,
            password,
            displayName,
            firstName,
            lastName,
            location,
            about: dragAbout
        }).then(user => {
            userDispatch({ type: ABOUT_USER, dragAbout });
            userDispatch({ type: SET_USER, user });
        }).catch((err) => {
            userDispatch({ type: USER_ERROR, message: err });
        });
    }

    return (
            <Fragment>
                <h2 id="neon" >Sign Up</h2>
                <br />
                <Form
                    id="form-input"
                    validated={validated}
                    onSubmit={handleSubmit}
                    className={className}
                    noValidate>

                    {/* First Name */}
                    <Form.Group controlId="formBasicFirstName">
                        <Form.Control
                            pattern=".*\S+.*"
                            type="text"
                            placeholder="First Name"
                            ref={firstNameInput} />
                    </Form.Group>

                    {/* Last Name */}
                    <Form.Group controlId="formBasicLastName">
                        <Form.Control
                            pattern=".*\S+.*"
                            type="text"
                            placeholder="Last Name"
                            ref={lastNameInput} />
                    </Form.Group>

                    {/* Display Name */}
                    <Form.Group controlId="formBasicDisplayName">
                        <Form.Control
                            required
                            pattern={emailPattern}
                            type="text"
                            placeholder="Display Name"
                            ref={displayNameInput} />
                        <Form.Control.Feedback type="invalid">
                            <DisplayNameMessage />
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Email */}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            required
                            pattern={emailPattern}
                            type="email"
                            placeholder="Email"
                            ref={emailInput} />
                        <Form.Control.Feedback type="invalid">
                            <EmailMessage />
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Password */}
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control
                            required
                            pattern={passwordPattern}
                            type="password"
                            placeholder="Password"
                            ref={passwordInput} />
                        <Form.Control.Feedback type="invalid">
                            <PasswordMessage />
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* City */}
                    <Form.Group controlId="formBasicCity">
                        <Form.Control
                            pattern=".*\S+.*"
                            type="text"
                            placeholder="City"
                            ref={cityInput}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid city.
                    </Form.Control.Feedback>
                    </Form.Group>

                    {/* State */}
                    <Form.Group md="3" controlId="formBasicState">
                        <Form.Control
                            pattern=".*\S+.*"
                            type="text"
                            placeholder="State"
                            ref={stateInput}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid state.
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Zip */}
                    <Form.Group md="3" controlId="formBasicZip">
                        <Form.Control
                            pattern=".*\S+.*"
                            type="number"
                            placeholder="Zipcode"
                            ref={zipInput}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid zip.
                    </Form.Control.Feedback>
                    </Form.Group>

                    <Drag id="questions-box" onChange={(order) => setDragAbout(order)} />

                    <Form.Group>
                        <Form.Check id="checkbox"
                            required
                            label="Agree to terms and conditions"
                            feedback="You must agree before submitting."
                        />
                    </Form.Group>
                    <UserError />

                    <Form.Row id="submitButtonRow">
                        <Button id="submit-button" type="submit">
                            {name}
                        </Button>
                    </Form.Row>
                    <br />
                    <Form.Row id="linkRow">
                        <p>Already have a log in? Login <Link id="link" to="/login">here</Link></p>
                    </Form.Row>

                </Form>
            </Fragment>
        )
}
