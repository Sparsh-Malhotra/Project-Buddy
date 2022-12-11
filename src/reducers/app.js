export const defaultState = {
  appState: "LOGGED_OUT",
};

export default function app(state = defaultState, action) {
  switch (action.type) {
    case "UPDATE_APP_STATE":
      return Object.assign({}, state, {
        appState: action.payload.state,
      });
    default:
      return state;
  }
}
