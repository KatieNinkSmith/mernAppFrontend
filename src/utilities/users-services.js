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
  return getUser();
}

export async function login(credentials) {
  const token = await usersAPI.login(credentials);

  // persist the token
  localStorage.setItem("token", token);
  return getUser();
}

export function getToken() {
  // getItem returns null if there is no string in the key "token" or the key doesnt exist
  const token = localStorage.getItem("token");
  if (!token) return null;
  // obtain the payload
  const payload = JSON.parse(atob(token.split(".")[1]));
  //check the expreation
  // a JWT's experation is expressed in milliseconds, not seconds so convert
  if (payload.exp < Date.now() / 1000) {
    // token has expired and we remove it from local storage
    localStorage.removeItem("token");
    return null; // return null to indicate that the user is no longer authenticated
  }
  return token;
}

export function getUser() {
  const token = getToken();
  // if there is a token, return the user in the payload, otherwise return null
  // split the token, parse the second part of it, once you decode, access the user key in the object
  return token ? JSON.parse(atob(token.split(".")[1])).user : null;
  // return the name and email from the payload
}

export function logOut() {
  localStorage.removeItem("token");
}

export default { login };
