import { auth } from "./firebase-config";
import axios from "axios";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  updatePassword,
} from "firebase/auth";

const { REACT_APP_BACKEND_URL } = process.env;

export const userInfosCompleted = async (receivedUser) => {
  let {
    displayName,
    email,
    phoneNumber,
    uid,
    stsTokenManager: { accessToken },
  } = receivedUser;
  const remainingFields = {};
  accessToken = await receivedUser.getIdToken(true);
  let user = await getUser(accessToken, uid);

  console.log(user);

  if (user) {
    displayName = user.nom;
    email = user.email;
    phoneNumber = user.telephone;
  }
  if (!displayName) remainingFields.displayName = "";
  if (!email) remainingFields.email = "";
  if (!phoneNumber) remainingFields.phoneNumber = "";

  localStorage.setItem("totalUserDB", JSON.stringify(user));
  return [
    user,
    Object.keys(remainingFields).length === 0 && Boolean(user.rolesId?.length),
    remainingFields,
  ];
};

export const getRoles = async (token) => {
  if (!token) {
    console.log("No token!");
    return;
  }
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${REACT_APP_BACKEND_URL}/roles`,
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return axios.request(config);
};

export const createUser = async (token, user) => {
  if (!token) {
    console.log("No token!");
    return;
  }
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${REACT_APP_BACKEND_URL}/users`,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    data: user,
  };
  return axios.request(config);
};

export const getUser = async (token, id) => {
  if (!token) {
    console.log("No token!");
    return;
  }
  const headers = new Headers();
  headers.append("Authorization", "Bearer " + token);
  let config = {
    method: "GET",
    headers,
  };
  let user = null;
  await fetch(`${REACT_APP_BACKEND_URL}/users/${id}`, config)
    .then((r) => {
      return r.ok ? r.json() : null;
    })
    .then((data) => (user = data))
    .catch((err) => console.log(err));

  return user;
};

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithRedirect(auth, provider);
  const result = await getRedirectResult(auth);

  console.log("RESULT", result);

  // async function example() {
  //   console.log("Avant le blocage");

  //   // Simuler une tâche asynchrone avec une promesse
  //   await new Promise((resolve) => setTimeout(resolve, 10000)); // Bloquer pendant 2 secondes

  //   console.log("Après le blocage");
  // }

  // example();

  return result;
};

export const doSignOut = () => {
  return auth.signOut();
};

export const logOut = () => {
  localStorage.removeItem("totalUser");
  localStorage.removeItem("totalUserDB");

  return doSignOut();
};

// export const doPasswordReset = (email) => {
//   return sendPasswordResetEmail(auth, email);
// };

// export const doPasswordChange = (password) => {
//   return updatePassword(auth.currentUser, password);
// };

// export const doSendEmailVerification = () => {
//   return sendEmailVerification(auth.currentUser, {
//     url: `${window.location.origin}/home`,
//   });
// };
