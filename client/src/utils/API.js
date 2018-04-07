import axios from "axios";

export default {
  //this currently grabs all profiles, we will need to pass info but for now I just want a render
  retrieveProiles: function() {
    return axios.get('/api/allprofiles')
  }
};
