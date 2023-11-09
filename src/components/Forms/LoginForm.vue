<script setup>
import {getAuth, signInWithEmailAndPassword,} from 'firebase/auth';
import db from '@/components/firebaseInit';
</script>

<template>
  <v-app>
    <v-main>
      <div class="startpage">
        <div class="video-container">
          <video autoplay muted loop>
            <source src="@/assets/Pharmacy.mp4" type="video/mp4">
          </video>
        </div>
      <v-container fluid fill-height>
        <v-row justify="center">
          <v-col class="mt-5 pt-5" cols="12" sm="8" md="6" lg="4">
            <v-card>
              <v-card-title class="headline text-center">
                <v-icon icon="mdi-account" />
              </v-card-title>
              <v-card-text>
                <v-form @submit.prevent="login()">
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
                    @click:append="show1 = !show1"
                    
                    label="Password"
                    :type="show1 ? 'text' : 'password'"
                    required
                    outlined
                  ></v-text-field>
                  <v-btn type="submit" color="primary" block>Login</v-btn>
                  <v-checkbox
                    v-model="rememberMe"
                    label="Remember Me"
                  ></v-checkbox>
                </v-form>
                <v-text class="mt-5" style="text-align: center;">
                  <router-link :to="{ name : 'Register' }"><a style="text-align: left; display: block; float: left;">Register Here</a></router-link> 
                  <router-link :to="{ name : 'ForgotPw' }"><a href="./ForgotPw" style="text-align: right; display: block; float: right;">Forgot Password</a></router-link>
                  <!-- <br> -->
                </v-text>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      </div>
    </v-main>
  </v-app>
</template>

<script>
const auth= getAuth();
export default {
  data() {
    return {
      username: "",
      password: "",
      show1: false,
      rememberMe: false,
    };
  },
  methods: {
    login() {
      // Add your login logic here
      // console.log(db.data())
      // console.log("Logging in with username:", this.username);

      signInWithEmailAndPassword(auth, this.username, this.password)
      .then((data)=>{
        console.log("Success login", auth.currentUser.uid)
        let userType=0
        let g = db.collection('users').where('email','==',this.username).get()
        g.then((q=>{
          userType=(q.docs[0].data().userType)
          if(userType==1){
            this.$router.push("admin/homepage");
          }
          else{
            this.$router.push("home");
            console.log(user.uid)
          }
        }))
      })
      .catch((error)=>{
        alert("Invalid username or password! Please try again.")
        this.username=''
        this.password=''
      })      
    }, //end login
  }, //end method
  computed: {
    emailRules() {
      return [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ];
    },
    // passwordRules() {
    //   return [
    //     (v) => !!v || "Password is required",
    //     (v) => v.length >= 8 || "Password must be at least 8 characters",
    //     (v) => /[A-Z]/.test(v) || "Password must contain at least one uppercase letter",
    //     (v) => /[a-z]/.test(v) || "Password must contain at least one lowercase letter",
    //     (v) => /\d/.test(v) || "Password must contain at least one number",
    //     (v) => /[!@#$%^&*]/.test(v) || "Password must contain at least one special character (!@#$%^&*)",
    //   ];
    // },
  },
  mounted() {
    
  }
}
</script>

<style scoped>
/* Add your custom styles here if needed */
.v-application__wrap {
  min-height:100vh;
  max-height: 100vh;
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


