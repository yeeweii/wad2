import firebase from '../components/firebaseInit'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth } from 'firebase/auth'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', {

    state: () => ({
        user: null,
        // userType: null,
        error: null,
    }),
    actions: {
        async signInWithEmailAndPassword(email, password) {
            const auth = getAuth();
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                state.user = userCredential.user;
                state.error = null;
            }
            catch (error) {
                state.user = null;
                state.error = error
            }
        },
        async createUserWithEmailAndPassword(email, password) {
            const auth = getAuth();
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                state.user = userCredential.user;
                state.error = null
          
            }
            catch (error) {
                state.user = null;
                state.error = error;
            }
        },
        async signOut() {
            const auth = getAuth();
            try {
                await signOut(auth);
                state.user = null;
                state.error = null;
                state.userType = null;
            }
            catch (error) {
                state.error = error
            }
        }
    }
})

 