import firebase from 'firebase/app';
import 'firebase/analytics';

const fbAnalytics = (firebaseConfig, message) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  const firebaseAnalytics = firebase.analytics();
  firebaseAnalytics.logEvent(`${message}_${firebaseConfig.uId}`);
};

export default fbAnalytics;
