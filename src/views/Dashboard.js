import React from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import Home from '../customer/Home';
import Sidebar from '../components/Sidebar_1';
import Navbar from '../components/Navbar';
export default function Dashboard() {
  var user = useSelector(state => state.SetUserReducer.user)
  const navigate = useNavigate();
// console.log(localStorage.getItem('type'))
  const navigateTo = () => {
    navigate('/custhome');
  }
  return (
    <div>
    </div>
  )
}
