import React, { createContext, useReducer, useContext, useEffect } from "react";
import API from "./MobAPI";
import actions from "./MobActions.json";

const { MOBS_LOADING,
  SET_MOBS,
  SET_MOBS_EVENTS,
  ADD_MOB,
  MOBS_ERROR,
  CLEAR_MOBS_ERROR } = actions;

const MobContext = createContext();
const { Provider } = MobContext;

const reducer = (state, action) => {
  switch (action.type) {
    case MOBS_LOADING:
      return {
        ...state,
        loading: true
      };

    case SET_MOBS:
      return {
        ...state,
        mobs: action.ourMobs,
        loading: false,
        pageLoading: false
      };

    case SET_MOBS_EVENTS:
      console.log("SET-MOBS-EVENTS: ", action.events);
      return {
        ...state,
        mobEvents: action.events,
        loading: false,
        pageLoading: false
      };

    case ADD_MOB:
      return {
        ...state,
        mobs: [action.event, ...state.events],
        loading: false
      };

    case MOBS_ERROR:
      return {
        ...state,
        error: action.message,
        loading: false
      };

    case CLEAR_MOBS_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};

const MobProvider = ({ value = {}, ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    mobs: [],
    mobEvents: [],
    pageLoading: true,
    loading: false,
    error: null
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useMobContext = () => {
  return useContext(MobContext);
};

const refreshMobs = () => {
  const [{ loading }, mobsDispatch] = useMobContext();
  useEffect(() => {
    if (loading) {
      return;
    }
    mobsDispatch({ type: MOBS_LOADING });
    API.getMobs().then(mobs => {
      mobsDispatch({ type: SET_MOBS, mobs });
    });
  }, []);
};

export { MobProvider as Provider, useMobContext as useContext, refreshMobs as refreshOnLoad };
