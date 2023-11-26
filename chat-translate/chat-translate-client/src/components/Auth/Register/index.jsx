import { useEffect, useState } from 'react';
import "../Auth.css"
import axios from 'axios'
import socket from '../../../helpers/socket';

import Lang from './lang';

const Register = ({ onCreateAccount , show, setUser }) => {
  const initialState = {
    nombre: '',
    apellido: '',
    username: '',
    password: '',
    idioma: ''
  }
  const defaultError = { status: "ok", message: "" }

  const [form, setForm] = useState(initialState)

  useEffect(() => {
    
    return () => {
      setForm(initialState)
      setError(defaultError)
    }
  }, [])

  const [error, setError] = useState(defaultError)

  const { nombre, apellido, username, password, idioma } = form


  const onHandleChange = e => {  

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })}

    function handleSubmit(e) {
      e.preventDefault()
      const body = {
        displayName: nombre + ' ' + apellido,
        username,
        password,
        idioma: parseInt(idioma),
      }
      
      axios.post('https://chat-translate.azurewebsites.net/auth/register', body)
      .then(res => {
        const { status, data } = res.data

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
    <div className={`register-container register ${show ? 'show' : ''}`}>
      <div className={`register-background`} onClick={onCreateAccount}></div>
      <div className="register-card login-container">
        <h2>Crear una cuenta</h2>
        <form onSubmit={handleSubmit}>
          <div className='full-name'>
            <div className='form-name'>
              <label htmlFor="nombre">Nombre:</label>
              <input 
                type="text" 
                name="nombre" 
                value={nombre} 
                onChange={onHandleChange} required />
            </div>
            <div className='form-lastname'>
              <label htmlFor="apellido">Apellido:</label>
              <input 
              type="text" 
              name="apellido" 
              value={apellido} 
              onChange={onHandleChange} required />
            </div>
          </div>

          <label htmlFor="username">Nombre de usuario:</label>
          <input 
            type="text" 
            name="username" 
            value={username} 
            onChange={onHandleChange} required />

          <label htmlFor="contraseña">Contraseña:</label>
          <input
            type="text"
            name="password"
            value={password}
            onChange={onHandleChange}
            required
          />

          <label htmlFor="idioma">Idioma:</label>
          <select 
            className='select-input' 
            name="idioma" 
            value={idioma} 
            onChange={onHandleChange} required>
            <option value="">Seleccione un idioma</option>
            {Lang.map(({ code, name }, i) => <option value={i+1}>{name}</option>)}
          </select>
          {error.status === 'error' && <p>{error.message}</p>}
          <button type="submit">Registrarse</button>
        </form>
        <a className="toggle-register hvr-skew-forward" onClick={onCreateAccount}>Ya tengo una cuenta</a>
      </div>
    </div>
      
    
  );
};


export { Register };



