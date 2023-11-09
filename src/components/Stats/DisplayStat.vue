<template >
    <section class = "bg-stats container-fluid">
        <h2 class="text-pink-lighten-5 fw-bold text-center">Pharma-Save's Statistics</h2>
    <!-- None  <576px, sm  ≥576px, md  ≥768px, lg  ≥992px, xl  ≥1200px, xxl  ≥1400px -->
        <div class = "container text-center mt-5">
        <h1 id = "displayDate">Total Donation now as of {{ getDate }}</h1>
            <h2 class="animated-text"> {{this.donatedValue}} </h2> <!--PUT total donation here-->
        </div>
        <div class='row justify-content-center'>
            <div class='col-md-6 col-lg-3 statTop text-center mx-3 mt-5'>
                <div class = "mt-3 ">
                    <h2>Total number of users Donated:</h2>
                    <h1 class = "statTopContainer">{{this.usersList.length}}</h1> <!--PUT TOTAL number here-->
                </div>
            </div> 
            <div class='col-md-6 col-lg-3 statTop text-center mx-3 mt-5'>
                <div class = "mt-3 ">
                    <h2>Total cost saved:</h2>
                    <h1 class = "statTopContainer mt-4">$   {{this.donatedValue}}</h1> <!--PUT TOTAL cost here-->
                </div>
            </div>   
  
        </div> 
  
  
    
  </section>
  </template>
  
  <script>
  
  // chart 
  import Chart from 'chart.js/auto'
  import db from '@/components/firebaseInit';
  const displayDate= document.getElementById("displayDate");
  console.log(displayDate);
  
  
  
  export default {
    data: () => ({
        inventoryValue: 0,
        donatedValue: 0,
        usersList: [],
        displayDate: '',
      }),
    created(){
        db.collection('medicine').get().then //getting Value of Inventory
        (querySnapshot=>{
          querySnapshot.forEach(doc=>{
            // console.log(doc.data().description);
            this.inventoryValueValue+=(doc.data().cost*doc.data().quantity)
            // console.log(this.cards)
          })
        }) //end of getting Value of Inventory
  
        db.collection('stats').get().then //getting Value of donated
        (querySnapshot=>{
          querySnapshot.forEach(doc=>{
            // console.log(doc.data().description);
            this.donatedValue=doc.data().totalDonated
  
            // console.log(this.cards)
          })
        }) //end of getting Value of donated
  
        db.collection('users').get().then //getting users
        (querySnapshot=>{
          querySnapshot.forEach(doc=>{
            // console.log(doc.data().description);
            this.usersList.push(
              {
                uid:doc.data().uid,
              }
            )
            // console.log(this.cards)
          })
        }) //end of getting users
  
        setInterval(this.getDates, 1000);
  
    },
    methods:{
      getDates(){
        const date = new Date();
        const dateTime = date.toString().substring(0,25);
        this.displayDate= dateTime;
      }
    },
    computed: {
        getDate(){
            return this.displayDate;
        }
    },
    mounted(){
        console.log("Component mounted")
  
        // const data = [
        // { year: 2010, count: 10 },
        // { year: 2011, count: 20 },
        // { year: 2012, count: 15 },
        // { year: 2013, count: 25 },
        // { year: 2014, count: 22 },
        // { year: 2015, count: 30 },
        // { year: 2016, count: 28 },
        // ];
        // new Chart(
        //     document.getElementById('acquisitions'), {
        //     type: 'bar',
        //     data: {
        //         labels: data.map(row => row.year), // JSON DATA LOOP
        //         datasets: [
        //             {
        //                 label: 'Users Donated',
        //                 data: data.map(row => row.count),
        //                 backgroundColor: '#E57373', 
        //                 hoverBackgroundColor: "rgba(335,285,90,0.8)",
        //                 hoverBorderColor: "orange",
        //             }
        //         ]
        //     },
        //     options: { // This should be part of the main configuration object
        //         plugins: {  // 'legend' now within object 'plugins {}'
        //         legend: {
        //             labels: {
        //             color: "white",  
        //             font: {
        //                 size: 20 
        //             }
        //             }
        //         }
        //         },
        //         scales: {
        //             x: {
        //                 grid: {
        //                     display: true, // Show x-axis grid lines
        //                     color: 'white' // Set grid line color to black
                            
        //                 },
        //                 ticks: {
        //                 color: 'white' // Change the x-axis label color
        //                 }
        //             },
        //             y: {
        //                 grid: {
        //                     display: true, // Show y-axis grid lines
        //                     color: 'white' // Set grid line color to black
        //                 },
        //                 ticks: {
        //                 color: 'white' // Change the x-axis label color
        //                 }
        //             }
        //         },
        //     responsive: true,
        //     maintainAspectRatio: false,
        //     }
        // });
  
        // new Chart(document.getElementById('doughnutChart'), {
        //     type: 'doughnut',
        //     data: {
        //         labels: ['User1', 'User2', 'User3'],
        //         datasets: [
        //         {
        //             label: 'My First Dataset',
        //             data: [300, 50, 100],
        //             backgroundColor: ['#E57373', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        //             hoverOffset: 4,
        //         },
        //         ],
        //     },
        //     options: {
        //         plugins: {
        //         legend: {
        //             labels: {
        //             color: 'white', // Set label color to white
        //             },
        //         },
        //         },
        //     },
        //     });
    }
  }
  
  // TO DO: 
  // make border responsive when shrinking page
  </script>
  
  <style scoped>
  
  
  .statTop{
  background-color: #E57373;
  color:white;
  border: 1px solid #E53935;
  border-radius: 5px;
  width:270px;
  max-width: 100%;
  height: 150px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  font-family: 'Times New Roman', Times, serif;
  
  }
  .statTop h2 {
  font-size: 1.5rem; 
  }
  .statTop:hover {
  transform: scale(1.02);
  }
  
  .statTopContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  }
  
  /* .animated-text {
  animation: textAnimation 2s infinite alternate;
  } */
  
  /* @keyframes textAnimation {
  0% {
    font-size: 25px; 
  }
  100% {
    font-size: 35px; 
  }
  } */
  
  .container {
    background-size: 100%;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.968);
    text-align: center;
    min-height: 200px;
    margin-bottom: 5px;
    background: linear-gradient(to bottom,rgba(78, 175, 169, 0.7) 0%, rgba(113, 128, 186, 0.8) 100%);
  }
  
  .container h1, h2{
    color: #3E2723;
  }
  
  .containerStore{
    padding-left: 80px;
    padding-right: 90px
  }
  
  </style>