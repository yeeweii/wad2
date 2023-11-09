<template>

    <header class="faq">
    <div class="container px-4 px-lg-5 h-100">
        <div class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
            <div class="col-lg-8 align-self-end">
                <h1 class="text-white font-weight-bold"><VueWriter :array="['FREQUENTLY ASKED QUESTIONS (FAQ)']"/></h1>
              
            </div>
            <div class="col-lg-8 align-self-baseline">
                <p class="text-white-75 mb-5">
                  <div> 
                  <v-expansion-panels color="secondary">
                    <v-expansion-panel v-for="item in faqItems">
                        <v-expansion-panel-title
                          style="font-weight: bold;background-color: #73869e" color="primary">  <!--background-color: #C6E0FF-->
                          {{ item.question }}
                        </v-expansion-panel-title>
                        <v-expansion-panel-text 
                        style="text-align: left;">
                          {{ item.answer }}
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>
                </p>
               
            </div>
        </div>
    </div>
    </header>
  </template>


<script>
import VueWriter from "vue-writer"
export default {
  components:{VueWriter},
  data() {
    return {
      faqItems: [
        {
          question: "What kind of medicine can I donate?",
          answer:
            "You can donate unused over the counter (OTC) medicine such as Panadol pills or Paracetamol syrup that is not expired.",
        },
        {
          question: "What is the donation process?",
          answer:
            "Donation process begins with scanning of a QR code, filling details in a form and taking a picture of the medicine expiry date before dropping it off at a donation centre. Our experts will thoroughly screen through the medicine before giving it up for donation.",
        },
        {
          question: "How to be eligible to receive donations?",
          answer: "To be eligible, sign up using the form provided.",
        },
        {
          question: "Is the medicine safe to use?",
          answer:
            "Medicine is thoroughly screened by our professionals to ensure that they are still in usable condition.",
        },
        {
          question: "Why should I donate?",
          answer:
            "Donating these unused medicines ensures that others who need it more are able to receive it in times of need. Furthermore, less medicine will be wasted.",
        },

        {
          question:"What are the benefits of donating medicine?",
          answer:"Recycled medicine helps reduce expenditure on medication and promotes pharmaceutical sustainability."
        },

        {
          question:"Why was this initiative started?",
          answer:"The average waste of discarded medicine waste in a household was $663. As part of this sustainability efforts, this initiative was launch to reduce medical wastage."
        },

        {
          question:"Where can I find the nearest donation center?",
          answer:"You can find the nearest donation center through 'Locate Us' on the home page"
        },

        {
          question:"Where can I collect medicine from this service?",
          answer:"Medicine is collected at Pharma-Save's central repository"
        },

        {
          question:"How long will the collected medicine last?",
          answer:"Medicine should be used promptly, especially those nearing expiry dates"
        },
      ],
    };
  },
};
</script>
