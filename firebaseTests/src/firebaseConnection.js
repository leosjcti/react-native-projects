import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyDp1METeLlFHh_FMFicrf9goK-bbEW341U",
    authDomain: "meuapp-8144c.firebaseapp.com",
    databaseURL: "https://meuapp-8144c-default-rtdb.firebaseio.com",
    projectId: "meuapp-8144c",
    storageBucket: "meuapp-8144c.appspot.com",
    messagingSenderId: "838530037590",
    appId: "1:838530037590:web:59334697e3b09ad79688f7",
    measurementId: "G-EMDNMCSQS4"
  };
  const app = initializeApp(firebaseConfig);
  export const db = getDatabase(app);