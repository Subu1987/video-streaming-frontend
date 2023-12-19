import { useEffect,useRef, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import Header from "./Header";

function Videoplayer(){

    const token = useRef(JSON.parse(localStorage.getItem("vs_details")).token);

    const param = useRef(useParams()); 
     //console.log(param.current.video_id);

    const user_id =useRef(JSON.parse(localStorage.getItem("vs_details")).user_id);
    // console.log(user_id); 

    let [video,setVideo] = useState({});

    let vid = useRef();

    let navigate = useNavigate();

    // to get the video info
    useEffect(()=>{
        fetch("http://localhost:8000/video/"+param.current.video_id+"/"+user_id.current,{
            headers:{
                "Authorization": `Bearer ${token.current}`
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            setVideo(data);

            // start the videoplayer from where its left
            if(data.currentTime !== undefined){
                vid.current.currentTime = data.currentTime;
            }
        })
        .catch((err)=>{
            console.log(err);
        })

    },[])

    // to get the current time of videoplayer closing 
    function handleVideoElement(ele){
        vid.current = ele;
    }

    // to close the player
    function closePlayer(){
        // console.log(vid?.currentTime);

        // to update the watch time 
        fetch(`http://localhost:8000/watchtime/${user_id.current}/${param.current.video_id}`,{
            method:"PUT",
            headers:{
                "Authorization": `Bearer ${token.current}`,
                "Content-Type":"application/json"
            },
            body:JSON.stringify({currentTime:vid?.current.currentTime})
            
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            if(data.success === true){
                navigate("/videos");
            }

        })
        .catch((err)=>{
            console.log(err);
        })
    }


    return(
        <div className="bg">
            <Header/>

            <h1 className="title">{video.Title}</h1>

            <div className="video-area">

                {
                    video.videoPath !== undefined ?
                    (
                        <div className="videoplayer">
                            
                            <div className="control">
                                <p onClick={closePlayer}>&#10006;</p>
                            </div>

                            <video width="100%" controls ref={handleVideoElement}>
                                <source src={"http://localhost:8000/stream/"+video.videoPath}></source>
                            </video>
                        </div>

                    ) : null
                }

                
                <div className="content">
                    
                    <div className="storyline">
                        <h1 className="title">Story line</h1>
                            {video.Plot}
                    </div>
                    <div className="rating">
                        <h1 className="title">IMDb rating</h1>
                            {video.imdbRating}
                    </div>
                    <div className="genre">
                        <h1 className="title">Genre</h1>
                        {
                            video.Genre?.map((genre,index)=>{
                                return (
                                    <span key={index}>{genre}</span>
                                )
                            })
                        }
                    </div>
                    <div className="runtime">
                        <h1 className="title">Runtime</h1>
                            {video.Runtime}
                    </div>

                    <div className="actors">
                        <h1 className="title">Actors</h1>
                        {
                            video.Actors?.map((actor,index)=>{
                                return (
                                    <p key={index}>
                                        <span style={{ whiteSpace: 'pre-wrap' }} >{actor}</span><br/>
                                    </p>
                                    
                                )
                            })
                        }
                    </div>

                    <div className="directors">
                        <h1 className="title">Directors</h1>
                        {
                            video.Director?.map((director,index)=>{
                                return (
                                    <p key={index}>
                                        <span style={{ whiteSpace: 'pre-wrap' }} >{director}</span><br/>
                                    </p>
                                    
                                )
                            })
                        }
                    </div>
                    
                    


                </div>

            </div>
        </div>
    )
}


export default Videoplayer;