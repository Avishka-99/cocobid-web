import React, { useEffect, useState } from 'react';
import { socket } from './socket';
import { useSelector, useDispatch } from 'react-redux';
import './styles/App.css';
import './styles/base.css';
import './styles/embla.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import * as UserRoutes from './routes/Routes';
import LandingPage from './views/landing/LandingPage';
import SignIn from './views/landing/SignIn';
import SignUp from './views/landing/SignUp';
import ResetPassword from './views/landing/ResetPassword';
import Otp from './views/landing/Otp';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Toast from './components/Toast';
import Modal from 'react-modal';
        
function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  useEffect(() => {
    function onConnect() {
      console.log('connected')
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []);
  //console.log(localStorage.getItem("type"));
  // localStorage.clear('type');
  //console.log(JSON.parse(atob(localStorage.getItem('token').split('.'))))
  const navigate = useNavigate();
  var user = sessionStorage.getItem("type");
  useEffect(() => {
    if (user) {
      navigate("/home");
    } else {
      console.log("thiss")
      navigate("/");
    }
  }, [user]);
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [role, setRole] = useState("customer");
  Modal.setAppElement('body')
  return (
    <div className="outerContainer">
      {user === 'customer' || user === 'Admin' || user === 'Staff' || user === 'resturantManager' || user === 'productManufacture' ? (
        <><div className="sidebar">
          <Sidebar type={user} />
        </div>
          <div className="container" style={{ width: '95%' }}>
            <Routes>
              <Route path="/" element={<LandingPage />}></Route>
              <Route path="/signin" element={<SignIn />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="/reset" element={<ResetPassword />}></Route>
              <Route path="/otp" element={<Otp />}></Route>
              <Route element={<ProtectedRoutes isSignedIn={user} />}>
                {user == "customer" ? (
                  UserRoutes.customerRoutes.map((item) => <Route key={item.id} path={item.path} element={item.element}></Route>)
                ) : user == "Admin" ? (UserRoutes.adminRoutes.map((item) => <Route key={item.key} path={item.path} element={item.element}></Route>)
                ) : (<Route path="" element={<LandingPage />}></Route>
                )}
              </Route>
            </Routes>
          </div>

        </>
      ) : (
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/reset" element={<ResetPassword />}></Route>
          <Route path="/otp" element={<Otp />}></Route>
        </Routes>
      )}
      <Toast duration={3000} />
    </div>
  );
}

export default App;
