/* eslint-disable react/prop-types */
import React, {useReducer} from 'react';
import {ADD_CHILD, REMOVE_CHILD} from './userActions';
import {UserContext} from "./userContext";
import {userFields} from "./userFields";
import {userReducer} from './userReducer';

const initialState = {
  userFields,
  children: [],
};

export const UserState = ({children}) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const add = (payload) => {
    dispatch({
      type: ADD_CHILD,
      payload,
    });
  };

  const remove = (id) => {
    dispatch({
      type: REMOVE_CHILD,
      payload: id,
    });
  };

  return (
    <UserContext.Provider value={{add, remove, user: state}} >
      {children}
    </UserContext.Provider>
  );
};
