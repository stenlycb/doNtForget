import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import './App.css';
import AppRouter from './components/AppRouter';
import MainContext from './context/MainContext';

function App() {

  const navigate = useNavigate();

  /**
   * |---------------------------------------------------
   * | manage MainContext
   * |---------------------------------------------------
   */
  const [user, setUser] = useState({});

  const updateUser = (_user) => {

    if (Object.keys(_user).length > 0) {
      if (_user.logout !== undefined && _user.logout === true) {
        setUser({});
      } else {
        setUser(_user);
      }
    }
  }

  useEffect(() => {

    if (Object.keys(user).length > 0) {
      navigate('/notes');
    } else {
      navigate('/login');
    }

  }, [user]);



  return (
    <MainContext.Provider value={{ user: user, updateUser: updateUser }}>
      <AppRouter />
    </MainContext.Provider>
  );
}

export default App;
