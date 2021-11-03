import {CHANGE_STYLE} from './alertActions';

const handlers = {
  [CHANGE_STYLE]: (state, {payload}) => ({
    ...state,
    ...payload,
  }),
  DEFAULT: state => state,
};

export const alertReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
