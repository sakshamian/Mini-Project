import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const loginUser = async (userData) => {
        try {
          const res = await fetch(`http://localhost:8000/users/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...userData }),
          });
          const result = await res.json();
          console.log(result);
          if (!result.error) {
            navigate("/chat", { replace: true });
          } else {
            setErrorMsg(true);
          }
        } catch (err) {
          setErrorMsg(true);
          console.log(err);
        }
    };

    const [ errorMsg, setErrorMsg ]= useState(false);
    const [credentials, setCredentials] = useState({
        name: "",
        password: "",
    });

    const handleInputChange = (event) => {
        setErrorMsg(false);
        const { name, value } = event.target;
    
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (!credentials.name || !credentials.password) {
          setErrorMsg(true);
        }
    
        loginUser(credentials);
    };

  return (
    <div>
        <div className="login-form">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="content">
                    <div className="input-field">
                        <input name='name' type="name" placeholder="Username" onChange={handleInputChange} />
                    </div>
                    <div className="input-field">
                        <input name='password' type="password" placeholder="Password" onChange={handleInputChange} />
                    </div>
                </div>
                {errorMsg && <div className='error-display'>
                    Username or password is incorrect
                </div>}
                <div className="action">
                    <button type='submit'>Sign in</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Home