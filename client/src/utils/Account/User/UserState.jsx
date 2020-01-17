import React, { createContext, useReducer, useContext, useEffect } from "react";
import API from "./UserAPI";
import actions from "./UserActions.json";
const { USER_LOADING, SET_USER, ABOUT_USER, USER_ERROR, CLEAR_USER_ERROR } = actions;

const UserContext = createContext();
const { Provider } = UserContext;

const reducer = (state, action) => {
    switch (action.type) {

        case USER_LOADING:
            return {
                ...state,
                loading: true
            };

        case SET_USER:
            return {
                ...state,
                user: action.user,
                loading: false,
                pageLoading: false
            };

        case ABOUT_USER:
            return {
                ...state,
                about: action.dragAbout,
                loading: false,
                pageLoading: false
            };

        case USER_ERROR:
            return {
                ...state,
                error: action.message,
                loading: false,
                pageLoading: false
            };

        case CLEAR_USER_ERROR:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
};

const UserProvider = ({ value = {}, ...props }) => {
    const [state, dispatch] = useReducer(reducer, {
        user: {},
        about: [],
        pageLoading: true,
        loading: false,
        error: null
    });

    return <Provider value={[state, dispatch]} {...props} />;
};

const useUserContext = () => {
    return useContext(UserContext);
};

const refreshUser = () => {
    const [{ loading }, userDispatch] = useUserContext();
    useEffect(() => {
        if (loading) {
            return;
        }
        userDispatch({ type: USER_LOADING });
        API.getUser().then(user => {
            userDispatch({ type: SET_USER, user });
        });
    }, []);
};

export { UserProvider as Provider, useUserContext as useContext, refreshUser as refreshOnLoad };
