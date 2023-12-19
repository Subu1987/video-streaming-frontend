import {useState,useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
function Videos(){

    // extract the token
    let token =useRef(JSON.parse(localStorage.getItem("vs_details")).token);

    // to store the incoming data 
    let [videos,setVideos] = useState([]);

    let [imageUrl,setImageUrl] = useState("hello");
  
    
    function readImage(url){
        setImageUrl(url);
    }

    // calling the backend while loading 
    useEffect(()=>{
        

        fetch("http://localhost:8000/videos",{
            headers:{
                "Authorization":`Bearer ${token.current}`
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            // console.log(data);
            setVideos(data);
        })
        .catch((err)=>{
            console.log(err);
        })


    },[])



    return (
        <div className="bg" style={{backgroundImage:`url(${imageUrl})`,backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundBlendMode:"color",backgroundPosition:"center"}}>
            <Header/>
            <h1 className="title">All Videos</h1>
            <div className='video-container'>

                {
                    videos.map((video,index)=>{
                        return(
                            <div className='video-card' key={index} onMouseOver={(e)=>(readImage(e.target.src))}>
                                <div className='video-img-container'>
                                    <img className='video-img' src={video.Poster} alt={video.Title}></img>
                                </div>

                                <div className='padd'>
                                    <h1 className='movie-title'>{video.Title}</h1>
                                    <p>
                                        {
                                            video.Genre.map((genre,index)=>{
                                                return (
                                                    <span key={index}>{genre}</span>
                                                )
                                            })
                                        }
                                    </p>
                                    <p>{video.imdbRating}</p>

                                    <Link to={"/player/"+video._id}>
                                    <button className='btn'>Watch Now</button>
                                    </Link>
                                    
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}


export default Videos;