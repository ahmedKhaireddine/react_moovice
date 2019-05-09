import config from '../config';
import moment from 'moment';

class Api {

    getPopularMovies(){
        const url=`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${config.API_KEY}`;
        return  fetch(url)
                .then(res => res.json())
                .then(data => data.results);
    }

    getMovie(id){
        const url = `https://api.themoviedb.org/3/movie/`+ id +`?api_key=${config.API_KEY}`;
        return  fetch(url)
                .then(res => res.json())
                .then(data => data);
    }

    getLatestMovies(){
        const TODAY = moment().format('YYYY-MM-DD');
        const NEXT_WEEK= moment().add(7, 'days').format('YYYY-MM-DD'); 
        let url =`http://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${TODAY}&primary_release_date.lte=${NEXT_WEEK}&api_key=${config.API_KEY}`;
        return  fetch(url)
                .then(res => res.json())
                .then(data => data.results);
    }
}
export default new Api();