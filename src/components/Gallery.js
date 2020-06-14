import React, { Component} from "react"
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

export default class Gallery extends Component {
    constructor(props){
        super(props)
        this.state = {
            imgSrc:[],
            id : props.data.id,
            title: props.data.title,
            photoIndex: 0,
            galleryIsOpen: props.galleryIsOpen


        }
    }
    
   componentDidMount = async () => {
       //console.log(this.state.id)
    const url = `https://api.themoviedb.org/3/movie/${this.state.id}/images?api_key=b0aa4893b30020c4cb9176b7a91cc441&language=en-US&append_to_response=images&include_image_language=en,null`
    const response =  await fetch(url)
    const json = await response.json()
    const data = json.posters
    this.setState({
        imgSrc: data.map(x => `https://image.tmdb.org/t/p/w600_and_h900_bestv2${x.file_path}`)
    })
    console.log(this.state.galleryIsOpen)
   }

    render(){
        const {imgSrc, photoIndex, galleryIsOpen} = this.state
       
        
        return(
            <div>
               {galleryIsOpen && imgSrc &&(
                <Lightbox
                    mainSrc={imgSrc[photoIndex]}
                    nextSrc={imgSrc[(photoIndex + 1) % imgSrc.length]}
                    prevSrc={imgSrc[(photoIndex + imgSrc.length - 1) % imgSrc.length]}
                    onCloseRequest={() => this.setState({galleryIsOpen: false})}
                    onMovePrevRequest={() =>
                    this.setState({
                        photoIndex: (photoIndex + imgSrc.length - 1) % imgSrc.length,
                    })
                    }
                    onMoveNextRequest={() =>
                    this.setState({
                        photoIndex: (photoIndex + 1) % imgSrc.length,
                    })
                    }
                />
        )}
            </div>

        )
    }
    
    
    
  
    
     
        
        //setImgSrc(imgArray.map(x => `https://image.tmdb.org/t/p/w600_and_h900_bestv2${x.file_path}`))
        
    }

      
    
   

