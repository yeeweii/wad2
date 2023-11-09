<template>

  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-row align="center" justify="center">
          <v-col class="mt-5 pt-5" cols="12" sm="8" md="6" lg="4">
            <v-card>
              <v-card-title class="headline text-center">Edit Profile
                <v-icon icon="mdi-pencil" />
              </v-card-title>
              <v-card-text>
                <v-form @submit.prevent="login">
                  First Name
                  <v-text-field
                    v-model="firstname"
                    label="First Name"
                    outlined
                    inline
                  ></v-text-field>
                  <v-text-field
                    v-model="lastname"
                    label="Last Name"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    v-model="username"
                    :rules="emailRules"
                    label="New Username (Email)"
                    outlined
                  ></v-text-field>
                  <v-text-field
                  v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passwordRules"
                    label="New Password"
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
                    label="Confirm New Password"
                    :type="show2 ? 'text' : 'password'"
                    required
                    @click:append="show2 = !show2"
                    outlined
                    counter
                  ></v-text-field>
                  <v-btn type="submit" @click="cancelChanges()">Cancel</v-btn>
                  <v-btn type="submit" color="secondary" inline @click="saveChanges()">Save</v-btn>
                </v-form>
                <v-text class="mt-5 text-center" style="text-align: center">
    <br>
      <v-btn type="submit" color="danger" inline @click="deleteAcc()">Delete Account</v-btn>
  </v-text>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmPassword: "",
      terms: false,
      show1: false,
      show2: false,
    };
  },
  methods: {
    saveChanges(){
      alert("Account updated")
    },
    cancelChanges(){

    },
    deleteAcc(){
      if(confirm("Are you sure you want to delete your account?")){
        console.log("delete this account from firebase")
      }else{
        console.log("cancel request")
      }
    },
    login() {
      // Add your registration logic here
      // For demonstration purposes, we'll just display an alert
      if (this.firstname) {
        if (this.lastname) {
          if (this.username) {
            if (this.password) {
              if (this.confirmPassword) {
                alert("Registration Complete");}}}}}

      // You can replace the alert with your actual registration logic

      // After successful registration, you may want to redirect the user to another page.
      // You can use Vue Router for navigation in a Vue.js application.

      // Add your login logic here
      console.log("Logging in with username:", this.username);
    },

    
  },

  computed: {
    emailRules() {
      if(this.username!=""){
        return [
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ];
      }
      
    },
    passwordRules() {
      if(this.password!=""){
        return [
        (v) => v.length >= 8 || "Password must be at least 8 characters",
        (v) => /[A-Z]/.test(v) || "Password must contain at least one uppercase letter",
        (v) => /[a-z]/.test(v) || "Password must contain at least one lowercase letter",
        (v) => /\d/.test(v) || "Password must contain at least one number",
        (v) => /[!@#$%^&*]/.test(v) || "Password must contain at least one special character (!@#$%^&*)",
      ];
      }

    },
    confirmPasswordRules() {
      if(this.password!=""){
        return [
        (v) => v.length >= 8 || "Password must be at least 8 characters",
        (v) => /[A-Z]/.test(v) || "Password must contain at least one uppercase letter",
        (v) => /[a-z]/.test(v) || "Password must contain at least one lowercase letter",
        (v) => /\d/.test(v) || "Password must contain at least one number",
        (v) => /[!@#$%^&*]/.test(v) || "Password must contain at least one special character (!@#$%^&*)",
      ];
      }
    },
  },
};
</script>

<style>
/* Add your custom styles here if needed */
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
</style>
