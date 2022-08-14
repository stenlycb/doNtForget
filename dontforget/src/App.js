import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import './App.css';
import AppRouter from './components/AppRouter';
import MainContext from './context/MainContext';

function App() {

  const loggeduser = (localStorage.getItem("loggedUser") !== null) ? JSON.parse(localStorage.getItem("loggedUser")) : {};
  const navigate = useNavigate();

  /**
   * |---------------------------------------------------
   * | manage MainContext
   * |---------------------------------------------------
   */
  const [user, setUser] = useState(loggeduser);

  const updateUser = (_user) => {

    if (Object.keys(_user).length > 0) {
      if (_user.logout !== undefined && _user.logout === true) {
        setUser({});
        localStorage.setItem("loggedUser", null);
      } else {
        setUser(_user);
        localStorage.setItem("loggedUser", JSON.stringify(_user));
      }
    }
  }

  useEffect(() => {

    if (Object.keys(user).length > 0) {
      navigate('/notes');
    } else {
      navigate('/login');
    }

    console.log(user);

  }, [user]);



  return (
    <MainContext.Provider value={{ user: user, updateUser: updateUser }}>
      <AppRouter />
    </MainContext.Provider>
  );
}

export default App;
