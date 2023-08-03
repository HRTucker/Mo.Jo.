var tmdb_api = {};

tmdb_api.common = {
    api_key: "api_key=e833f3c47fcf6bf2535dc3d54011b8fe",
    image_domain: "https://image.tmdb.org/t/p/",
    entry_domain: "https://api.themoviedb.org/3/",

    fetchData: async function(url) {
        //var url = this.entry_domain + `search/multi?api_key=${this.dbKey}&query=${encodeURIComponent(query)}&include_adult=false&page=1&append_to_response=page=2`;
        
        const response = await fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(inData => {
                return JSON.parse(inData);
            })
            .catch(error => {
                console.error(`Error url: ${url} `);
                console.error('Error fetching data from database:', error);
            });
        const json = await response;
        if(json.results){
            console.log(json.results)
            return json.results;
        }else{
            return json; 
        }   
    },    
}

tmdb_api.entry = {

}

tmdb_api.film = {
    getTrending: function(){
        return (tmdb_api.common.fetchData(`${tmdb_api.common.entry_domain}trending/movie/week?${tmdb_api.common.api_key}`));
    },

    getDetails: function(id, type){
        return (tmdb_api.common.fetchData(`${tmdb_api.common.entry_domain}${type}/${id}?${tmdb_api.common.api_key}&language=en-US`));
    },

    getFullDetails: function(id, type){
        return (tmdb_api.common.fetchData(`${tmdb_api.common.entry_domain}${type}/${id}?${tmdb_api.common.api_key}&language=en-US&append_to_response=credits`));
    },

    getCredits: function(id, type){
        return (tmdb_api.common.fetchData(`${tmdb_api.common.entry_domain}${type}/${id}/credits?${tmdb_api.common.api_key}&language=en-US`));
    },

    getImages: function(id, type){
        return (tmdb_api.common.fetchData(`${tmdb_api.common.entry_domain}${type}/${id}/images?${tmdb_api.common.api_key}&language=en-US`))
    },

    getGenre: function(genreId, type){
        return tmdb_api.common.fetchData(`${tmdb_api.common.entry_domain}/discover/${type}?${tmdb_api.common.api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}&with_watch_monetization_types=flatrate`);
    },

    getNowShowing: function(type){
        return tmdb_api.common.fetchData(`${tmdb_api.common.entry_domain}${type}/now_playing?${tmdb_api.common.api_key}`);
    },

    getUpcoming: function(){
        
    }
}

tmdb_api.series = {
    getDetails: function(){return "Series here"}
}

export default tmdb_api;



tmdb_api.film.genres = [
    { "id": 28, "name": "Action" }, 
    { "id": 12, "name": "Adventure" }, 
    { "id": 16, "name": "Animation" }, 
    { "id": 35, "name": "Comedy" }, 
    { "id": 80, "name": "Crime" }, 
    { "id": 99, "name": "Documentary" }, 
    { "id": 18, "name": "Drama" }, 
    { "id": 10751, "name": "Family" }, 
    { "id": 14, "name": "Fantasy" }, 
    { "id": 36, "name": "History" }, 
    { "id": 27, "name": "Horror" }, 
    { "id": 10402, "name": "Music" }, 
    { "id": 9648, "name": "Mystery" }, 
    { "id": 10749, "name": "Romance" }, 
    { "id": 878, "name": "Science Fiction" }, 
    { "id": 10770, "name": "TV Movie" }, 
    { "id": 53, "name": "Thriller" }, 
    { "id": 10752, "name": "War" }, 
    { "id": 37, "name": "Western" }];

tmdb_api.series.genres = [
    {"id": 10759, "name": "Action & Adventure"},
    {"id": 16, "name": "Animation"},
    {
        "id": 35,
        "name": "Komödie"
    },
    {
        "id": 80,
        "name": "Krimi"
    },
    {
        "id": 99,
        "name": "Dokumentarfilm"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Familie"
    },
    {
        "id": 10762,
        "name": "Kids"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10763,
        "name": "News"
    },
    {
        "id": 10764,
        "name": "Reality"
    },
    {
        "id": 10765,
        "name": "Sci-Fi & Fantasy"
    },
    {
        "id": 10766,
        "name": "Soap"
    },
    {
        "id": 10767,
        "name": "Talk"
    },
    {
        "id": 10768,
        "name": "War & Politics"
    },
    {
        "id": 37,
        "name": "Western"
    }
]