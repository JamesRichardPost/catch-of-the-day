import reBase from "re-base";
import firebase from "firebase";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBpoqVV7Q-iVKBVFjnIeMLMmkexmW2gvdQ",
    authDomain: "catch-of-the-day-41091.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-41091-default-rtdb.firebaseio.com",
    projectId: "catch-of-the-day-41091",
    storageBucket: "catch-of-the-day-41091.appspot.com",
    messagingSenderId: "1091434835626",
    appId: "1:1091434835626:web:b9baf619e4af0fc2bc6ad3",
    measurementId: "G-10K014P6NP"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
//const analytics = firebase.getAnalytics(app);

const base = reBase.createClass(app.database());

// this is a named export
export { app };

// this is a default export
export default base;