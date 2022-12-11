export function login(name, email, authToken) {
  return {
    type: "LOGIN",
    payload: {
      name,
      email,
      authToken,
    },
  };
}

export function logout() {
  return {
    type: "LOGOUT",
  };
}

export function updateAppState(state) {
  return {
    type: "UPDATE_APP_STATE",
    payload: {
      state,
    },
  };
}
