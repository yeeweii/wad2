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
          <v-row align-content="center" justify="center">
            <v-col class="mt-5 pt-5" cols="12" sm="8" md="6" lg="4">
              <v-card>
                <v-card-title class="headline text-center">
                  <v-icon icon="mdi-pencil" />
                </v-card-title>
                <v-card-text>
                  <v-form @submit.prevent="login">
                    <v-text-field
                      v-model="username"
                      :rules="emailRules"
                      label="Username (Email)"
                      required
                      outlined
                    ></v-text-field>
                    <v-text-field
                      v-model="newPassword"
                      :rules="passwordRules"
                      label="New Password"
                      type="password"
                      required
                      outlined
                    ></v-text-field>
                    <v-text-field
                      v-model="confirmPassword"
                      :rules="confirmPasswordRules"
                      label="Confirm Password"
                      type="password"
                      required
                      outlined
                    ></v-text-field>
                    <v-btn type="submit" color="primary" block>Change Password</v-btn>
                  </v-form>
                  <v-text class="mt-5 text-center" style="text-align: center">
    <div>
    <br>
    <router-link :to="{name: 'Login'}">
      <a>Back To Login</a>
    </router-link>
    </div>
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
    export default {
      data() {
        return {
          username: '',
          password: '',
          newPassword: '',
          confirmPassword: '',
        }
      },
      methods: {
        login() {
          // Add your login logic here
          console.log('Logging in with username:', this.username)
          if (this.username) {
            if (this.newPassword) {
              if (this.confirmPassword) {
                alert("Password changed successfully.");}}}
        },
      },
      computed: {
        emailRules() {
          return [
            v => !!v || 'Email is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
          ]
        },
        passwordRules() {
          return [
            v => !!v || 'Password is required',
            v => v.length >= 8 || 'Password must be at least 8 characters',
            v =>
              /[A-Z]/.test(v) ||
              'Password must contain at least one uppercase letter',
            v =>
              /[a-z]/.test(v) ||
              'Password must contain at least one lowercase letter',
            v => /\d/.test(v) || 'Password must contain at least one number',
            v =>
              /[!@#$%^&*]/.test(v) ||
              'Password must contain at least one special character (!@#$%^&*)',
          ]
        },
        confirmPasswordRules() {
          return [
            v => !!v || 'Confirm Password is required',
            v => v === this.newPassword || 'Passwords do not match',
          ]
        },
      },
    }
  </script>
  
  <style scoped>
    /* Add your custom styles here if needed */
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
  