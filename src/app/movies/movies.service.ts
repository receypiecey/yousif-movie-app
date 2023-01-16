import { Injectable, OnDestroy } from '@angular/core';
import { collection, addDoc,getFirestore, query, where, getDocs } from "firebase/firestore";
import {db} from './../firebase.config'
import { DatabaseService } from '../auth/database.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  constructor(private dbService: DatabaseService) { }

  movieList: any =[]
  genre_ids: any =[];


  searchMovies = async () => {
    const API_URL = "https://api.themoviedb.org/3/trending/movie/day?api_key=d8c0461d84a20885be044a2c3366a599";
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    for (let i = 0; i < Object.keys(data.results).length; i++) {
      this.genre_ids = []
      for (let j = 0; j < data.results[i]["genre_ids"]. length; j++) {
        if (data.results[i]["genre_ids"][j] == 28){
        this.genre_ids[j] = "Action"
        } else if (data.results[i]["genre_ids"][j] == 12){
        this.genre_ids[j] = "Adventure"
        } else if (data.results[i]["genre_ids"][j] == 16){
        this.genre_ids[j] = "Animation"
        } else if (data.results[i]["genre_ids"][j] == 35){
        this.genre_ids[j] = "Comedy"
        } else if (data.results[i]["genre_ids"][j] == 80){
        this.genre_ids[j] = "Crime"
        } else if (data.results[i]["genre_ids"][j] == 99){
        this.genre_ids[j] = "Documentary"
        } else if (data.results[i]["genre_ids"][j] == 18){
        this.genre_ids[j] = "Drama"
        } else if (data.results[i]["genre_ids"][j] == 10751){
        this.genre_ids[j] = "Family"
        } else if (data.results[i]["genre_ids"][j] == 14){
        this.genre_ids[j] = "Fantasy"
        } else if (data.results[i]["genre_ids"][j] == 36){
        this.genre_ids[j] = "History"
        } else if (data.results[i]["genre_ids"][j] == 27){
        this.genre_ids[j] = "Horror"
        } else if (data.results[i]["genre_ids"][j] == 10402){
        this.genre_ids[j] = "Music"
        } else if (data.results[i]["genre_ids"][j] == 9648){
        this.genre_ids[j] = "Mystery"
        } else if (data.results[i]["genre_ids"][j] == 10749){
        this.genre_ids[j] = "Romance"
        } else if (data.results[i]["genre_ids"][j] == 878){
        this.genre_ids[j] = "Science Fiction"
        } else if (data.results[i]["genre_ids"][j] == 10770){
        this.genre_ids[j] = "TV Movie"
        } else if (data.results[i]["genre_ids"][j] == 53){
        this.genre_ids[j] = "Thriller"
        } else if (data.results[i]["genre_ids"][j] == 10752){
        this.genre_ids[j] = "War"
        } else if (data.results[i]["genre_ids"][j] == 37){
        this.genre_ids[j] = "Western"
        }

      }
      let backdropUrl: string;
      if (data.results[i]["backdrop_path"] == null){
        backdropUrl = "https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
      } else{
        backdropUrl= "https://image.tmdb.org/t/p/w500/" + data.results[i]["backdrop_path"];
      }
      this.movieList.push({
        title: data.results[i]["title"],
        overview: data.results[i]["overview"],
        release_date: data.results[i]["release_date"],
        poster_path: "https://image.tmdb.org/t/p/w500/" + data.results[i]["poster_path"],
        backdrop_path: backdropUrl,
        vote_average: data.results[i]["vote_average"],
        vote_count: data.results[i]["vote_count"],
        genre_ids: this.genre_ids,
        id: data.results[i]["id"]
      })
    }
  };

  async findMovie(query: string){
    this.movieList = [];
    let newQuery = query.replace(" ", "+")
    let API_URL ="https://api.themoviedb.org/3/search/movie?api_key=d8c0461d84a20885be044a2c3366a599&query=XXXX"
    // let QUERY_URL = "https://api.themoviedb.org/3/movie/800815?api_key=d8c0461d84a20885be044a2c3366a599&language=en-US";
    API_URL = API_URL.replace("XXXX", newQuery)
    // console.log(QUERY_URL)
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    console.log(data)
    for (let i = 0; i < Object.keys(data.results).length; i++) {
      this.genre_ids = []
      for (let j = 0; j < data.results[i]["genre_ids"]. length; j++) {
        if (data.results[i]["genre_ids"][j] == 28){
        this.genre_ids[j] = "Action"
        } else if (data.results[i]["genre_ids"][j] == 12){
        this.genre_ids[j] = "Adventure"
        } else if (data.results[i]["genre_ids"][j] == 16){
        this.genre_ids[j] = "Animation"
        } else if (data.results[i]["genre_ids"][j] == 35){
        this.genre_ids[j] = "Comedy"
        } else if (data.results[i]["genre_ids"][j] == 80){
        this.genre_ids[j] = "Crime"
        } else if (data.results[i]["genre_ids"][j] == 99){
        this.genre_ids[j] = "Documentary"
        } else if (data.results[i]["genre_ids"][j] == 18){
        this.genre_ids[j] = "Drama"
        } else if (data.results[i]["genre_ids"][j] == 10751){
        this.genre_ids[j] = "Family"
        } else if (data.results[i]["genre_ids"][j] == 14){
        this.genre_ids[j] = "Fantasy"
        } else if (data.results[i]["genre_ids"][j] == 36){
        this.genre_ids[j] = "History"
        } else if (data.results[i]["genre_ids"][j] == 27){
        this.genre_ids[j] = "Horror"
        } else if (data.results[i]["genre_ids"][j] == 10402){
        this.genre_ids[j] = "Music"
        } else if (data.results[i]["genre_ids"][j] == 9648){
        this.genre_ids[j] = "Mystery"
        } else if (data.results[i]["genre_ids"][j] == 10749){
        this.genre_ids[j] = "Romance"
        } else if (data.results[i]["genre_ids"][j] == 878){
        this.genre_ids[j] = "Science Fiction"
        } else if (data.results[i]["genre_ids"][j] == 10770){
        this.genre_ids[j] = "TV Movie"
        } else if (data.results[i]["genre_ids"][j] == 53){
        this.genre_ids[j] = "Thriller"
        } else if (data.results[i]["genre_ids"][j] == 10752){
        this.genre_ids[j] = "War"
        } else if (data.results[i]["genre_ids"][j] == 37){
        this.genre_ids[j] = "Western"
        }
      }
        let backdropUrl: string;
        if (data.results[i]["backdrop_path"] == null){
          backdropUrl = "https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
        } else{
          backdropUrl= "https://image.tmdb.org/t/p/w500/" + data.results[i]["backdrop_path"];
      }
      this.movieList.push({
        title: data.results[i]["title"],
        overview: data.results[i]["overview"],
        release_date: data.results[i]["release_date"],
        backdrop_path: backdropUrl,
        poster_path: "https://image.tmdb.org/t/p/w500/" + data.results[i]["poster_path"],
        vote_average: data.results[i]["vote_average"],
        vote_count: data.results[i]["vote_count"],
        genre_ids: this.genre_ids,
        id: data.results[i]["id"]
      })
    }
  }
  favoritesList: any= [];
  async getFavorites(favList: any){
    let API_URL = "https://api.themoviedb.org/3/movie/XXXX?api_key=d8c0461d84a20885be044a2c3366a599&language=en-US"
    let newURL: string;
    for (let i = 0; i < favList.length; i++){
      newURL = API_URL.replace("XXXX", favList[i]);
      const response = await fetch(`${newURL}`);
      const data = await response.json();
      // console.log(data["title"])
      this.favoritesList.push({
        title: data["title"],
        overview: data["overview"],
        release_date: data["release_date"],
        backdrop_path: "https://image.tmdb.org/t/p/w500/" + data["poster_path"],
        poster_path: "https://image.tmdb.org/t/p/w500/" + data["poster_path"],
        vote_average: data["vote_average"],
        vote_count: data["vote_count"],
        genre_ids: data["genre"],
        id: data["id"]
      })
      // console.log("LIST " + i + " " + this.favoritesList)
    }
    console.log(this.favoritesList)
  }

  myFavorites(favList: any){
    this.getFavorites(favList)
    return this.favoritesList
  }
  searchMoviesResults(query: string){
    if (query.length == 0){
      this.movieList = []
      return this.getMovies()
    }
    this.findMovie(query)
    return this.movieList
  }
  getMovies(){
    this.searchMovies()
    return this.movieList
  }
  destroy(){
    this.movieList = []
  }
  async grabMovieId(){
    // let str:any = '';
    // if (localStorage.getItem("userName") != null){
    //   str =localStorage.getItem("userName");
    // };
    // console.log()
  }

}
