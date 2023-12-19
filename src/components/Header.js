import { useRef } from "react";
import { useNavigate } from "react-router-dom";


function Header(){

    let username = useRef(JSON.parse(localStorage.getItem("vs_details")).username);
    let navigate = useNavigate();
    // console.log(username.current);

    function logOut(){
        // remove the localstorage to logout
        localStorage.removeItem("vs_details");


        // redirect to login page
        navigate("/login");
    }

    return(
        <header className="header">
            <ul>
                <li>{username.current}</li>
                <li onClick={logOut}>Log Out</li>
            </ul>
        </header>
    )
}

export default Header;