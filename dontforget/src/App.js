import './App.css';
import AppRouter from './components/AppRouter';
import MainContext from './context/MainContext';

function App() {
  return (
    <MainContext.Provider value={{}}>
      <AppRouter />
    </MainContext.Provider>
  );
}

export default App;
