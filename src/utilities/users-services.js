import * as usersAPI from "./users-api";

// I need to pass in userData because this is attempting
//      to add a new user to the database
export async function signUp(userData) {
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const token = await usersAPI.signUp(userData);
  console.log(token);
  // for now, we will console.log the token to see that it exists and return
  // the name and email that was sent to us
  // we will also eventually save the token in localStorage
  localStorage.setItem("token", token);
  return { name: userData.name, email: userData.email };
}
