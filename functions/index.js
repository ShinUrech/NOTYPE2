const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.onPaymentSuceeded = functions.firestore
    .document("customers/{userId}/payments/{paymentIntent}")
    .onWrite((change, context) => {
      const document = change.after.data();
      const paymentIntent = document.id;
      const date = Date.now();
      const amount = document.amount / 100;
      const userId = context.params.userId;

      db.doc("Users/" + userId + "/payments/" + paymentIntent).set({
        date: date,
        paymentIntent: paymentIntent,
        amount: amount,
      });
    });

/* exports.checkForExpiredSessions = functions.https.
    onRequest((request, response) => {
    const timeNow = Date.now();

    db.collection('customers').get().then(e => {
    });
    response.send("Hello from Firebase!");
}); */
