import { defineStore } from 'pinia';
import axios from 'axios';

export const useNewsStore = defineStore('news', {
  state: () => ({
    newsList: [],
  }),
  actions: {
    async getNewsData() {
      const url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=hEbM8ohHnMYWiWhUn9wc7sfGsHWRgTuO&q={pharmaceutical,sustainability}';
      try { 
        
       const response = await axios.get(url);
   
        console.log(response);
        if (response.status == 200) {
            console.log(response.data)
            this.storeResponseinState(response.data.response.docs)
            return response;
        }

        return false
    
    } 
    catch (error) {
        console.log("Get Error: " + error);
        return;
    }
    },
    storeResponseinState(responseDocs) {
        this.newsList = responseDocs;
      },
  },
  
  getters: {
    getRequiredInfo(state) {
        let res = [];
        for (let obj of state.newsList) {
          let dict = {};
          if (obj.multimedia && obj.multimedia.length > 0) {
            for (let media of obj.multimedia) {
              if (media.url != null && media.width > 700) {
                dict['src'] = "https://static01.nyt.com/" + media.url;
              }
            }
          //   dict['src'] = "https://static01.nyt.com/" + obj.multimedia[0].url;
          // } else {
          //   // Handle the case when multimedia is not defined or empty
          //   dict['src'] = 'fallback_url.jpg'; // Provide a fallback URL
          // }
          dict['title'] = obj.headline.main;
          dict['link'] = obj.web_url;
          res.push(dict);
        }
      }
      return res;
  },
},
});
