import {React,useEffect,useState} from "react";
import './assets/Global.scss'
import Navbar from './components/Navbar';
import {BrowserRouter, Route, Routes ,Navigate} from "react-router-dom";
import Dashboard from './view/Dashboard';
import { Toaster } from "react-hot-toast";
import Signup from './view/Auth/Signup';
import Login from './view/Auth/Login';
import MyTask from "./view/MyTask";
//import {useSelector} from 'react-redux'
function App() {
  // const isLoggedIn = useSelector((state) => state.isLoggedIn);
  // console.log(isLoggedIn);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const navigate=useNavigate()
  useEffect(() => {
    checkLoginStatus();
  }, [isLoggedIn]);

  const checkLoginStatus = () => {
    const userdata = localStorage.getItem("userData");
    if (userdata) {
      setIsLoggedIn(true);
      console.log("User is logged in");
    } else {
      setIsLoggedIn(false);
      console.log("User is not logged in");
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("user");
  };

  return (<div className="app">
  <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout}/>

        <Routes>
            <>
         <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
         {/* <Route path="/dashboard" element={<Dashboard />} /> */}
         
         <Route path="/login" element={<Login onLogin={handleLogin}/>} />
         {/* <Route path="/login" element={<Login />} /> */}
         <Route path="/signup" element={<Signup />} />
         <Route path="/mytasks" element={<MyTask />} />
            </>
        </Routes>
        </BrowserRouter>
      <Toaster />
   </div>
  );
}
export default App;
