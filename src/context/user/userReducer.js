import {ADD_CHILD, REMOVE_CHILD} from "./userActions";

const handlers = {
  [ADD_CHILD]: (state, {payload}) => ({
    ...state, children: [...state, payload]
  }),
  [REMOVE_CHILD]: (state, {payload}) => ({
    ...state, children: state.children.filter(child => child.id !== payload)
  }),
  DEFAULT: state => state,
};

export const userReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
