/* eslint-disable react/prefer-stateless-function */
import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import "./SearchFriends.css";
// geting Mob List from database 
// get info from mob list objects 

function SearchFriends(props) {
    const [displayInfo, setDisplayInfo] = useState(false)
    
    useEffect(() => {
        console.log(props)
        setDisplayInfo(props)
    }, [props]);

    return (displayInfo) ? (
        <Container id="searchFriends">
            <br />
            <Form >
                <Form.Row id="searchArea" >
                    <Col>
                        <Form.Control id="searchBar" placeholder="" />
                    </Col>
                    <Col>
                        <Button id="searchButton" variant="light">Search</Button>
                    </Col>
                </Form.Row>
            </Form>
            <Container id="mob-info" style={{ 'maxHeight': '23rem', 'paddingTop': '1rem', 'minHeight': '23rem', 'overflowY': 'auto' }}>
                <Card style={{ width: "100%" }} onClick={() => console.log("onclick")}>
                    <Card.Body>
                        <Card.Title>{displayInfo.name}</Card.Title>
                        <Card.Subtitle>{displayInfo.about}</Card.Subtitle>
                    </Card.Body>
                </Card>
            </Container>
        </Container>
    ) : (
            <Container id="searchFriends">
                <br />
                <Form >
                    <Form.Row id="searchArea" >
                        <Col>
                            <Form.Control id="searchBar" placeholder="" />
                        </Col>
                        <Col>
                            <Button id="searchButton" variant="light">Search</Button>
                        </Col>
                    </Form.Row>
                </Form>
                <Container id="search-results" style={{ 'maxHeight': '23rem', 'paddingTop': '1rem', 'minHeight': '23rem', 'overflowY': 'auto' }}>
                    {/* {mobList.map(mob => {
        return ( */}
                    <Card style={{ width: "100%" }} onClick={() => console.log("onclick")}>
                        <Card.Body></Card.Body>
                    </Card>
                    {/* )
    })} */}
                </Container>
            </Container>

        )
}

export default SearchFriends;
