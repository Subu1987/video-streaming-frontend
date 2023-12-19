import './App.css';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Videos from './components/Videos';
import Videoplayer from './components/Videoplayer';

function App() {

  // protecting the router
  // this function RequireAuth return element thats mean its can be used as a component
  // whatever inside the RequireAuth component can be used as children prop
  // that means here <Videos/> as children prop
  function RequireAuth({children,redirectTo}){

    // check localStorage available or not 
    let isAuth = localStorage.getItem("vs_details");

    // if localStorage available access the route 
    if(isAuth !== null){
      return children;
    }
    // if not available then redirect to main page with the help of <Navigate/> tag
    else{
      return <Navigate to={redirectTo}/>
    }

  }

  return (
    
    <BrowserRouter>
    <Routes>

      <Route path='/' element={<Login/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>

      <Route path='/videos' element={
          <RequireAuth redirectTo="/login">
            <Videos/>
          </RequireAuth>
      }/>

      <Route path='/player/:video_id' element={
          <RequireAuth redirectTo="/login">
            <Videoplayer/>
          </RequireAuth>
      }/>

    </Routes>
    </BrowserRouter>

  );
}

export default App;
