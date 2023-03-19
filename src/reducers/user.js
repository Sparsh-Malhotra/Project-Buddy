export const defaultState = {
  name: null,
  email: null,
  authToken: null,
  userId: null,
};

export default function user(state = defaultState, action) {
  switch (action.type) {
    case "LOGIN":
      return Object.assign({}, { ...action.payload, userId: null });
    case "LOGOUT":
      return Object.assign({}, defaultState);
    case "SET_USER_ID":
      return Object.assign({}, { ...state, userId: action.payload.userID });
    default:
      return state;
  }
}
