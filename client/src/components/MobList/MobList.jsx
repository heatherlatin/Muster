/* eslint-disable react/prefer-stateless-function */
import React, { Fragment, useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import User from "../../utils/Account/User";
import Mob from "../../utils/Account/Mobs";
import "./MobList.css";
// geting Mob List from database 
// get info from mob list objects 

function MobList(props) {
    const [mobList, setMobList] = useState([]);
    const [searching, setSearching] = useState(false);
    const [searchResults, setSearchResults] = useState({});

    useEffect(() => {
        mobNames();
    }, []);

    useEffect(() => {
        // setSearchResults = ({})
    }, []);
    
    const mobNames = async () => {
        const mobNames = [];
        const allMobs = await Mob.API.getMobs();
        allMobs.forEach(mob => {
            mobNames.push({
                name: mob.displayName,
                info: mob
            })
        });
        setMobList(mobNames);
    }


    return (searching) ? (
        <Fragment>
            <Container id="friend-list" style={{ 'maxHeight': '23rem', 'paddingTop': '1rem', 'minHeight': '23rem', 'overflowY': 'auto' }}>
            {mobList.map(mob => {
                return (
                    <Card style={{ width: "100%" }} onClick={() => props.mobClick(mob)}>
                        <Card.Body>{mob.name}</Card.Body>
                    </Card>
                )
            })}
            </Container>
        </Fragment>
    ) :
    (
        <Fragment>
            <Container id="friend-list" style={{ 'maxHeight': '23rem', 'paddingTop': '1rem', 'minHeight': '23rem', 'overflowY': 'auto' }}>
            {mobList.map(mob => {
                return (
                    <Card style={{ width: "100%" }} onClick={() => props.mobClick(mob)}>
                        <Card.Body>{mob.name}</Card.Body>
                    </Card>
                )
            })}
            </Container>
        </Fragment>
    )
}

export default MobList;
