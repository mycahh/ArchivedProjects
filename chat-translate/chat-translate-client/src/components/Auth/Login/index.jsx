import { useState } from "react"
import axios from "axios"
import socket from "../../../helpers/socket";

import "../Auth.css"

const Login = ({ onCreateAccount , show, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const defaultError = { status: "ok", message: "" }
  const [error, setError] = useState(defaultError)
  
  const handleEmailChange = e => setEmail(e.target.value)

  const handlePasswordChange = e => setPassword(e.target.value)

  const handleSubmit = e => {
    e.preventDefault()
    const body = { username: email, password }

    axios.post('https://chat-translate.azurewebsites.net/auth/login', body)
    .then(res => {
      const { status, data } = res.data
      console.log(res)

      if(status === "error") setError(res.data)
      if(status === "ok") {
          localStorage.setItem('isLogged', true)
          localStorage.setItem('user_data', JSON.stringify(data))
          setError(defaultError)
          setUser({ isLogged: true, user_data: data })
          socket.connect()
        }

    })
  }

  return (
    <div className={`login-container login ${(!show) ? 'show' : ''}`}>  
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre de Usuario:</label>
          <input
            placeholder="JohnDoe"
            type="text"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        {error.status === 'error' && <p>{error.message}</p>}
        <button className="hvr-fade" type="submit">Login</button>
      </form>
      <div className="additional-options">
        {/* <a href="#">Forgot Password?</a> */}
        <a className="toggle-register hvr-skew-forward" onClick={onCreateAccount}>Crear una cuenta</a>
      </div>
    </div>
  );
};

export { Login };
