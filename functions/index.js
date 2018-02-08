const functions = require('firebase-functions');
const admin = require('firebase-admin');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

function update({ itemId, userId, setVal, transactionFn }) {
  
    return Promise.all([
      admin.database()
        .ref('itemsFavoritedBy')
        .child(itemId)
        .child(userId)
        .set(setVal),
      admin.database()
        .ref('itemsFavoriteCount')
        .child(itemId)
        .transaction(transactionFn)
    ]);
  }
  
  
  exports.trackAddFavorite = functions.database.ref('/users/{userId}/favorites/{itemId}')
    .onCreate(event => {
  
      const { userId, itemId } = event.params;
  
      return update({
        itemId,
        userId,
        setVal: true,
        transactionFn: currentCount => {
          if(!currentCount) return 1;
          return currentCount + 1
        }
      });
    });
  
  exports.trackRemoveFavorite = functions.database.ref('/users/{userId}/favorites/{itemId}')
    .onDelete(event => {
  
      const { userId, itemId } = event.params;
  
      return update({
        itemId,
        userId,
        setVal: null,
        transactionFn: currentCount => {
          if(!currentCount) return 0;
          return currentCount - 1
        }
      });
  
    });
  