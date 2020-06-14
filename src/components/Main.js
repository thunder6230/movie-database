import React, {Component} from "react"
import Movie from "./Movie"


export default class Main extends Component {
    constructor(){
        super()
        this.state = {
            
            movieName: "",
            movies:[],
            error: "",
            showTrending: true,
            popular: true,
            count: 2,
            api_key: 'b0aa4893b30020c4cb9176b7a91cc441'
            
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleClickLoadMore = this.handleClickLoadMore.bind(this)
        
    }
    
    handleChange(event){
        this.setState({
            movieName: event.target.value
        })
    }
   async componentDidMount(){
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${this.state.api_key}`)
    if (response.status !== 200){
        this.SetState({ error: "Something went wrong ... check your connection and try again!" })
    } else{
        const json = await response.json()

        this.setState({movies: json.results})
    }
   }
    async handleClick(event){
        
        event.preventDefault()
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${this.state.movieName}&language=en-US&page=1&include_adult=false&api_key=${this.state.api_key}`)
        if (response.status !== 200){
            this.SetState({ error: "The Title can not be found. Check your Spelling!" })
        } else{
            const json = await response.json()
            this.setState({movies: json.results})
        }
        
        this.setState({
            showTrending: false,
            popular: false,
            count: 1
        })
    }
    async handleClickLoadMore(){
        console.log(this.state.popular)
        this.setState((prevState) => {
            return{count: prevState.count + 1}
        })
        console.log(this.state.count)
        if(this.state.popular === true){
            
            const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${this.state.api_key}&page=${this.state.count}`
            
            const response = await fetch (url)
            if (response.status !== 200){
                this.SetState({ error: "Try again" })
            } else{
                const json = await response.json()
                //this.setState({movies: json.results})
                console.log(json.results)
                this.setState((prevState) => {
                     return{ movies : prevState.movies.concat(json.results) }
                })
            }
        }
    }     
        
       

   
    render(){
       
        const movieResult = this.state.movies
        console.log(this.state.api_key)
        return(
            <div className="container">
                <form>
                  <label>
                    <input
                      className="form-input"
                      type="text"
                      name="movieName"
                      value={this.state.movieName}
                      onChange={this.handleChange}
                      placeholder="Type in a Title ..." 
                    />
                    <button
                      type="submit"
                      onClick={this.handleClick}
                      className="form-input-btn"
                    >
                    Search
                    </button>
                  </label><br />
                </form>
                {this.state.showTrending ? <div><h1 className="title">Populars of the Week</h1></div> : null  }
                
                <div className="movie-list">
                    
                    {this.state.error}
                    {movieResult.filter(item =>item.poster_path).map((item) => 
                        <Movie
                          key={item.id}
                          data={item}
                        />
                    )}<br />
                    {this.state.popular ? <button className="loadMore" onClick={this.handleClickLoadMore}>Load More Movies</button> : null}
                    
                </div>
            </div>
        )
    }
}