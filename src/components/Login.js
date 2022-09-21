import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
// import  from "react";

function Login(props) {
  const [credential, setCredential] = useState({email:"",password:""})
  let history=useNavigate()
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            },
          body: JSON.stringify({email:credential.email,password:credential.password})
        });
        const json=await response.json();
        console.log(json.authToken)
        if(json.success)
          {
            //save the auth token redirect
             localStorage.setItem('token',json.authToken)
            props.showAlert('Successful logged in','success')
            history('/')
          }
        else{
          props.showAlert('Invalid Credential','danger')
        }
    }
    const onChange=(e)=>{
      setCredential({...credential,[e.target.name]:e.target.value})
    }
  return (
    <div className="container mt-5">
      <h2>Login to Continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credential.email}
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={credential.password}
            name="password"
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
