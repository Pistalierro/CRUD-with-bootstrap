import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';


const firebaseConfig = {
  apiKey: 'AIzaSyBudgE5GM1IQtE6dsLmckd_I9zZiht8VV8',
  authDomain: 'crud-with-bootstrap-21290.firebaseapp.com',
  databaseURL: 'https://crud-with-bootstrap-21290-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'crud-with-bootstrap-21290',
  storageBucket: 'crud-with-bootstrap-21290.firebasestorage.app',
  messagingSenderId: '376267032078',
  appId: '1:376267032078:web:083d0fe710568cc376de5f'
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ]
};
