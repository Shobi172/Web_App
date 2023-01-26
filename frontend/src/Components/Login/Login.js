import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "./Login.css";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => {
    return state;
  });
  const initialValue = {
    password: "",
    email: "",
  };
  const [formValues, setFormValues] = useState(initialValue);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9000/login", {
        email: formValues.email,
        password: formValues.password,
      })
      .then(function (response) {
        if (response.data.auth === true) {
          console.log(response);
          dispatch({
            type: "StoreToken",
            token: response.data.token,
            id: response.data.id,
            accountType: response.data.accountType,
          });
          if (response.data.accountType === "user") {
            navigate("/home");
          } else if (response.data.accountType === "admin") {
            navigate("/admin/home");
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid username and password",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (auth !== undefined) {
      if (auth.token !== "") {
        if (auth.accountType === "user") {
          navigate("/home");
        } else if (auth.accountType === "admin") {
          navigate("/admin/home");
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

<div className="center">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="txt_field">
        <input
                type="text"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
              />
              
        </div>
        
        <div className="txt_field">
        <input
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
              />
             
        </div>
        <input type="submit" value="Login"/>
        <div className="signup_link">
          Not a member?  <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
