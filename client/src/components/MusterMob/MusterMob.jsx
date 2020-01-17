import React, { useEffect, useState } from "react";
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalBody from 'react-bootstrap/ModalBody';
import Card from 'react-bootstrap/Card';
import User from "../../utils/Account/User";
import Mob from "../../utils/Account/Mobs";
import moment from "moment";
import "./MusterMob.css";

function MusterMob(props) {
    console.log("MusterMob: ", props)
    const [displayMobInfo, setDisplayMobInfo] = useState([]);
    const [displayInfo, setDisplayInfo] = useState({
        date: "Dec 11, 2019",
        day: "Wednesday",
        daySelected: SVGComponentTransferFunctionElement,
        event: "",
        eventId: "",
        mobEvents: [],
        time: ""    
    });

    const getMobDay = async () => {
        const mobStuff = [];
        const allMobEvents = [];
        const mobEvents = props.mobEvents;
        mobEvents.map(event=> {
            allMobEvents.push({
                date: event.event.end,
                name: event.name,
                thing: event.event.title
            })
        })
        console.log("allMobEvents: ", allMobEvents)
        const checkDate = moment(props.date).format('YYYY[-]MM[-]DD');
        allMobEvents.forEach(event => {
            if(event.date === checkDate) {
                mobStuff.push({
                    name: event.name,
                    title: event.thing
             })
            }
        });
        setDisplayMobInfo(mobStuff);
    }

    useEffect(() => {
        getMobDay();   
        setDisplayInfo(props)   
    }, [props]);

    useEffect(() => {
        setDisplayInfo(props)
    }, []);

    return (displayInfo.daySelected) ? (
        <ModalDialog id="saved-mob">
            <ModalBody style={{ 'maxHeight': '23rem', 'paddingTop': '1rem', 'minHeight': '23rem', 'overflowY': 'auto', 'justifyContent': 'center' }}>
                <Card className="card" style={{ width: "100%" }}>
                    <Card.Header id="event-day-title">
                        <Card.Title>{displayInfo.day}</Card.Title>
                        <Card.Subtitle>{displayInfo.date}</Card.Subtitle>
                    </Card.Header>
                    {displayMobInfo.map(info => {
                        return (
                    <Card.Body>
                        <Card.Text style={{ float: "left" }}>Event: {info.title}</Card.Text>
                        <Card.Text style={{ float: "right" }}>Name: {info.name}</Card.Text>
                    </Card.Body>
                        )
                    })}
                </Card>
            </ModalBody>
        </ModalDialog>
    ) : (
            <ModalDialog id="saved-mob">
                <ModalBody style={{ 'maxHeight': '23rem', 'paddingTop': '1rem', 'minHeight': '23rem', 'overflowY': 'auto', 'justifyContent': 'center' }}>
                    <Card className="card" style={{ width: "100%" }}>
                        <Card.Header id="event-title">
                            <Card.Title>{displayInfo.event}</Card.Title>
                            <Card.Subtitle id="event-date">{displayInfo.day}, {displayInfo.date}</Card.Subtitle>
                        </Card.Header>
                        {displayMobInfo.map(info => {
                        return (
                    <Card.Body>
                        <Card.Text style={{ float: "left" }}>Event: {info.title}</Card.Text>
                        <Card.Text style={{ float: "right" }}>Name: {info.name}</Card.Text>
                    </Card.Body>
                        )
                    })}
                    </Card>
                </ModalBody>
            </ModalDialog>
        )
}

export default MusterMob;
