/* eslint-disable react/prefer-stateless-function */
import React, { useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table'
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';
import "./UserWeek.css";
import Event from "../../../utils/Account/Events";
import moment from "moment";
import { PromiseProvider } from "mongoose";

// get user saved events from database
const { EVENTS_LOADING, SET_USER_EVENTS, EVENTS_ERROR } = Event.actions;

function UserWeek(props) {
    Event.refreshDbOnLoad();
    const [weekDates, setWeekDates] = useState([{
        date: "",
        day: "",
        event: "",
        time: "",
        id: ""
    }]);

    const getWeek = async () => {
        const allSavedEvents = [];
        const events = await Event.API.getSavedEvents();
        events.map(event=> {
            allSavedEvents.push({
                date: event.end,
                event: event.title,
                time: event.time,
                id: event.resource.id
            })
        })
        console.log(allSavedEvents)
        const weekDateArr = [];
        for (let i = 0; i < 7; i++) {
            const date = moment().add(i, "day").format('YYYY[-]MM[-]DD');
            const day = moment().add(i, 'day').format('dddd');
            const datesObj = {
                date,
                day,
                event: "",
                time: "",
                id: ""
            }
            weekDateArr.push(datesObj);
        }
        allSavedEvents.forEach(event=> {
            for(let i = 0; i < weekDateArr.length; i++) {
                if(event.date === weekDateArr[i].date) {
                    weekDateArr[i].event = event.event;
                    weekDateArr[i].time = event.time;
                    weekDateArr[i].id = event.id;
                }
            }
        })
        setWeekDates(weekDateArr);
        console.log(weekDateArr);
    }

    useEffect(() => {
        getWeek();      
    }, []);

    const selectionClicked = (bool, clicked) => {
        console.log("clicked: ", bool, clicked)
        props.onSelection(bool, clicked);
    }

    return (
        <Container id="user-week" style={{ 'maxHeight': '23rem', 'paddingTop': '1rem', 'minHeight': '23rem', 'overflowY': 'auto' }}>

            {/* table*/}
            {/* event listeners for clicking the day of the week or name of the event*/}
            <Table responsive>
                <tbody >
                    {weekDates.map(day => {
                        return (
                            <Fragment >
                                <tr id="dayOfWeek" onClick={() => selectionClicked(true, day)}>
                                    <td >{day.day}</td>
                                </tr>
                                <tr>
                                    <Card id="UserWeekDayCard" style={{ width: "100%" }}>
                                        <Card.Body onClick={() => selectionClicked(false, day)}>
                                            <Card.Text id="eventTitle" style={{ fontSize: "20px" }}>{day.event}</Card.Text>
                                            {/* <Card.Subtitle style={{ fontSize: "13px", float: "right" }}>{day.time}</Card.Subtitle> */}
                                        </Card.Body>
                                    </Card>
                                </tr>
                            </Fragment>
                            )
                    })}
                </tbody>
            </Table>



        </Container>
    );
}

export default UserWeek;
