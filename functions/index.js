const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
  
  
exports.trackFavoriteCount = functions.database.ref('/users/{userId}/favorites/{itemId}')
  .onWrite(event => {

    const { userId, itemId } = event.params;
    const track = event.data.val() ? -1 : 1 ;

    return admin.database()
      .ref('itemsFavoriteCount')
      .child(itemId)
      .transaction((currentCount = 0) => {
        return currentCount + track;
      });
  });
  