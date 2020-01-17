/* eslint-disable react/prefer-stateless-function */
import React, { Fragment, useState } from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./SuggestedFriends.css";
// geting Mob List from database 
// get info from mob list objects 

function SuggestedFriends() {

    const [showSuggestion, setShowSuggestion] = useState("hide");

    const handleClick = () => {
        setShowSuggestion("hide");
    }


    return (
        
            <Container id="suggestedFriends">
                <Card style={{ width: "100%", marginTop: '15px'}} className = {showSuggestion} >
                    <Card.Body>Heather</Card.Body>
                    <Button variant="light" onClick={handleClick}>Add to Mob</Button>
                    <Button variant="light" onClick={handleClick}>Ignore</Button>
                </Card>                
            </Container>
        
    );
}

export default SuggestedFriends;
