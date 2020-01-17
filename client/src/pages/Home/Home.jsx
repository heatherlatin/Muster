import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import User from '../../utils/Account/User';
import Mob from "../../utils/Account/Mobs";
import Event from '../../utils/Account/Events';
import { EventUserWeek } from "../../components";
import moment from "moment";

import './Home.css';
import MusterMob from "../../components/MusterMob/MusterMob";

export default function () {
    User.refreshOnLoad();
    // we eagerly load events here so when the user switches pages it will appear faster. 
    Event.refreshDbOnLoad();
    const [{ user }] = User.useContext();
    const [selection, setSelection] = useState({
        date: moment().format('ll'),
        day: moment().format('dddd'),
        event: "",
        time: "",
        daySelected: true,
        eventId: "",
        mobEvents: []
    });

    useEffect(() => {
        allTheMobs();
    }, []);
    
    const allTheMobs = async () => {
        const ourMobEvents = [];
        const allMobs = await Mob.API.getMobs();
        console.log(allMobs);
        allMobs.forEach(mob => {
            const friend = mob.displayName;
            const theEvents = mob.events;
            console.log(friend, theEvents)
            theEvents.forEach(event => {
                ourMobEvents.push({
                    name: friend,
                    event
                });
            });
        });
        console.log("ourMobs: ", ourMobEvents);
        setSelection({
            ...selection,
            mobEvents: ourMobEvents
        })
    }

    // useEffect(() => {
    //     const startPos = {
    //         lat: 0,
    //         long: 0
    //     };
    //     const geoSuccess = function (position) {
    //         startPos.lat = position.coords.latitude;
    //         startPos.long = position.coords.longitude;
    //         console.log("userLocation: ", startPos);
    //         console.log("Call USER_LOCATION dispatch here");
    //     };
    //     navigator.geolocation.getCurrentPosition(geoSuccess);
    // }, []);

    const selectionChange = (bool, clicked) => {
        setSelection({
            ...selection,
            date: moment(clicked.date).format('ll'),
            day: clicked.day,
            event: clicked.event,
            time: clicked.time,
            daySelected: bool,
            eventId: clicked.id
        })
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col >
                    <h2 id="welcome-sign">
                        Welcome back, {" "}
                        <span className="member-name">
                            {user.firstName} 
                        </span>
                    </h2>
                </Col>
            </Row>

            <br />
            
            <Row>

                <Col>
                <h3> Your Week</h3>
                    <br />
                    <EventUserWeek onSelection={selectionChange}/>
                </Col>

                <Col id="MusterSection">
                    <h3>Muster Mob</h3>
                    <MusterMob {...selection}/>
                </Col>
            </Row>

            <br/>

            
        </Container>
    );
}
