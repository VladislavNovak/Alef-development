import React, {useReducer} from 'react';
import PropTypes from 'prop-types';
import {CHANGE_STYLE} from './alertActions';
import {AlertContext} from "./alertContext";
import {alertReducer} from "./alertReducer";
import {alertStyles} from './alertStyles';

const initialState = {
  style: alertStyles.CLOSED,
  msg: ``,
};

export const AlertState = ({children}) => {
  const [state, dispatch] = useReducer(alertReducer, initialState);

  const changeAlert = (style, msg) => dispatch({
    type: CHANGE_STYLE,
    payload: {style, msg},
  });

  const hideAlert = () => dispatch({
    type: CHANGE_STYLE,
    payload: {style: alertStyles.CLOSED, msg: ``},
  });

  return (
    <AlertContext.Provider value={{changeAlert, hideAlert, alert: state}}>
      {children}
    </AlertContext.Provider>
  );
};

AlertState.propTypes = {
  children: PropTypes.node.isRequired
};
