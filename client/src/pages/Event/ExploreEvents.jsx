import React from "react";
import Container from 'react-bootstrap/Container';
import User from '../../utils/Account/User';
import { EventSearchForm } from "../../components";

export default function () {
    User.refreshOnLoad();

    return (
        <Container className="mt-3">
            <EventSearchForm />
        </Container>
    );
}
