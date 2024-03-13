import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Test() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
  
    const handleLogin = async () => {
      const credentials = { email: 'alejandro@gmail.com', password: '1233qwerty' };
      try {
        const response = await dispatch(login(credentials));
        console.log(response)
        dispatch(setUser(response.payload.user));
      } catch (error) {
        console.error('Error durante el inicio de sesión:', error.message);
      }
    };
  
    const handleLogout = async () => {
      try {
        await dispatch(logout());
      } catch (error) {
        console.error('Error durante el cierre de sesión:', error.message);
      }
    };
  
    return (
      <div>
        <h2>Estado de autenticación</h2>
        <pre>{JSON.stringify(auth, null, 2)}</pre>
        <button onClick={handleLogin}>Iniciar Sesión</button>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    );
  }
  
  export default Test;
  