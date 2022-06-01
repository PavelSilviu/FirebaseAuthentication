// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getAuth } from "firebase/auth";
import Constants from "expo-constants";

// Initialize Firebase
const fireApp = initializeApp(Constants.manifest.web.config.firebase);
const fireAuth = getAuth(fireApp);
const fireDB = getFirestore(fireApp);
const fireFunc = getFunctions(fireApp);

// if(!proccess.ENV.__DEV__IP) {
//   throw new Error('You must pass the IP for it to work in development mode');
// }
if (__DEV__) {
  console.log("Switching to local Firebase instance...");

  const origin = "172.20.10.3";


  //firebase.auth().useEmulator(`http://${origin}:9099/`);
  //firebase.firestore().useEmulator(origin, 8080);
  connectFunctionsEmulator(fireFunc, origin, 5000);
} else {
  console.log = () => null;
}

fireFunc.region = "europe-west1";

export { fireApp, fireAuth, fireDB, fireFunc };
