import React, { useEffect, useState } from "react";
import TuneIcon from '@mui/icons-material/Tune';
import "../../styles/Admin/Riders.css";
import {Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import Axios from "../../api/Axios";

export default function Riders() {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const currentDate = new Date();
	const dayOfWeek = daysOfWeek[currentDate.getDay()];
	const dayOfMonth = currentDate.getDate();
	const month = months[currentDate.getMonth()];
	const year = currentDate.getFullYear();
  const [delivery,setDelivery]=useState([]);
  const [selectDelivery,setSelectDelivery]=useState([]);
	const formattedDate = `${dayOfWeek} ${dayOfMonth.toString().padStart(2, '0')},  ${month} ${year}`;
  
  const bardata = [
    { name: 'Very Dissatisfied', value: 1 },
    { name: 'Dissatisfied', value: 3 },
    { name: 'Neutral', value: 10 },
    { name: 'Satisfied', value: 25 },
    { name: 'Very Satisfied', value: 40 },
  ];

  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const toggleFilterMenu = () => {
    setShowFilterMenu(!showFilterMenu);
  };

  const [showFilterMenu2, setShowFilterMenu2] = useState(false);

  const toggleFilterMenu2 = () => {
    setShowFilterMenu2(!showFilterMenu2);
  };
useEffect (() => {
  // Axios.get("http://localhost:5001/api/get_deliveryperson").then((response) => {
  //   console.log(response.data);
  //   setDelivery(response.data);
  // });
}, []);
const ViewDelivery = (userId) => {
  // Axios.get("http://localhost:5001/api/get_delivery",{
  //   params: {
  //     userId: userId,
  //   },
  // }).then((response) => {
  //   console.log(response.data);
  //   setSelectDelivery(response.data);
  // });
}
  return (
    <div className="Ride-Container">
      <div className="Ride-top">
        <div className="Ride-topLeft">
          <div className="Ride-topLine">
            <div className="Ride-headingText">VGen Riders</div>
            <div className="Ride-notificationButton"></div>
          </div>
          <div>
            <div className="Ride-dateText">{formattedDate}</div>
          </div>
          <div className="Ride-subContainer">
          {selectDelivery.map((val, key) => (
            <div className="Ride-topLeftContainer">
              <div className="Ride-IconContainer"></div>
              
              <div className="Ride-nameText">{val.firstName} {val.lastName}</div>
              <div className="Ride-subNameText">Area : Colombo</div>
              <div className="Ride-Details">
                <div className="Ride-Name">
                  <span className="NameLabel">First Name : </span>
                  <span className="NameValue">{val.firstName}</span>
                </div>
                <div className="Ride-Name">
                  <span className="NameLabel">Last Name : </span>
                  <span className="NameValue">{val.lastName}</span>
                </div>
               <div className="Ride-Name">
                  <span className="NameLabel">Email : </span>
                  <span className="NameValue">{val.email}</span>
               </div>
               <div className="Ride-Name">
                  <span className="NameLabel">Contact Number : </span>
                  <span className="NameValue">{val.contactNo}</span>
               </div>
               <div className="Ride-Name">
                  <span className="NameLabel">Address : </span>
                  <span className="NameValue">{val.city}</span>
               </div>
               <div className="Ride-Name">
                  <span className="NameLabel">NIC : </span>
                  <span className="NameValue">{val.nic}</span>
               </div>
               <div className="Ride-Name">
                  <span className="NameLabel">Working Area : </span>
                  <span className="NameValue">{val.city}</span>
               </div>
               <div className="Ride-Name">
                  <span className="NameLabel">ID : </span>
                  <span className="NameValue">Rider123</span>
               </div>
              </div>
            </div>
          ))}
          </div>
          <div className="Ride-bottom">
            <div className="Ride-bottomLeft">
              <div>
                <div className="Ride-subHeadingText">Customer Reviews</div>
                <div className="Ride-FilterButton2" onClick={toggleFilterMenu}>
                  Filter
                  {showFilterMenu && (
                    <div className="Ride-Filter-menu">
                      <div className="Ride-Filter-container">Today</div>
                      <div className="Ride-Filter-container">Last Month</div>
                      <div className="Ride-Filter-container">Last 5 Months</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="Ride-subContainer">
                <div className="Ride-bottomLeftContainer">
                <br/>
                <ResponsiveContainer width={700} height={200}>
                <BarChart data={bardata}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#5FA18F" />
                </BarChart>
              </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Ride-right">
          <div className="Ride-SearchBar"></div>
            <br/>
            <div className="Ride-FilterButton1" onClick={toggleFilterMenu2}>
                  Filter
                  {showFilterMenu2 && (
                    <div className="Ride-Filter-menu2">
                      <div className="Ride-Filter-container">Active Now</div>
                      <div className="Ride-Filter-container">Active 5 mins ago</div>
                      <div className="Ride-Filter-container">Active 30 mins ago</div>
                      <div className="Ride-Filter-container">Active 1 hour ago</div>
                      <div className="Ride-Filter-container">Recently Active</div>
                    </div>
                  )}
                </div>
                <div className="Ride-RightContainer">
  {delivery.map((val, key) => (
    <div className="Ride-Activities"  onClick={()=>ViewDelivery(val.userId)} key={key}>
      <div className="Ride-ActivityIconContainer"  ></div>
      <div className="Ride-ActivityText">{val.firstName} {val.lastName}</div>
    </div>
  ))}
  <div className="Ride-Divider"></div>
</div>
        </div>
      </div>
    </div>
  );
}
