export const defaultState = {
  name: null,
  email: null,
  authToken: null,
};

export default function user(state = defaultState, action) {
  switch (action.type) {
    case "LOGIN":
      return Object.assign({}, action.payload);
    default:
      return state;
  }
}
