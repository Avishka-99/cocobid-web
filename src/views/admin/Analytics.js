import React, { useEffect, useState } from "react";
import "../../styles/Admin/Analytics.css";
import { LineChart, Line, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import Axios from "../../api/Axios";
import * as API_ENDPOINTS from '../../api/ApiEndpoints';

export default function Analytics() {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const currentDate = new Date();
	const dayOfWeek = daysOfWeek[currentDate.getDay()];
	const dayOfMonth = currentDate.getDate();
	const month = months[currentDate.getMonth()];
	const year = currentDate.getFullYear();
	const formattedDate = `${dayOfWeek} ${dayOfMonth.toString().padStart(2, '0')},  ${month} ${year}`;
  const [todayChart,setTodayChart] = useState([]);
  const linedata = [
    {
      name: 'Monday',
      "Buy Vegan Products": 50,
      "Vegan Events": 20,
      "Donations": 31,
      Other: 10,  
    },
    {
      name: 'Tuesday',
      "Buy Vegan Products": 80,
      "Vegan Events": 40,
      "Donations": 41,  
      Other: 20,  
    },
    {
      name: 'Wednesday',
      "Buy Vegan Products": 70,
      "Vegan Events": 30,
      "Donations": 38,  
      Other: 15, 
    },
    {
      name: 'Thursday',
      "Buy Vegan Products": 50,
      "Vegan Events": 20,
      "Donations": 31,  
      Other: 11,  
    },
    {
      name: 'Friday',
      "Buy Vegan Products": 90,
      "Vegan Events": 50,
      "Donations": 28,  
      Other: 30, 
    },
    {
      name: 'Saturday',
      "Buy Vegan Products": 60,
      "Vegan Events": 70,
      "Donations": 45, 
      Other: 40,  
    },
    {
      name: 'Sunday',
      "Buy Vegan Products": 100,
      "Vegan Events": 38,
      "Donations": 50, 
      Other: 32,  
    },
  ];

  const bardata = [
    { name: 'Total Auctions', value: 150 },
    { name: 'Total Revenue', value: 250 },
    { name: 'Expenses', value: 45 },
  ];

  const data = [
    { name: 'Views', value: 550 },
    { name: 'Followers', value: 300 },
    { name: 'Reposts', value: 150 },
  ];

  const COLORS = ['#457F8C', '#4B8160', '#7EB693'];

  const webData = [
    { name: '5 Stars', value: 250 },
    { name: '4 Stars', value: 640 },
    { name: '3 Stars', value: 100 },
	  { name: '2 Stars', value: 7 },
    { name: '1 Stars', value: 3 },
  ];

  const webColors = ['#128194', '#7EB693', '#9DB0A3', '#3A4B40', '#5BB6CA'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          {data.name}: {data.value}
        </div>
      );
    }
    return null;
  };

  const [activeIndex, setActiveIndex] = useState(null);
  const [activeWebIndex, setActiveWebIndex] = useState(null);

  const handlePieClick = (data, index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleExpensesPieClick = (data, index) => {
    setActiveWebIndex(activeWebIndex === index ? null : index);
  };

  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const toggleFilterMenu = () => {
    setShowFilterMenu(!showFilterMenu);
  };

  const [showFilterMenu2, setShowFilterMenu2] = useState(false);

  const toggleFilterMenu2 = () => {
    setShowFilterMenu2(!showFilterMenu2);
  };

  const [showFilterMenu3, setShowFilterMenu3] = useState(false);

  const toggleFilterMenu3 = () => {
    setShowFilterMenu3(!showFilterMenu3);
  };

  const [showFilterMenu4, setShowFilterMenu4] = useState(false);

  const toggleFilterMenu4 = () => {
    setShowFilterMenu4(!showFilterMenu4);
  };

  useEffect(()=>{
    Axios.get(API_ENDPOINTS.FETCH_TODAY_ANALYTICS).then((response)=>{
      console.log(response.data)
      setTodayChart(response.data)
    })
  },[])
  return (
    <div className="Analytics-Container">
      <div className="anl-top">
        <div className="anl-topLeft">
          <div className="anl-topLine">
            <div className="anl-headingText">VGen Analytics</div>
            <div className="anl-notificationButton"></div>
          </div>
          <div>
            <div className="anl-dateText">{formattedDate}</div>
            <div className="anl-filterButton1" onClick={toggleFilterMenu}>
              Filter
              {showFilterMenu && (
                <div className="anl-filter-menu">
                  <div className="anl-filter-container">Daily</div>
                  <div className="anl-filter-container">Weekly</div>
                  <div className="anl-filter-container">Monthly</div>
                  <div className="anl-filter-container">Yearly</div>
                </div>
              )}
            </div>
          </div>
          <div className="anl-subContainer">
            <div className="anl-topLeftContainer" style={{paddingLeft:'10%'}}>
              <div className="anl-bodyText">Overview of Today(K)</div>
              {todayChart.length>0 && <ResponsiveContainer width={700} height={170}>
                <BarChart data={todayChart}>
                  <XAxis dataKey="name" />
                  {/* <YAxis /> */}
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#7EB693" />
                </BarChart>
              </ResponsiveContainer>}
            </div>
          </div>
          <div className="anl-subContainer">
            <div className="anl-cardContainer">
              <div className="anl-firstDivider">
                <div className="anl-cardIconContainer"></div>
                <div className="anl-countText">Rs.150,000</div>
              </div>
              <div className="anl-secondDivider">
                <br />
                <span className="anl-countGoesUp"> +11.15% </span>
                <br />
                Total Auctions
              </div>
            </div>
            <div className="anl-cardContainer">
              <div className="anl-firstDivider">
                <div className="anl-cardIconContainer2"></div>
                <div className="anl-countText">Rs.250,000</div>
              </div>
              <div className="anl-secondDivider">
                <br />
                <span className="anl-countGoesUp"> +11.15% </span>
                <br />
                Total Revenue
              </div>
            </div>
            <div className="anl-cardContainer">
              <div className="anl-firstDivider">
                <div className="anl-cardIconContainer3"></div>
                <div className="anl-countText">Rs.45,000</div>
              </div>
              <div className="anl-secondDivider">
                <br />
                <span className="anl-countGoesDown"> -1.15% </span>
                <br />
                Total Expenses
              </div>
            </div>
          </div>
          <div className="anl-bottom">
            <div className="anl-bottomLeft">
              <div className="anl-midLine"></div>
              <div>
                <div className="anl-subHeadingText">Expenses Overview(K)</div>
                <div className="anl-filterButton1" onClick={toggleFilterMenu2}>
                  Filter
                  {showFilterMenu2 && (
                    <div className="anl-filter-menu">
                      <div className="anl-filter-container">Daily</div>
                      <div className="anl-filter-container">Weekly</div>
                      <div className="anl-filter-container">Monthly</div>
                      <div className="anl-filter-container">Yearly</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="anl-subContainer">
                <div className="anl-bottomLeftContainer">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart width={800} height={350} data={linedata} margin={{ top: 5, right: 30, left: 0, bottom: 5, }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }}/>
                      <YAxis tick={{ fontSize: 12 }}/>
                      <Tooltip contentStyle={{ fontSize: 12 }}/>
                      <Legend iconSize={12} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                      <Line type="monotone" dataKey="Buy Vegan Products" stroke="#2F4858" strokeWidth={3} activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="Vegan Events" stroke="#6BB2D8" strokeWidth={3} />
                      <Line type="monotone" dataKey="Donations" stroke="#005B8D"  strokeWidth={3} /> 
                      <Line type="monotone" dataKey="Other" stroke="#4B8160"  strokeWidth={3} />       
                    </LineChart>
                 </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="anl-right">
          <div className="anl-subHeadingText">
            Web Surfers
            <div className="anl-summary">Last Month Summary</div>
          </div>
          <div>
            <div className="anl-topRightContainer">
              <div className="anl-filterButton2" onClick={toggleFilterMenu3}>
                Filter
                {showFilterMenu3 && (
                  <div className="anl-filter-menu">
                    <div className="anl-filter-container">Daily</div>
                    <div className="anl-filter-container">Weekly</div>
                    <div className="anl-filter-container">Monthly</div>
                    <div className="anl-filter-container">Yearly</div>
                  </div>
                )}
              </div>
              <div className='anl-pie-chart-container'>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={data}  innerRadius={60} outerRadius={100} fill='#ccc' paddingAngle={5} dataKey='value' label={{ fill: 'black', fontSize: 13 }} onClick={handlePieClick}>
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                {/* {activeIndex !== null && (
                  <div className="selected-label">
                    Selected: {data[activeIndex].name}
                  </div>
                )} */}
              </div>
            </div>
          </div>
          <div className="anl-subHeadingText">
            Web Ratings
            <div className="anl-summary">Last Month Summary</div>
          </div>
          <div>
            <div className="anl-bottomRightContainer">
              <div className="anl-filterButton2" onClick={toggleFilterMenu4}>
                Filter
                {showFilterMenu4 && (
                  <div className="anl-filter-menu">
                    <div className="anl-filter-container">Daily</div>
                    <div className="anl-filter-container">Weekly</div>
                    <div className="anl-filter-container">Monthly</div>
                    <div className="anl-filter-container">Yearly</div>
                  </div>
                )}
              </div>
              <div className='anl-pie-chart-container'>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={webData} innerRadius={60} outerRadius={100} fill='#ccc' paddingAngle={5} dataKey='value' label={{ fill: 'black', fontSize: 13 }} onClick={handleExpensesPieClick}>
                      {webData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={webColors[index % webColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                {/* {activeExpensesIndex !== null && (
                  <div className="selected-label">
                    Selected: {expensesData[activeExpensesIndex].name}
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
