import React, { useState, useRef, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Event from '../../../utils/Account/Events';
import User from '../../../utils/Account/User';
import { EventError } from "../../../components";
import EventApiCalendar from "../ApiCalendar";
import moment from "moment";
import "./SearchForm.css";


const { SET_API_EVENTS, EVENTS_ERROR, SET_API_QUERY } = Event.actions;

export default function () {
    Event.refreshDbOnLoad();
    User.refreshOnLoad();
    const [validated, setValidated] = useState(false);
    const [/* user not needed */, eventDispatch] = Event.useContext();
    const [{ apiEvents }] = Event.useContext();
    const [queryQ, setQueryQ] = useState("christmas");
    const [queryDates, setQueryDates] = useState({
        start: "",
        end: ""
    })

    useEffect(() => {
        const today = moment().format('YYYY[-]MM[-]DD');
        const endMonth = moment(today).endOf('month').format('YYYY[-]MM[-]DD');
        setQueryDates({start: today, end: endMonth});
    }, []);

    useEffect(() => {
        aboutUser()
    }, []);

    const aboutUser = async () => {
        const userAbouts = await User.API.getAbouts();
        const one = userAbouts[0].toLowerCase();
        if (one.includes("concert")) {
            setQueryQ("concert")
        } else if (one.includes("sport")) {
            setQueryQ("sports")
        }
    }

    const updateQueryDates = (newDates) => {
        setQueryDates({
            start: moment(newDates.start).format('YYYY[-]MM[-]DD'),
            end: moment(newDates.end).format('YYYY[-]MM[-]DD')
        })
    }

    useEffect(() => {
        updateEventAPI();
    }, [queryDates, queryQ]);


    // Where we store the user's input from our search form
    // This one is the text input from the search bar that we'll send as a query to the API
    const qInput = useRef();

    // The stuff that happens when the submits the form
    const handleSubmit = event => {
        // Stops the page from refreshing
        event.preventDefault();
        // Taylor's Stuff
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }
        // Our params object that we'll send to the API request
        // Built from user's input
        const rawQ = qInput.current.value;
        const q = (rawQ.split(" ")).join("+");
        // Calling the function to make the API request (sending it our user's params)
        setQueryQ(q);
    };

    // Build and then make API call (in progess)
    const updateEventAPI = () => {
        const key = "client_id=MTk1OTI0NDF8MTU3NDQ1Mjc1MC43NQ&client_secret=24c6903bd6b5005c4d5de56d640bf9c071cf6f6a42b4a55c96dee81ebc08df14";
        const queryURL = `https://api.seatgeek.com/2/events?geoip=true&per_page=1000&q=${queryQ}&datetime_local.gte=${queryDates.start}&datetime_local.lte=${queryDates.end}&${key}`;
        eventDispatch({ type: SET_API_QUERY, queryURL });
        Event.API.eventAPI(
            queryURL
        ).then(results => {
            eventDispatch({ type: SET_API_EVENTS, results });
            console.log(apiEvents);
        }).catch((err) => {
            eventDispatch({ type: EVENTS_ERROR, message: err });
        });
    }


    return (
        <Container className="mt-5">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>

                    <h2>Search Events</h2>
                    <br />
                    <br />
                    {/* search bar to get user events, query input (taxonomies filter) */}
                    <Form id="search-area"
                        validated={validated}
                        onSubmit={handleSubmit}
                        noValidate>
                        <Form.Row>
                            {/* Drop Down List of Taxonomies Options
                            <Form.Group as={Col} controlId="formGridTaxo">
                                <Form.Control
                                    required
                                    ref={taxoInput}
                                    as="select">
                                    <option>Concert</option>
                                    <option>Sports</option>
                                </Form.Control>
                            </Form.Group> */}

                            {/* Input Box (Search bar) for query input */}
                            <Form.Group as={Col} controlId="formGridQ" id="search-box">
                                <Form.Control
                                    pattern=".*\S+.*"
                                    type="text"
                                    placeholder="Search Events"
                                    ref={qInput} />
                                
                            </Form.Group>
                                <Button variant="light" type="submit" id="submit-button2">
                                    Submit
                                </Button>
                        </Form.Row>

                        <EventError />
                    </Form>
                </Col>
            </Row>
            <br />
            <br />
            <EventApiCalendar onUpdateDate={updateQueryDates}/>
        </Container>
    );
}
