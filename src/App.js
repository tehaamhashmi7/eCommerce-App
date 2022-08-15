import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Footerr from './components/Footerr';
import SignUp from './components/SignUp';
import AppState from './components/context/AppState';
import Login from './components/context/Login';
import {Routes, Route} from 'react-router-dom'
import Home from './components/context/Home';

function App() {
  return (
    <AppState>
    <div className="App">
      <Nav />
      <Routes>
        <Route exact={true} path='/signup' element={<SignUp />} ></Route>
        <Route exact={true} path='/login' element={<Login />} ></Route>
        <Route exact={true} path='/' element={<Home />} ></Route>
      </Routes>
      <Footerr />
    </div>
    </AppState>
  );
}

export default App;
