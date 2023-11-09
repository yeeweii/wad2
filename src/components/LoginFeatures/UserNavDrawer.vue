<template>
  <v-navigation-drawer v-model="drawer" color="blue-lighten-4" temporary>
      <v-list-item
        prepend-icon="mdi-account-circle"
        title="Ethan Tay"
        class="mt-2"
      ></v-list-item>

      <v-divider density="comfortable"></v-divider>

      <v-list density="comfortable" rounded="2" nav v-model="selectedSettings">

        <v-hover>
          <template v-slot:default="{ isHovering, props }">
          <router-link class="router-link-item" :to="{ name : 'home'}">
              <v-list-item prepend-icon="mdi-home"
              v-bind="props"
              title="Home" 
              value="home"
              :color=" isHovering ? 'primary' : 'undefined'">
              </v-list-item>
            </router-link>
          

            <v-list-item prepend-icon="mdi-light-switch" 
            v-bind="props"
            title="Switch Theme" 
            value="switch" 
            @click="checkValue('switch')"
            :color=" isHovering ? 'primary' : 'undefined'">
            </v-list-item>


            <v-dialog width="500">
              <template v-slot:activator="{ props }">
                  <v-list-item 
                  v-bind="props"
                prepend-icon="mdi-account-edit"
                title="Edit Profile"
                value="Edit"
                :color=" isHovering ? 'primary' : 'undefined'">
                </v-list-item>
              </template>
            
              <template v-slot:default="{ isActive }">
                <v-card title="Edit Profile">
                  <v-card-text>
                  <div class="text-right">
                    <v-btn @click="enableTextFields()" class="btn-secondary text-center">Edit<v-icon icon="mdi-account-edit"/></v-btn>
                  </div>  
                    <v-form @submit.prevent="login">
                      First Name
                        <v-text-field
                          v-model="firstname"
                          :disabled="textFieldsEnabled"
                        ></v-text-field>
                      Last Name
                        <v-text-field
                          v-model="lastname"
                          :disabled="textFieldsEnabled"
                        ></v-text-field>
                      New Password
                        <v-text-field
                        v-model="password"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="passwordRules"
                          :type="show1 ? 'text' : 'password'"
                          required
                          @click:append="show1 = !show1"
                          counter
                          :disabled="textFieldsEnabled"
                        ></v-text-field>
                      Confirm New Password
                        <v-text-field
                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                          v-model="confirmPassword"
                          :rules="confirmPasswordRules"
                          :type="show2 ? 'text' : 'password'"
                          required
                          @click:append="show2 = !show2"
                          counter
                          :disabled="textFieldsEnabled"
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

            <router-link class="router-link-item" :to="{ name : 'Login'}">
              <v-list-item prepend-icon="mdi-logout" 
              title="Logout" 
              value="logout"
              v-bind="props"
              :color=" isHovering ? 'primary' : 'undefined'">
              </v-list-item>
            </router-link>
          </template>
        </v-hover>
             
      </v-list>
  </v-navigation-drawer>
  <v-main>
      <div class="d-flex justify-content-start align-items-start my-auto h-50">
              <v-btn density="compact" icon="mdi-drag" @click.stop="drawer = !drawer"></v-btn>
      </div>
  </v-main>


</template>

<!-- <script>
export default {
  data() {
    return {
      drawer: null,
      selectedSettings: "",
      firstname: "FirstName", // fetch data from firebase and populate form
      lastname: "LastName",
      password: "",
      confirmPassword: "",
      show1: false,
      show2: false,
      textFieldsEnabled:true,
      options: [
        { icon: "mdi-home", title: "Home", value: "home" },
        { icon: "mdi-light-switch", title: "Switch Theme", value: "switch" },
        { icon: "mdi-logout", title: "Logout", value: "logout" },
      ],
    };
  },
  methods: {
    saveChanges(){
      this.textFieldsEnabled = !this.textFieldsEnabled;
      if(this.firstname||this.lastname) {
        alert("Account Updated Successfully")
      }
      else{
        if (this.password) {
          if (this.confirmPassword) {
            alert("Account Updated Successfully")
            this.password=""
            this.confirmPassword="";}
          }
      }},
    deleteAcc(){
      if(confirm("Are you sure you want to delete your account?")){
        alert("Account deleted")
        console.log("delete this account from firebase")
      }else{
        console.log("cancel request")
      }
    },
    enableTextFields(){
      this.textFieldsEnabled = !this.textFieldsEnabled;
    }

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
      if(this.confirmPassword!=""){
        return [
        (v) => v.length >= 8 || "Password must be at least 8 characters",
        (v) => /[A-Z]/.test(v) || "Password must contain at least one uppercase letter",
        (v) => /[a-z]/.test(v) || "Password must contain at least one lowercase letter",
        (v) => /\d/.test(v) || "Password must contain at least one number",
        (v) => /[!@#$%^&*]/.test(v) || "Password must contain at least one special character (!@#$%^&*)",
        (v) => v === this.password || "Passwords do not match",
      ];
      }
    },
  },

};
</script> -->

<!-- <script setup>

import { ref } from 'vue';
import { useTheme } from 'vuetify';

const drawer = ref(null);
const selectedSettings = ref('');
const theme = useTheme();
const options = ref([
  { icon: "mdi-home", title: "Home", value: "home" },
  { icon: "mdi-light-switch", title: "Switch Theme", value: "switch" },
  { icon: "mdi-logout", title: "Logout", value: "logout" },
]);

function checkValue(value) {
  if (value === "switch") {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
}
};


</script>

<style scoped>
.router-link-item {
  text-decoration: none; /* Remove underline */
  color: black; /* Set text color to black */
}
</style> -->



<!-- <template>
  <v-layout style="background-color: rgba(225, 225, 225, 0)">
    <v-main>
        <div class="d-flex justify-content-start align-items-start my-auto h-50">
                <v-btn density="compact" icon="mdi-drag" @click.stop="drawer = !drawer"></v-btn>
        </div>
    </v-main>
    <v-navigation-drawer v-model="drawer" color="blue-lighten-4" temporary>
      <v-list-item
          prepend-icon="mdi-account-circle"
          title="Ethan Tay"
          class="mt-2"
        ></v-list-item>

        <v-divider density="comfortable"></v-divider>

        <v-list density="comfortable" rounded="2" nav v-model="selectedSettings">

            <router-link class="router-link-item" :to="{ name : 'home'}">
                <v-list-item prepend-icon="mdi-home" title="Home" value="home">
                </v-list-item>
              </router-link>

              <v-list-item prepend-icon="mdi-light-switch" title="Switch Theme" value="switch" @click="checkValue('switch')">
              </v-list-item>

              <router-link class="router-link-item" :to="{ name : 'Login'}">
                <v-list-item prepend-icon="mdi-logout" title="Logout" value="logout">
                </v-list-item>
              </router-link>

        </v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
        title="Ethan Tay"
      ></v-list-item>
      
      <v-divider></v-divider>

      <v-list density="comfortable" rounded="2" nav v-model="selectedSettings">
        <v-list-item
          v-for="optionObj of options"
          :prepend-icon="optionObj.icon"
          :title="optionObj.title"
          :value="optionObj.value"
        >
        </v-list-item>
        <v-dialog width="500">
              <template v-slot:activator="{ props }">

                  <v-list-item v-bind="props"
                prepend-icon="mdi-account-edit"
                title="Edit Profile"
                value="Edit">
                  
                </v-list-item>
                
              </template>
            
              <template v-slot:default="{ isActive }">
                <v-card title="Edit Profile">
                  <v-card-text>
                  <div class="text-right">
                    <v-btn @click="enableTextFields()" class="btn-secondary text-center">Edit<v-icon icon="mdi-account-edit"/></v-btn>
                  </div>  
                    <v-form @submit.prevent="login">
                      First Name
                        <v-text-field
                          v-model="firstname"
                          :disabled="textFieldsEnabled"
                        ></v-text-field>
                      Last Name
                        <v-text-field
                          v-model="lastname"
                          :disabled="textFieldsEnabled"
                        ></v-text-field>
                      New Password
                        <v-text-field
                        v-model="password"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="passwordRules"
                          :type="show1 ? 'text' : 'password'"
                          required
                          @click:append="show1 = !show1"
                          counter
                          :disabled="textFieldsEnabled"
                        ></v-text-field>
                      Confirm New Password
                        <v-text-field
                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                          v-model="confirmPassword"
                          :rules="confirmPasswordRules"
                          :type="show2 ? 'text' : 'password'"
                          required
                          @click:append="show2 = !show2"
                          counter
                          :disabled="textFieldsEnabled"
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
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <div class="d-flex justify-content-start align-items-start my-auto h-50">
        <v-btn
          density="compact"
          icon="mdi-drag"
          @click.stop="drawer = !drawer"
        ></v-btn>
      </div>
    </v-main>
  </v-layout>
</template> -->

<script>
export default {
  data() {
    return {
      drawer: null,
      selectedSettings: "",
      firstname: "FirstName", // fetch data from firebase and populate form
      lastname: "LastName",
      password: "",
      confirmPassword: "",
      show1: false,
      show2: false,
      textFieldsEnabled:true,
      options: [
        { icon: "mdi-home", title: "Home", value: "home" },
        { icon: "mdi-light-switch", title: "Switch Theme", value: "switch" },
        { icon: "mdi-logout", title: "Logout", value: "logout" },
      ],
    };
  },
  methods: {
    saveChanges(){
      this.textFieldsEnabled = !this.textFieldsEnabled;
      if(this.firstname||this.lastname) {
        alert("Account Updated Successfully")
      }
      else{
        if (this.password) {
          if (this.confirmPassword) {
            alert("Account Updated Successfully")
            this.password=""
            this.confirmPassword="";}
          }
      }},
    deleteAcc(){
      if(confirm("Are you sure you want to delete your account?")){
        alert("Account deleted")
        console.log("delete this account from firebase")
      }else{
        console.log("cancel request")
      }
    },
    enableTextFields(){
      this.textFieldsEnabled = !this.textFieldsEnabled;
    }

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
      if(this.confirmPassword!=""){
        return [
        (v) => v.length >= 8 || "Password must be at least 8 characters",
        (v) => /[A-Z]/.test(v) || "Password must contain at least one uppercase letter",
        (v) => /[a-z]/.test(v) || "Password must contain at least one lowercase letter",
        (v) => /\d/.test(v) || "Password must contain at least one number",
        (v) => /[!@#$%^&*]/.test(v) || "Password must contain at least one special character (!@#$%^&*)",
        (v) => v === this.password || "Passwords do not match",
      ];
      }
    },
  },

};
</script>
<script setup>
  import { ref } from 'vue';
  import { useTheme } from 'vuetify';

  const drawer = ref(null);
  const selectedSettings = ref('');
  const theme = useTheme();
  const options = ref([
    { icon: "mdi-home", title: "Home", value: "home" },
    { icon: "mdi-light-switch", title: "Switch Theme", value: "switch" },
    { icon: "mdi-logout", title: "Logout", value: "logout" },
  ]);

  function checkValue(value) {
    if (value === "switch") {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
  }
};
</script>
      


<style scoped>
  .router-link-item {
    text-decoration: none; /* Remove underline */
    color: black; /* Set text color to black */
  }
  </style>



