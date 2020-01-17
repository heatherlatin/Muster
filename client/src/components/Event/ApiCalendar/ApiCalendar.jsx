import React, { Fragment, useEffect, useState } from "react";
import Event from '../../../utils/Account/Events';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import "./ApiCalendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const { EVENTS_ERROR, SET_USER_EVENTS, EVENTS_LOADING } = Event.actions;

function MyEvent(props) {
    const [displayclass, setDisplayClass] = useState("notSelected");
    useEffect(() => {
        props.event && props.event.resource && props.event.resource.eventSelected ? setDisplayClass("selected") : setDisplayClass("notSelected")
    }, [props.event.resource.eventSelected]);

    return (
        <div id={displayclass}>
            <div id="padding">
                {props.title}
            </div>
        </div>
    )
}

function ApiCalendar(props) {

    Event.refreshDbOnLoad();

    const [/* user not needed */, eventDispatch] = Event.useContext();
    const [{ apiEvents }] = Event.useContext();
    const [{ displayEvents }] = Event.useContext();
    const [apiEventsList, setApiEventsList] = useState([]);
    const [savedApiEventsList, setSavedApiEventsList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalEvent, setModalEvent] = useState({});
    const localizer = momentLocalizer(moment);

    useEffect(() => {
        eventDispatch({ type: EVENTS_LOADING });
    }, []);

    useEffect(() => {
        displayDbEvents();
    }, []);

    useEffect(() => {
        displayAllEvents();
    }, [apiEvents]);

    const displayDbEvents = async () => {
        const events = [];
        const dbEvents = await Event.API.getSavedEvents();
        dbEvents.map(event => {
            events.push({
                title: event.title,
                start: event.start,
                end: event.start,
                time: event.start,
                isSelected: event.isSelected,
                resource: { id: event.id, eventSelected: true }
            })
        });
        setApiEventsList(events);
    }

    const displayAllEvents = async () => {
        const ourDbEvents = [];
        const ourApiEvents = [];
        const dupeEvents = [];
        const dbEvents = await Event.API.getSavedEvents();
        dbEvents.map(event => {
            ourDbEvents.push({
                title: event.title,
                start: event.start,
                end: event.start,
                time: event.start,
                isSelected: event.isSelected,
                resource: { id: event.resource.id, eventSelected: true }
            })
        });
        apiEvents.map(event => {
            ourApiEvents.push({
                title: event.short_title,
                start: event.datetime_local,
                end: event.datetime_local,
                time: event.datetime_local,
                isSelected: event.isSelected,
                resource: { id: event.id, eventSelected: "" }
            })
        });

        ourApiEvents.forEach(event => {
            for (let i = 0; i < dbEvents.length; i++) {
                if (event.resource.id === dbEvents[i].resource.id) {
                    dupeEvents.push(event);
                }
            }
        })

        console.log("dupeEvents: ", dupeEvents)

        if (dupeEvents.length > 0) {
            const uniqueEvents = new Set();

            // const uniqueEvents = [];            
            for (let i = 0; i < ourApiEvents.length; i++) {
                for (let j = 0; j < dupeEvents.length; j++) {
                    if (ourApiEvents[i].resource.id != dupeEvents[j].resource.id) {
                        uniqueEvents.add(ourApiEvents[i]);
                    }
                }
            }  
            console.log("set Array: ", Array.from(uniqueEvents));
            const allEvents = ourDbEvents.concat(Array.from(uniqueEvents));
            setApiEventsList(allEvents);
        } else {
            const allEvents = ourDbEvents.concat(ourApiEvents);
            setApiEventsList(allEvents);
        }


    }


    const includes = (event) => {
        return savedApiEventsList.reduce((prev, item) => prev || item.resource.id === event.resource.id, false)
    }

    const updateSavedEventList = () => {
        if (!includes(modalEvent)) {
            setSavedApiEventsList([...savedApiEventsList, modalEvent])
            updateItem(modalEvent, { eventSelected: true })
            addDbEvent(modalEvent);
        } else {
            setSavedApiEventsList(savedApiEventsList.filter(item => item.resource.id !== modalEvent.resource.id))
            updateItem(modalEvent, { eventSelected: "" });
        }
        setShowModal(false);
    }

    const updateItem = (item, updatedFields) => {
        const newApiEventsList = apiEventsList.map(event => {
            if (event.resource.id === item.resource.id) {
                const resource = {
                    ...event.resource,
                    ...updatedFields
                }
                console.log("updateItem: ", {
                    ...item,
                    resource
                });
                return {
                    ...item,
                    resource
                }
            }
            return event;
        });
        setApiEventsList(newApiEventsList);
    }

    const handleCloseModal = () => setShowModal(false);

    const handleShowModal = (event) => {
        console.log("handleShowModal.event: ", event);
        setModalEvent(event);
        setShowModal(true);
    }

    // update user's events in db
    const addDbEvent = (savedEvent) => {
        const dateTime = savedEvent.start;
        const formatDateTime = dateTime.split("T");
        Event.API.addEvent({
            resource: { id: savedEvent.resource.id, eventSelected: true },
            title: savedEvent.title,
            start: savedEvent.end,
            end: formatDateTime[0],
            time: formatDateTime[1]
        }).then(events => {
            eventDispatch({ type: SET_USER_EVENTS, events });
        }).catch((err) => {
            eventDispatch({ type: EVENTS_ERROR, message: err });
        });
    }

    return (
        <Fragment>
            {/* calendar(month) to show events searched with buttons to go back and forth between weeks*/}
            <Calendar
                localizer={localizer}
                events={apiEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "80vh" }}
                views={['month']}
                components={{
                    event: MyEvent
                }}
                onSelectEvent={handleShowModal}
                popup={true}
                onRangeChange={props.onUpdateDate}
            />

            {/* modal for event*/}
            <Modal id="event-modal" show={showModal} onHide={handleCloseModal} animation={false}>
                <Modal.Title>{modalEvent.title}</Modal.Title>
                <Modal.Body>
                    {modalEvent.start} - {modalEvent.end}
                </Modal.Body>
                <Button id="close-button" variant="light" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button id="save-button" variant="light" onClick={updateSavedEventList}>
                    Save Event
                </Button>
            </Modal>
            {/* MODAL- taxonomies, venue, city,  time, seatgeek link, mob attendees (bonus), add button*/}
        </Fragment>

    );
}

export default ApiCalendar;
