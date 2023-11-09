<template>

  <v-app>
    <v-main>
      <div class="settings">
      <v-container fluid fill-height>
        <v-row justify="center">
          <v-col class="mt-5 pt-5" cols="12" sm="8" md="6" lg="4">
            <v-card>  
              <v-card-title class="headline text-center">Edit Profile
                <v-icon icon="mdi-account-edit" />
              </v-card-title>
              <v-card-text>
                <v-form @submit.prevent="login">
                  <v-text-field
                    v-model="firstname"
                    label="First Name"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    v-model="lastname"
                    label="Last Name"
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
                  <v-btn type="submit" color="secondary" @click="saveChanges()" block>Save</v-btn>
                </v-form>
                <v-text class="mt-5 text-center" style="text-align: center">

    <br>
      <v-btn type="submit" color="danger" inline @click="deleteAcc()" @mouseenter="rotate()" style="color: white;">Delete Account</v-btn>
      <br>
      <v-container>
      <v-dialog width="500">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props">Change Profile<v-icon icon="mdi-account-edit" /></v-btn>
          
        </template>
      
        <template v-slot:default="{ isActive }">
          <v-card title="Edit Profile">
            <v-card-text>
              <v-form @submit.prevent="login">
                  <v-text-field
                    v-model="firstname"
                    label="First Name"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    v-model="lastname"
                    label="Last Name"
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
                  <v-btn type="submit" color="secondary" @click="saveChanges()" block>Save</v-btn>
                  <br>
                  <v-btn type="submit" color="danger" inline @click="deleteAcc()" style="color: white;">Delete Account</v-btn>
              </v-form>
            </v-card-text>
      
            <v-card-actions>
              <v-spacer></v-spacer>
      
              <v-btn
                text="Close"
                @click="isActive.value = false"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-container>
      <!-- <v-btn @click="animateButton">Animate Me</v-btn> -->
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
      firstname: "", // fetch data from firebase and populate form
      lastname: "",
      password: "",
      confirmPassword: "",
      show1: false,
      show2: false,
    };
  },
  methods: {
    saveChanges(){
      alert("Account updated successfully");
      gsap.to(".settings", {rotation:360, duration:2});
    },
    deleteAcc(){
      if(confirm("Are you sure you want to delete your account?")){
        alert("Account deleted")
        console.log("delete this account from firebase")
      }else{
        console.log("cancel request")
      }
    },
  },

  computed: {
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
  z-index: 1; 
}
</style>
