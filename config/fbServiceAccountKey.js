require('dotenv').config();

const accountKeyConfig = {
  "type": "service_account",
  "project_id": "pilsen-vintage",
  "private_key_id": process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
  "private_key": process.env.FIREBASE_ADMIN_PRIVATE_KEY,
  "client_email": "firebase-adminsdk-6uku7@pilsen-vintage.iam.gserviceaccount.com",
  "client_id": "109796269439611606896",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6uku7%40pilsen-vintage.iam.gserviceaccount.com"
};

exports.serviceAccount = accountKeyConfig;
