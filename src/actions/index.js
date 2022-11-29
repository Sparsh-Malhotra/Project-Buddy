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
