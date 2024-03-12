import { useState} from "react";
import axios from 'axios';
import logoAi from '../../assets/logoAI.jpeg';
import './Login.css'
import YouTubeComponent from "../youtube/youtTube.tsx";



function LoginComponent() {
    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');
    const [isValid, setValid] =  useState(false)
    const [isValidInput, setIsValidInput] =  useState(true)
    const [userData , setUserData] = useState({});
    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:3000/login',{email,pass})
        .then(res => {
            if(res.status && res.status.toString().startsWith("2")) {
                setIsValidInput(true);
                setValid(true)
                setUserData(res.data?.user || {});
                
            }

            console.log(res);
        })
         .catch(err => {
             setIsValidInput(false);
             console.log("not found" + err)
         })
    }

    return (
        <>
          {isValid  ?  <YouTubeComponent userData={userData}/> :
            <div>
              <img src={logoAi} className="hfc-logo" alt="Responsive Image"/>
        <form onSubmit={handleSubmit}>
            <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="form-outline col-4">
                <input type="email" id="form2Example1" className="form-control"  onChange={e => setEmail(e.target.value)} required/>
                <label className="form-label" htmlFor="form2Example1">Email address</label>
            </div>


            <div className="form-outline col-4">
                <input type="password" id="form2Example2" className="form-control" onChange={e => setPass(e.target.value)} required/>
                <label className="form-label" htmlFor="form2Example2">Password</label>
            </div>
                {
                    !isValidInput && <small id="usernameHelp22" className="form-text text-danger" >User not found, please <span className="fw-bold">Register</span></small>
                }


                <div className="row col-4">
                <div className="col d-flex justify-content-center">

                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                        <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                    </div>
                </div>

                <div className="col">

                    <a href="#!">Forgot password?</a>
                </div>
            </div>


            <button type="submit" className="d-flex btn btn-primary btn-block col-4 justify-content-center my-2">Sign in</button>




            <div className="d-flex">
                <p>Not a member? <a href="#!">Register</a></p>
            </div>
            </div>
        </form>
            </div>
            }



        </>
    );
}
export  default LoginComponent;
