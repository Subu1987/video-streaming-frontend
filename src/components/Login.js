import {useState} from 'react';
import {Link,useNavigate } from 'react-router-dom';
function Login(){

    // navigate to other page state variable
    let navigate = useNavigate();

    // display the message
    let [message,setMessage] = useState("hello");
    // visibility of message
    let [boxvisible,setBoxvisible] = useState(false);

    let user = {};
    // read the value of inputbox
    function readValue(property,value){
        user[property] = value;
        
    }

    // get the user object
    function login(){

        // console.log(user);
        
            // posting data to backend
            fetch("http://localhost:8000/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(user)

            })
            .then((response)=>response.json())
            .then((data)=>{
                

                if(data.status === true){
                    console.log(data);
                    
                    // storing the token 
                    localStorage.setItem("vs_details",JSON.stringify({token:data.token,user_id:data.user_id,username:data.username}));
                    console.log(localStorage);
                    navigate("/Videos");

                }
                else{
                    setMessage(data.message);
                    setBoxvisible(true);

                    setTimeout(()=>{
                        setBoxvisible(false);
                    },3000)
                }
                
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    

    return (

        <section className="main">

            <div className="message-bg">

                {
                    boxvisible === true ? (

                        <div className="message">
                            {message}
                        </div>

                    ) : null
                }

                
            </div>

            <div className="account">

                <h1 className="title">Log In</h1>
                <input type='text' placeholder="Enter UserName" onChange={(event)=>{readValue("username",event.target.value)}}></input>
                <input type='password' placeholder="Enter Password" onChange={(event)=>{readValue("password",event.target.value)}}>
                    
                </input>
                <button onClick={login}>Login</button>
                <p>
                    Don't have a account ? <span></span> 
                    <Link to="/Register">
                    
                    Sign up now.
                    </Link>
                </p>

            </div>

        </section>

    )
}


export default Login;