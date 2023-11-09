import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import firebaseConfig from './firebaseConfig'
import { getAuth } from 'firebase/auth'
const firebaseApp = firebase.initializeApp
(firebaseConfig)
export default firebaseApp.firestore()
const auth = getAuth(firebaseApp)
export { auth };

