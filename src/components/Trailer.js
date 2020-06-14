import React, {Component} from 'react'


//AIzaSyAiO4BJRnAh8wCvhZB4GL8inemYHTKq8yk
export default class Trailer extends Component{
    constructor(props){
        super(props)
        this.state={
            title: props.data.title,
            trailerSrc: "",
            api_key: 'AIzaSyDlQxTH0XNx6DmMr5Wy5_amd6bNXZ2SaLM'

        }
    }
    
    componentDidMount = async () => {
        const titleSearch = this.state.title + " official trailer"
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${titleSearch.replace(/\s/g, '')}&type=video&key=${this.state.api_key}`
       console.log(url)
       const response = await fetch(url)
       if (response.status !== 200){
           console.log(response)
    } else{
        const json = await response.json()
        const trailer = json.items[0].id.videoId
        
        this.setState({trailerSrc: `https://www.youtube.com/embed/${trailer}?enablejsapi=1`})
        console.log(this.state.trailerSrc)
     }
    }
    render(){
        
        

        return(
            <main>
                <iframe
                    className="iframe"
                    title="trailer"
                    id="existing-iframe-example"
                    width="640" height="360"
                    src={this.state.trailerSrc}
                    frameBorder="0"
                    allowFullScreen
                
                ></iframe>
           </main>  
        )
    }
    
       
       
} 
    
   