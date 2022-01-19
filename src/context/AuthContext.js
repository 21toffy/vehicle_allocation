import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
    const history = useHistory();

    const access = localStorage.getItem('access');
    const user = localStorage.getItem('user');


    const [authState, setAuthState] = useState({
        access,
        // user: user ? JSON.parse(user) : {}
      });

      const setAuthInfo = ({ token, user }) => {
        localStorage.setItem('token', token);
       
    
        setAuthState({
          token,
        });
      };


      const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState({});
        history.push('/login');
      };


      const isAuthenticated = () => {
        if (authState.token ) {
          return true;
        }
      };
    


      return (
        <Provider
          value={{
            authState,
            setAuthState: authInfo => setAuthInfo(authInfo),
            logout,
            isAuthenticated,
          }}
        >
          {children}
        </Provider>
      );

}


export { AuthContext, AuthProvider };