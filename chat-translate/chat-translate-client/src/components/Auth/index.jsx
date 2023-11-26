import { useState, useContext } from 'react'
import { Login } from './Login';
import { Register } from './Register';

import { UserDispatchContext } from '../../store/context/user/UserContext'

import "./Auth.css";

const Auth = () => {
  const [showRegister, setShowRegister] = useState(false);

  const setUser = useContext(UserDispatchContext)

  const handleCreateAccount = () => setShowRegister(sh => !sh);

  return (
    <div className='Auth'>
        <img className='Auth-bg' src="https://i0.wp.com/mbrjournal.com/wp-content/uploads/2022/08/MBR-Paper-18-Kumar_1771088840.png?fit=2560%2C1440&ssl=1" alt="background world wide" />  
        <Login onCreateAccount={handleCreateAccount} show={showRegister} setUser={setUser}/>
        {/* {showRegister && <Register onCreateAccount={handleCreateAccount} show={showRegister}/>} */}
        <Register onCreateAccount={handleCreateAccount} show={showRegister} setUser={setUser}/>
    </div>
  );
};

export { Auth };
