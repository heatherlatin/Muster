import React, { useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import User from '../../utils/Account/User';

// import TestingThings from "../../components/Testing";

export default function () {
    
    User.refreshOnLoad();
    const [{ user }] = User.useContext();

    return (
        <Container className="mt-5">
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <h4>this is the profilepage page, but we're using it to Test Things</h4>
                    <h6>Please answer 3 questions so we can learn what you like to do</h6>
                </Col>
                
            </Row>
        </Container>
    );
}
