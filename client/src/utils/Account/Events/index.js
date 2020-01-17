import actions from "./EventActions.json";
import API from "./EventAPI.js";
import { Provider, useContext, refreshDbOnLoad, refreshApiOnLoad } from "./EventState.jsx";

export default {
    actions,
    API,
    Provider, 
    useContext,
    refreshDbOnLoad,
    refreshApiOnLoad
};

export {
    actions as eventActions,
    API as eventAPI,
    Provider as EventProvider, 
    useContext as useEventContext,
    refreshDbOnLoad as refreshDbEventsOnLoad,
    refreshApiOnLoad as refreshApiEventsOnLoad
}