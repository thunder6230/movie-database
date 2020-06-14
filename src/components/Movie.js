  
import React, { Component } from "react"
import Rating from "./Rating"
import Modal from "react-modal"
import RatingModal from "./RatingModal"
import Trailer from "./Trailer"
import Gallery from "./Gallery"

export default class Movie extends Component{
  constructor(props){
    super(props)
    this.state = {
        modalIsOpen: false,
        trailerIsOpen: false,
        galleryIsOpen: false,
        movies : props.data
    }
    
  }
  
  render(){
    console.log(this.state.movies)
    const {poster_path, title, release_date, vote_average, original_language, overview, genre_ids} = this.state.movies
    const year = release_date.slice(0,4)
    const genreName = genre_ids.map(
      (item) => {
        
        if (item === 80){return item ='Crime'}
        else if(item === 878){return item = 'Science Fiction'}
        else if(item === 28){return item =  'Action'}
        else if(item === 53){return item = 'Thriller'}
        else if(item === 27){return item = 'Horror'}
        else if(item === 18){return item = 'Drama'}
        else if(item === 35){return item = 'Comedy'}
        else if(item === 12){return item = 'Adventure'}
        else if(item === 9648){return item = 'Mystery'}
        else if(item === 16){return item = 'Animation'}
        else if(item === 10751){return item = 'Family'}
        else if(item === 14){return item = 'Fantasy'}
        else if(item === 10749){return item = 'Romance'}
        return item
      })
    return(
      <div className="movie-element">
        <img 
          src={`https://image.tmdb.org/t/p/w220_and_h330_face/${poster_path}`}
          alt={title + "poster"}
          onClick={() => this.setState({modalIsOpen: true})}> 
        </img>
        <div className="content">
          <Rating rating={vote_average * 10} />
          <h4 className="movie-card-title">{title}</h4>
          <p className="movie-card-date">{release_date}</p>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={() => this.setState({modalIsOpen : false})}
          className="Modal"
          overlayClassName="Overlay"
        >
          <header className="modal-header">
          <p onClick={() => this.setState({modalIsOpen : false})}>x</p>
          </header>
          <main className="main-div">
            <div className="image-div">
              <img
              src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${poster_path}`}
              alt={title + "poster"}
              />
            </div>
            <div className="content-div">
              <div className="title-element">
                <h1>{title}, <span>{`(${year})`}</span></h1>
                <ul className="title-list">
                  <li style={{listStyleType:"none"}}>{release_date}{` (${original_language.toUpperCase()})`}</li>
                  <li>{genreName.join(', ')}</li>
                </ul> 
              </div>
              <div className="function-element">
                <RatingModal rating={vote_average * 10} />
                <p className="function-text-score">User Score</p>
                <p className="function-text-gallery" onClick={() => this.setState({galleryIsOpen : true })}>Photo Gallery</p>
                <p className="function-text-trailer" onClick={() => this.setState({trailerIsOpen : true})}>Play Trailer</p>

              </div>
              <div className="description-element">
                <h3>Overview</h3>
                <p>{overview}</p>
              </div>
            </div>
          </main>
        </Modal>
        <Modal
          isOpen={this.state.trailerIsOpen}
          onRequestClose={() => this.setState({trailerIsOpen : true})}
          className="Modal Gallery"
          overlayClassName="Overlay black"
        >
          <header className="modal-header">
            <p onClick={() => this.setState({trailerIsOpen : false})}>x</p>
          </header>
          <Trailer data={this.state.movies} />
        </Modal>
        {this.state.galleryIsOpen &&(
          <Gallery
          data={this.state.movies}
          galleryIsOpen={this.state.galleryIsOpen}
        />
        )}
        
      
      
      
  </div>
    
    ) 
}
}
