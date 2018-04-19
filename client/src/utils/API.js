import axios from "axios";

export default {
  //this currently grabs all profiles, we will need to pass info but for now I just want a render
  retrieveProfiles: function() {
    return axios.get('/api/allprofiles');
  },

  getUser: function(fbID) {
    return axios.get(`/api/userprofile/${fbID}`);
  },

  getMatches: function(obj) {
    return axios.post('/api/matches', {
      data: obj
    });
  },

  getAllSchools: function() {
    return axios.get('api/allschools');
  },

  createUser: function(user) {
    return axios.post('api/createuser', {
      data: user
    });
  },

  updateUser: function(user) {
    return axios.put('api/updateuser', {
      data: user
    });
  },
};
