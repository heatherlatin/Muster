import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MobList from "../../components/MobList/MobList";
import SuggestedFriends from "../../components/SuggestedFriends";
import SearchFriends from "../../components/SearchFriends";

export default function () {
    const [selectedMob, setSelectedMob] = useState({});
    const [searchedMob, setSearcheddMob] = useState({});

    const mobNameClick = (mobInfo) => {
        console.log("mobInfo: ", mobInfo)
        setSelectedMob({
            name: mobInfo.name,
            events: mobInfo.info.events,
            about: mobInfo.info.about[0]
        })
    }
     
    return (
        <Container className="mt-2">
            <Row>
                <Col>
                    <h3>My Friends</h3>
                    <br />
                    <MobList mobClick={mobNameClick} {...searchedMob}/>
                </Col>
                <Col>
                    <h3>Search Friends</h3>
                    <br />
                    <SearchFriends {...selectedMob}/>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h3>Suggested Friend</h3>
                    <br />
                    <SuggestedFriends />
                </Col>
                
            </Row>
        </Container>
    );
}
