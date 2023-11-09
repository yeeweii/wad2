<script setup>
import {getAuth, createUserWithEmailAndPassword,} from 'firebase/auth'
</script>

<template>
  <v-app>
    <v-main>
      <div class="startpage">
        <div clas="row justify-content-center">
        <div class="video-container">
          <video autoplay muted loop>
            <source src="@/assets/Pharmacy.mp4" type="video/mp4">
          </video>
        </div>
      <v-container fluid fill-height>
        <v-row justify="center" align-content="center">
          <v-col class=" mt-2 mb-2 pt-3" cols="12" sm="8" md="6" lg="4">
            <v-card class="mt-5 pt-5">
              <v-card-title class="headline text-center">
                <v-icon icon="mdi-account" />
              </v-card-title>
              <v-card-text>
                <v-form @submit.prevent="register">
                  <v-text-field 
                    v-model="firstname"
                    label="First Name"
                    :rules="firstRules"
                    required
                    outlined
                  >
                </v-text-field>
                  <v-text-field
                    v-model="lastname"
                    label="Last Name"
                    :rules="lastRules"
                    required
                    outlined
                  ></v-text-field>
                  <v-text-field
                    v-model="username"
                    :rules="emailRules"
                    label="Username (Email)"
                    required
                    outlined
                  ></v-text-field>
                  <v-text-field 
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passwordRules"
                    label="Password"
                    :type="show1 ? 'text' : 'password'"
                    required
                    outlined
                    @click:append="show1 = !show1"
                    counter
                  ></v-text-field>
                  <v-text-field
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    v-model="confirmPassword"
                    :rules="confirmPasswordRules"
                    label="Confirm Password"
                    :type="show2 ? 'text' : 'password'"
                    required
                    @click:append="show2 = !show2"
                    outlined
                    counter
                  ></v-text-field>                  

    <v-checkbox v-model="terms">
      <template v-slot:label>
        <v-text>
          I agree to site
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <a target="_blank" href="/tnc" @click.stop>Terms and Conditions</a>
            </template>
            Opens in new window
          </v-tooltip>
        </v-text>
      </template>
    </v-checkbox>
        <v-btn type="submit" color="primary" block>Register</v-btn>
          </v-form>
            <v-text class="mt-5 text-center" style="text-align: center">
            <div>
               <br>
          <router-link :to="{name: 'Login'}"><a>Back To Login</a></router-link>
            </div>
            </v-text>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      
      </v-container>
    </div>
    </div>
    </v-main>
  </v-app>

</template>

<script>
import db  from '@/components/firebaseInit';
const auth= getAuth();
export default {
  data() {
    return {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
      terms: false,
      show1: false,
      show2: false,
      userType: 0,
    };
  },
  methods: {
    register() {
      if (!this.terms) {
        // Handle terms and conditions acceptance here
        alert("Please agree to the terms and conditions.");
        return;
      }

      // Add your registration logic here
      // For demonstration purposes, we'll just display an alert
      if (this.firstname && this.lastname && this.username && this.password && this.confirmPassword) {                
        createUserWithEmailAndPassword(auth, this.username, this.password)
        .then((data)=>{
          console.log("Success register")
          alert("Registration Successful!")
          console.log(this.username)
          if(this.username.includes('smu.edu.sg')){
            this.userType=1
          }
          else{
            this.userType=0
          }
          db.collection('users').add({
            
            firstName: this.firstname,
            lastName: this.lastname,
            email: this.username,
            userType: this.userType,
            UID: auth.currentUser.uid,
          })
          this.$router.push("login");
        })
        .catch((error)=>{
          console.log(error)
          alert("Registration Failed! Please try again.")
          this.password=''
          this.confirmPassword=''
        })

      }

      // You can replace the alert with your actual registration logic

      // After successful registration, you may want to redirect the user to another page.
      // You can use Vue Router for navigation in a Vue.js application.

      // Add your login logic here
      console.log("Logging in with username:", this.username);
    },
  },

  computed: {
    firstRules() {
      return [
        (v) => !!v || "First name is required",
      ];
    },
    lastRules() {
      return [
        (v) => !!v || "Last name is required",
      ];
    },
    emailRules() {
      return [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ];
    },
    passwordRules() {
      return [
        (v) => !!v || "Password is required",
        (v) => v.length >= 8 || "Password must be at least 8 characters",
        (v) => /[A-Z]/.test(v) || "Password must contain at least one uppercase letter",
        (v) => /[a-z]/.test(v) || "Password must contain at least one lowercase letter",
        (v) => /\d/.test(v) || "Password must contain at least one number",
        (v) => /[!@#$%^&*]/.test(v) || "Password must contain at least one special character (!@#$%^&*)",
      ];
    },
    confirmPasswordRules() {
      return [
      (v) => !!v || "Password is required",
        (v) => v.length >= 8 || "Password must be at least 8 characters",
        (v) => /[A-Z]/.test(v) || "Password must contain at least one uppercase letter",
        (v) => /[a-z]/.test(v) || "Password must contain at least one lowercase letter",
        (v) => /\d/.test(v) || "Password must contain at least one number",
        (v) => /[!@#$%^&*]/.test(v) || "Password must contain at least one special character (!@#$%^&*)",
        (v) => v === this.password || "Passwords do not match",
      ];
    },
  },
  // method: {
  //   // const register=()
  // }
};
</script>



<style scoped>
/* Add your custom styles here if needed */
/* background-container {
 
} */

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); 
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2; 
}

.startpage {
  position: relative;
  /* padding-bottom: calc(10rem - 4.5rem); */
  width: 100%;
  height: 100vh;
  background: linear-gradient(to top, rgba(17, 87, 94, 0.8) 100%, rgba(97, 54, 102, 0.8) 0%);
}

/* Add styles for the video container */
.video-container {
  position: absolute;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow:hidden;
}

video {
  min-height: 1400px;
  justify-content: center;
}



</style>
