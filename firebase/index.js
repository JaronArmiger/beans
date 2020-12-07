const admin = require("firebase-admin");
require('dotenv').config();

// const { serviceAccount } = require("../config/fbServiceAccountKey.js");

// console.log('serviceAccount', serviceAccount)

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    projectId: 'pilsen-vintage',
    private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: "firebase-adminsdk-6uku7@pilsen-vintage.iam.gserviceaccount.com",
    client_id: "109796269439611606896",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6uku7%40pilsen-vintage.iam.gserviceaccount.com"
  }),
  // credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://beans-fe9bf.firebaseio.com"
});

module.exports = admin;