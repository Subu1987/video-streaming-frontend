import {useState} from 'react';
import { Link } from 'react-router-dom';
function Register(){

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
    function register(){

        
       
        // check both password matchd
        if(user.cpassword === user.password){

            delete user.cpassword;
            
            
            // posting data to backend
            fetch("http://localhost:8000/register",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(user)

            })
            .then((response)=>response.json())
            .then((data)=>{
                setMessage(data.message);
                setBoxvisible(true);

                setTimeout(()=>{
                    setBoxvisible(false);
                },3000)
            })
            .catch((err)=>{
                console.log(err);
            })

        }else{
            console.log("Password doesn't matched")
        }

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

                <h1 className="title">Create a account </h1>
                <p>Or<span></span><Link to="/Login"> Login now</Link></p>
                <input type='text' placeholder="Enter Name" onChange={(event)=>{readValue("name",event.target.value)}}></input>
                <input type='email' placeholder="Enter Email" onChange={(event)=>{readValue("email",event.target.value)}}></input>
                <input type='text' placeholder="Enter UserName" onChange={(event)=>{readValue("username",event.target.value)}}></input>
                <input type='password' placeholder="Enter Password" onChange={(event)=>{readValue("password",event.target.value)}}></input>
                <input type='password' placeholder="Confirm Password" onChange={(event)=>{readValue("cpassword",event.target.value)}}></input>
                
                <button onClick={register} className='btn'>Register</button>
                
                    
                
                

            </div>

        </section>

    )
}


export default Register;