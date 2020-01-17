import React, { Fragment } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { UserLoginForm } from '../../components';
import User from '../../utils/Account/User';
import "./Login.css";

function EmailMessage() {
    return (
        <Fragment>
            You must enter a valid email.
        </Fragment>
    );
}

function PasswordMessage() {
    return (
        <Fragment>
            You must enter a valid password.
        </Fragment>
    );
}

export default function () {
    User.refreshOnLoad();

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                <h1>Link Up and Mob Out.</h1>
                </Col>
                <Col>
                    <UserLoginForm
                        name="Log In"
                        className="login"
                        api={User.API.login}
                        EmailMessage={EmailMessage}
                        PasswordMessage={PasswordMessage}
                    />
                </Col>
            </Row>
        </Container>
    );
}