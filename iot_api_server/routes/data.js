//import axios from 'axios';
var axios = require('axios');
const express = require('express');
const admin = require('firebase-admin');
var {google} = require("googleapis");
const https = require('https');
var router = express.Router();

// Load the service account key JSON file.
var serviceAccount = require("../testemonit-b47a7-firebase-adminsdk-pzfoa-68816bac30.json");
var uToken = "";

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    //https://testemonit-b47a7-default-rtdb.firebaseio.com/Pai/LastRecord.json
    databaseURL: 'https://testemonit-b47a7-default-rtdb.firebaseio.com'
});

// Define the required scopes.
var scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/firebase.database"
];

// Authenticate a JWT client with the service account.
var jwtClient = new google.auth.JWT(
    serviceAccount.client_email,
    null,
    serviceAccount.private_key,
    scopes
);

// Use the JWT client to generate an access token.
jwtClient.authorize(function(error, tokens) {
    if (error) {
        console.log("Error making request to generate access token:", error);
    } else if (tokens.access_token === null) {
        console.log("Provided service account does not have permission to generate access tokens");
    } else {
        var accessToken = tokens.access_token;
        uToken = accessToken;
        console.log(uToken);

        // See the "Using the access token" section below for information
        // on how to use the access token to send authenticated requests to
        // the Realtime Database REST API.
    }
});


// Define a route to retrieve data from Firebase
router.get('/', async (req, res) => {
    try {
        // Get data from Firebase Realtime Database
        //const snapshot = await admin.database().ref('/Pai/LastRecord').once('value');
        //const data = snapshot.val();

        //res.json(data);
        var lastRecord = await admin.database().ref('/Pai/LastRecord');
        lastRecord.once('value', function(snapshot) {
            var data = snapshot.val();
            console.log(data)

            // Return the data as JSON
            res.json(data);
        });
        //const response = await axios.get('https://testemonit-b47a7-default-rtdb.firebaseio.com/Pai/LastRecord.json');

    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

module.exports = router;

/*app.listen(3000, () => {
    console.log('Server running on port 3000');
});*/
