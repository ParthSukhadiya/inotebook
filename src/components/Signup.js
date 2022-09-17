import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const [credential, setCredential] = useState({name:"",email:"",password:""})
  let history=useNavigate()
    const handleSubmit=async (e)=>{
        const {name,email,password}=credential;
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            },
          body: JSON.stringify({name,email,password})
        });
        const json=await response.json();
        console.log(json)
        if(json.success)
          {
            //save the auth token redirect
            localStorage.setItem('token',json.authtoken)
            history('/')
          props.showAlert("Successfully Created user","success")

          }
        else{
          props.showAlert("Invalid Crediatal","danger")
        }
    }
    const onChange=(e)=>{
      setCredential({...credential,[e.target.name]:e.target.value})
    }
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}

          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
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
            name="password"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;