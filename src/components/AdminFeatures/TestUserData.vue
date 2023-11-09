<script setup>
import {getAuth, deleteUser,} from 'firebase/auth'
import {doc, deleteDoc, where} from 'firebase/firestore'
</script>

<template>

    <header class="bg-database-page">
        <div class="container-fluid">
            <div class="row align-items-center justify-content-center fill-height">
                <div class="col-10 text-center">
                    <h1 style="font-size:40px; font-family: monospace">Total Number of Users:</h1>
                    <h1 style="font-size:40px; font-family: monospace" class="gradient-6" ref="numberElement">{{ total }}</h1>
                    <hr class="divider">
                    <h1 class="text-white fw-bold" style="font-family:monospace">Users Information</h1>
                    <hr class="divider">
                    <v-data-table
                         v-model:page="page"
                        :headers="headers"
                        :items="users"
                        :items-per-page="itemsPerPage"
                        hide-default-footer
                        class="elevation-1"
                    >
                    

                    <template v-slot:bottom>
                        <div class="text-center pt-2">
                        <v-pagination v-model="page" :length="pageCount"></v-pagination>
                        <v-text-field
                            :model-value="itemsPerPage"
                            class="pa-2"
                            label="Items per page"
                            type="number"
                            min="-1"
                            max="15"
                            hide-details
                            @update:model-value="itemsPerPage = parseInt($event, 10)"
                        ></v-text-field>
                        </div>
                    </template>

                    </v-data-table> 

                    <v-btn class="mt-4" color="primary" @click="openModal(item)">Search a User</v-btn>

                    <v-dialog v-model="modal" max-width="600" max-height="600">
                        <template v-slot:activator="{ on }">
                        </template>
                        <v-card>
                            <v-card-title>
                            <span class="headline">Find a User</span>
                            </v-card-title>
                            <v-card-text>
                <!-- Add your autocomplete form here -->
                                <v-autocomplete
                                v-model="selectedUser" 
                                :items="allUsernames"
                                item-text="username" 
                                label="Search by Email" 
                                clearable 
                                ></v-autocomplete>
                                <!-- {{ this.users }} -->
                                <!-- {{ userDetails(selectedUser) }} <br> -->
                                <v-card-text v-if="selectedUser">
                                  <b>UID:</b>{{userDetails(selectedUser)[2]}} <br><br>
                                  <b>First Name: </b>{{userDetails(selectedUser)[0]}} <br>
                                  <b>Last Name: </b>{{userDetails(selectedUser)[1]}} <br>
                                  <b>Role: </b>{{userDetails(selectedUser)[3]}} <br>
                                </v-card-text>
                            </v-card-text>
                            <v-card-actions>

                <v-btn color="blue darken-1" text @click="closeModal()">Cancel</v-btn>
                <!-- <v-btn color="red" text @click="removeUser(selectedUser)">Remove</v-btn> -->
              </v-card-actions>
            </v-card>
          </v-dialog>
                    </div>
                </div>
            </div>
        </header>

</template>

<script>
import db from '@/components/firebaseInit';
import { doc, deleteDoc } from "firebase/firestore";

import { gsap } from "gsap";
const auth = getAuth();
const test = auth.currentUser;
// console.log(test)

// import { TweenMax, Power2 } from 'gsap';
// import { Flip } from "gsap/Flip";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Observer } from "gsap/Observer";
// import { Draggable } from "gsap/Draggable";

gsap.registerPlugin();

  export default {
    data () {
      return {
        page: 1,
        itemsPerPage: 5,
        total: 0,
        headers: [
          {
            align: 'start',
            key: 'number',
            sortable: true,
            title: 'UID', key:'uid',
          },
          { title: 'First Name', key: 'firstname' },
          { title: 'Last Name', key: 'lastname' },
          { title: 'Username / Email', key: 'username' },
          { title: 'User Level', key: 'userType' },
          // { title: 'UID', key: 'uid' },
        ],
        users: [
          // {
          //   number: '01418732',
          //   firstname: 'Andy',
          //   lastname: 'Toh',
          //   username: 'andyisfun@gmail.com',
          // },
        ],
        modal : false,
        selectedUser: null,
      }
    },
    created(){
      db.collection('users').get().then
        (querySnapshot=>{
          this.total= querySnapshot.size
          querySnapshot.forEach(doc=>{
            // console.log(doc.data().UID)
            let userType=''
            // console.log(doc.data().userType)
            if(doc.data().userType){
              this.userType='Admin'
            }
            else{
              this.userType='Regular'
            }
            console.log(this.userType)
            // console.log(doc.data().description);
            this.users.push({
              // number: doc.data().number,
              uid: doc.data().UID,
              firstname: doc.data().firstName,
              lastname: doc.data().lastName,
              username: doc.data().email,
              userType: this.userType,
            })
            
            // console.log(this.cards)
          })
        })
    },
    computed: {
      pageCount () {
        return Math.ceil(this.users.length / this.itemsPerPage)
      },
      totalUsers() {
        return this.users.length
      },
      allUsernames() {
        let res = [];
        for (let obj of this.users) {
            res.push(obj.username);
        }
        return res;
      },

    }, 
    methods: {
    animateNumberto(targetNumber) {
        this.total = this.totalUsers;
        gsap.to(this.$data, {
            value: targetNumber,
            duration: 2,
            ease: "power1.out",
            onUpdate: () => {
                this.total= Math.round(this.total)
            },
        })
    },
    userDetails(email){
        let res=[];
        for (let obj of this.users) {
          console.log(obj)
          console.log(obj.username, email);
          if(obj.username==email){
            res.push(obj.firstname);
            res.push(obj.lastname);
            res.push(obj.uid);
            res.push(obj.userType);
          }

        }
        return res;
      },
    openModal(item) {
      // Open the modal
      this.selectedUser = null; // Clear the autocomplete selection
      this.modal = true;
    },
    closeModal() {
      // Close the modal
      this.modal = false;
    },
    },
    mounted() {
        this.animateNumberto(this.total);
    }
}
   
</script>


<style scoped>
.fill-height {
    min-height: 100vh;
}

.gradient-6 {
  color: linear-gradient(19deg, #3EECAC 0%, #EE74E1 100%);
}
</style>

