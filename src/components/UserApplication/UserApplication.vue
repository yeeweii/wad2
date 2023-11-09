<template>
    <section class="bg-inventory">
      <v-container :fluid="true">
      <v-row class="text-center">
        <v-col cols="12" class=" pb-5">
          <h2 class="text-pink-lighten-5 fw-bold">Pharma-Save's Medication Inventory</h2>
          <v-btn id="menu-activator" color="primary">Medication Categories</v-btn>
          <h5 class="text-pink-lighten-5 fw-bold">Now showing: {{ this.selectedCategory }}</h5>
          <v-menu activator="#menu-activator">
            <v-list>
              <v-list-item v-for="(cat, index) in categories" :key="index"
              @click="selectCategory(cat.title)">
                <v-list-item>{{ cat.title }}</v-list-item>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
      </v-container>
      <v-sheet class="mx-auto mt-3" max-width="1200px"> 
      <v-container fluid>
        <v-row class="row row-1 row-sm-2 row-md-3 g-4 align-items-center justify-content-center">
          <v-col
            v-for = "(card,index) in chosenCards"
            cols = "12"
            sm="12"
            md = "4"
            lg = "4"
            >
            <v-card class="mx-auto mt-3 scroll"  @click="zoomInCard(card)"
            ref="cards" max-width="1200" max-height="400" min-height="400">
                    <!--image-->
                    <v-img 
                    :src = "card.src"
                    aspect-ratio="1"
                    class="align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    max-height="200px"
                    cover
                    
                    >   
                        <!-- title within image-->
                        <v-card-title
                        class="text-white card-title"
                        >
                        <div v-if = "card.title.length > 37" class = "textAnimate">{{ card.title }}</div> <!--v-if = "card.title.length > 37" class = "textAnimate"-->
                        <div v-else >{{ card.title }} </div>

                      </v-card-title>
                    </v-img>
                    <div>
                        <!-- text-->
                        <v-card-text
                        v-for="n of card.categories" 
                        :key="n"
                        class="py-1 my-1">
                        {{ n }} 
                        <!-- {{ card.text }} -->
                        </v-card-text>
                        <!--button-->
                        <div class = "text-end " style = "">
                            <v-text-field
                            style = "width:150px; margin-left:70px"
                            :color="buttonColor"
                            :max = "card.totalQuantity"
                            :min = 0
                            type = "number"
                            elevation="4"
                            v-model = "card.itemQuantity"
                            variant="outlined"
                            class="mb-1 mr-2"
                            :error-messages = "card.errorMessage"
                        ></v-text-field>
                        <v-btn
                            size="small"
                            variant="text"
                            elevation="4"
                            @click="addToCart(card, index)"
                            class="mb-2 mr-2"
                            :disabled="card.isSelected"
                        >{{card.buttonText}}</v-btn>
                        </div>
                    </div>
                </v-card>
    </v-col>
      </v-row>
      </v-container>
      </v-sheet>
    <div class="row justify-content-center">
      <div class="col-1">
      <v-btn v-if = "cartStore.length == 0" disabled @click = submitFile() class = "submitButton mt-3"> Submit</v-btn>
      <v-btn v-else-if="cartStore.length >=1" @click = submitFile() class = "submitButton mt-3"> Submit</v-btn>
    </div>
    </div>
      <div class = "alertBox">
        <v-card
        v-if = "submittedItem"
        title = "Receipt sent"
        elevation = '5'
        color = "black"
        >
        <template v-slot:append>
          <v-btn icon="$close" variant="text" @click="closeItem"></v-btn>
        </template>
        <v-divider></v-divider>

        <div class="text-center">
          <v-icon
            class="mb-1"
            color="success"
            icon="mdi-check-circle-outline"
            size="128"
          ></v-icon>
        <div class="text-h5 font-weight-bold">This receipt was sent</div>

        <v-divider></v-divider>
        </div>

        <div class="text-center">
          <h2>Pharma-Save</h2>
          Please collect your items in <strong>{{collectionDay}}</strong> day(s)<br/><br/>
        </div>
        <div v-html = "submittedText" class = "ml-5"></div>
        </v-card>
      </div>
    </section>
  </template>
  
  <script>
import db from '@/components/firebaseInit';
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ref, onMounted } from 'vue'

gsap.registerPlugin(Flip);

    export default {
      

      data: () => ({
        selectedCategory: '',
        cartStore: [],
        submittedItem: false,
        submittedText: '',
        collectionDay: 0,
        selectedCategory: 'Everything',
        buttonColor: "",
        categories: [
          { title: 'Everything'},
          { title: 'Cough'},
          { title: 'Cold' },
          { title: 'Allergy' },
          { title: 'Fever' },
          { title: 'Pain Relief' },
          { title: 'Gastrointestinal Care'},
          { title: 'Skin'},
        ],
        cards: []
      }),
      created(){
        db.collection('medicine').get().then
        (querySnapshot=>{
          querySnapshot.forEach(doc=>{
            // console.log(doc.data().description);
            this.cards.push(
              {
                title:doc.data().name,
                brand:doc.data().brand,
                cost:doc.data().cost,
                src:doc.data().imageURL,
                categories:doc.data().description,
                itemQuantity:0,
                totalQuantity:doc.data().quantity,
                isSelected: false,
                buttonText: 'Add to Cart',
              }
            )
            // console.log(this.cards)
          })
        })
      },
        methods: {
          // METHOD 1
          // category filtering 
          selectCategory(category) {
          console.log('Selected category:', category);
          this.selectedCategory = category;
          },


          // METHOD 2
          // adding to cart function
          addToCart(card,index){
            this.buttonColor = this.buttonColor === 'primary' ? 'undefined' : 'primary';
            let quantity = card.itemQuantity; // quantity selected by USER
            if (card.buttonText == "Remove from cart"){ // to remove from the temporary cart if want to remove
              let itemCartIndex = this.cartStore.findIndex((cartItem) => cartItem.card.title === card.title);
              if (itemCartIndex != -1){
                this.cartStore.splice(itemCartIndex,1);
                card.buttonText= 'Add to Cart';
                card.itemQuantity = 0;
                this.card.errorMessage = '';
                console.log("removing: ")
                console.log( this.cartStore)
                
              }
            }
            console.log(quantity)
            if (quantity == 0){
              card.errorMessage = "No quantity selected";
            }
            else if (quantity > 3){
              card.errorMessage = "You cannot take more than 3!"; //  A User cannot take too much
            }
            else if (quantity > card.totalQuantity){
              if (card.totalQuantity == 0){
                card.errorMessage = "No more " + card.title + " available"
              }
              else{
              card.errorMessage = "Only up to " + card.totalQuantity + " is available.";
              }
            }
            else if (quantity > 0 && quantity <= 3){
                // card.quantity -= quantity; // deduct the quantity from firebase --> WRONG only deduct when user submit
                // ***card.itemQuantity = 0 // set v-model quantity back to 0
                this.cartStore.push({ card, quantity });
                card.buttonText = "Remove from cart";
                console.log("adding")
                console.log(this.cartStore)
                card.errorMessage = "";
            }
          },

          // METHOD 3
          // submitting function
          submitFile(){
            // display the alert message 
            this.submittedItem = true;
            
            // generate random day to collect the medicine
            let days = Math.floor(Math.random() * 5) + 1;
            this.collectionDay = days; 

            // remove quantity from cards
            for (let i = 0; i<this.cartStore.length; i ++){
              let itemIndex = this.cards.findIndex((cartItem) => cartItem.title === this.cartStore[i].card.title);{
                if (itemIndex !== -1){
                this.cards[itemIndex].quantity -= this.cartStore[i].quantity;
                }
              }
            }

            // this.submittedText += `Please collect your items in <strong>${days}</strong> days<br/><br/>`
            this.submittedText += `<ul>`
            // add items into alert box
            for (let i = 0; i<this.cartStore.length; i ++){
              this.submittedText += `<li>Item: ${this.cartStore[i].card.title} --------- Quantity: ${this.cartStore[i].quantity} </li>`
            }
            this.submittedText += `</ul></div>`
            // clear the cart
            this.cartStore = [];
            console.log(this.cards)
          },

          // METHOD 4
          // close function
          closeItem(){
            this.submittedItem = false;
             for (let i=0 ;i < this.cards.length; i ++){
              this.cards[i].buttonText = "Add to Cart";
            }
          }
        },
        async zommInCards(card) {
          const index = this.cards.value.indexOf(card);
          if (index !== -1) {
            const cardElement = this.cards.value[index];
            const flipConfig = {
              absolute: true,
              from: cardElement,
              to: cardElement,
              duration: 2,
            }
            gsap.to(flipConfig);
            gsap.set(cardElement, { clearProps: 'all' });
          };
        },
      
       
       computed: {
        // computed for filtering function
        chosenCards(){
          let filtered_cards=[];
        console.log(this.selectedCategory)
        
        if (this.selectedCategory == 'Everything') {
          return this.cards
        }
        else {
          for(let obj of this.cards){
            console.log(obj)
            console.log(obj.quantity, this.selectedCategory)
            if (obj.categories.includes(this.selectedCategory)){
              console.log(obj.description, this.selectedCategory)
              filtered_cards.push(obj)
              }
            }
          return filtered_cards
        }
        }
       },

       mounted() {
        gsap.registerPlugin(Flip)
        const cards = ref([]);

    }
  }
  </script>

<style scoped>
.card-title {
    position: absolute;
    bottom: 0;
    left: 0;
    width:100%;
    padding: 3px;
    background-color: rgba(7, 5, 5, 0.5);
    color: white;
    font-weight: bold;

}

.scroll {
  max-height: 2000px; 
  overflow-y: auto;
}

.alertBox{
  width: 500px;
  position: fixed;
  z-index:1;
  left:50%;
  top:50%;
  transform: translate(-50%, -50%);
}

.buttonContainer{
  position: relative;
  left:65%;
  top:20px;
}

.submitButton{
    position: relative;

}

.textAnimate{
  animation: textAnimation 3s infinite;
}

@keyframes textAnimation {
  0% {
    transform: translateX(5%);
  }
  100% {
    transform: translateX(-18%);
  }

}
</style>
