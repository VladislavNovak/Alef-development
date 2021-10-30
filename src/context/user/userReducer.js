import {UPDATE} from "./userActions";

const handlers = {
  [UPDATE]: (state, {payload}) => ({
    ...state, user: payload
  }),
  DEFAULT: state => state,
};

export const userReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
