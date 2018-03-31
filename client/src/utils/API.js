import axios from "axios";
//get rid of this on deployment
// import keys from "../keys.js"

// const authKey = keys.nyt;

const queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=46dbd7b690f34bad8709b270648f8dea";
  


const createUrl = (query) => {
    let search = queryURLBase;

    search = `${search}&q=${query.query}`

    if (query.startDate) {
        search = search + "&begin_date=" + query.startDate + "0101";
    }
    if (query.endDate) {
        search = search + "&end_date=" + query.endDate + "0101";
    }
    return search;
}


export default {
    searchNyt: function(query) {
        const searchURL = createUrl(query)
        return axios.get(searchURL);
    },
    retrieveAll: function(query) {
        return axios.get('api/articles/')
    },
    create: function(query) {
        return axios({
            method: "post",
            url: '/api/save/', 
            dataType: "JSON",
            data: query
        })
    },
    deleteArticle: function(query) {
        return axios.delete(`api/delete/${query}`)
    },
    searchNytServer: function(query) {
        // const searchURL = createUrl(query)
        return axios({
            method: "post",
            url: '/api/search/', 
            dataType: "JSON",
            data: query
        })
    },
};
