import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import User from '../../utils/Account/User';

export default function (props) {
    User.refreshOnLoad();
    return (
        <Container className="mt-5">
            <Row>
                <Col md={{span: 6, offset: 3}}>
                    <h2>
                        404 - Not Found
                    </h2>
                    <p className="not-found mt-5">
                        The path "{props.match.url}" was not found.
                    </p>
                </Col>
            </Row>
        </Container>
    );
}
