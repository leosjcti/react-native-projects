import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';


  const firebaseConfig = {
    apiKey: "AIzaSyCWZ937wpjfL-Cbc62mxndegvaGUB_JeBU",
    authDomain: "tarefa-ef95e.firebaseapp.com",
    projectId: "tarefa-ef95e",
    storageBucket: "tarefa-ef95e.appspot.com",
    messagingSenderId: "686364271418",
    appId: "1:686364271418:web:0167182493d2927a6c6603",
    measurementId: "G-TTGPHYP133"
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  
  const authentication = getAuth(app);

  export { db, authentication}
  