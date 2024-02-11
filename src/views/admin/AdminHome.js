import React, { useState, useEffect } from "react";
import TuneIcon from '@mui/icons-material/Tune';
import "../../styles/Admin/Home.css";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import * as API_ENDPOINTS from '../../api/ApiEndpoints';
import Axios from "../../api/Axios";

export default function AdminHome() {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const currentDate = new Date();
  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const dayOfMonth = currentDate.getDate();
  const month = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  const [auctions, setAuctions] = useState([]);
  const [cardDetails, setCardDetails] = useState([]);

  const [count, setCount] = useState(0);
  const [completed, setCompleted] = useState(0);
  const formattedDate = `${dayOfWeek} ${dayOfMonth.toString().padStart(2, '0')},  ${month} ${year}`;

  const data = [
    { name: 'Highly Satisfied', value: 50 },
    { name: 'Satisfied', value: 410 },
    { name: 'Neutral', value: 30 },
    { name: 'Dissatisfied', value: 7 },
    { name: 'Highly Dissatisfied', value: 3 },
  ];

  const COLORS = ['#2F4858', '#488A87', '#7EB693', '#5FA18F', '#335E6C'];

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

  const handlePieClick = (data, index) => {
    setActiveIndex(activeIndex === index ? null : index);
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
  useEffect(() => {
    Axios.get(API_ENDPOINTS.FETCH_RECENT_AUCTIONS).then((response) => {
      console.log(response.data);
      setAuctions(response.data)
    });
    Axios.get(API_ENDPOINTS.FETCH_AUCTION_SUMMARY).then((response) => {
      console.log(response.data);
      setCardDetails(response.data)
      console.log(cardDetails.ongoing)
    })
  }
    , []);
  // useEffect(() => {
  //   Axios.get("http://localhost:5001/api/getOrder_count").then((response) => {
  //     //get count of orders
  //     console.log(response.data);
  //     setCount(response.data);

  //   });
  // }
  // , []);
  // useEffect(() => {
  //   Axios.get("http://localhost:5001/api/completed_order").then((response) => {
  //     console.log(response.data);
  //     setCompleted(response.data);
  //   });
  // }
  // , []);
  return (
    <div className="Home-Container">
      <div className="Home-Top">
        <div className="Home-TopLeft">
          <div className="Home-TopLine">
            <div className="Home-HeadingText">CoCoBid Dashboard</div>
            <div className="Home-NotificationButton"></div>
          </div>
          <div>
            <div className="Home-DateText">{formattedDate}</div>
          </div>
          <div className="Home-SubContainer">
            <div className="Home-CardContainer">
              <div className="Home-FirstDivider">
                <div className="Home-CardIconContainer"></div>
              </div>
              <div className="Home-SecondDivider">
                Total Auctions
                {
                  <div className="Home-CountText">{cardDetails.length>0 && cardDetails[0].ongoing + cardDetails[0].closed + cardDetails[0].cancelled}</div>
                }
              </div>
            </div>
            <div className="Home-CardContainer">
              <div className="Home-FirstDivider">
                <div className="Home-CardIconContainer2"></div>
              </div>
              <div className="Home-SecondDivider">
                Completed Auctions
                <div className="Home-CountText">{cardDetails.length>0 && cardDetails[0].closed }</div>
              </div>
            </div>
            <div className="Home-CardContainer">
              <div className="Home-FirstDivider">
                <div className="Home-CardIconContainer3"></div>
              </div>
              <div className="Home-SecondDivider">
                Cancelled Auctions
                <div className="Home-CountText">{cardDetails.length>0 && cardDetails[0].cancelled }</div>
              </div>
            </div>
          </div>
          <div className="Home-SubContainer">
          </div>
          <div className="Home-Bottom">
            <div className="Home-BottomLeft">
              <div className="Home-MidLine"></div>
              <div>
                <div className="Home-SubHeadingText">Recent Auctions</div>
                <div className="Home-filterButton1" onClick={toggleFilterMenu}>
                  Filter
                  {showFilterMenu && (
                    <div className="Home-filter-menu">
                      <div className="Home-filter-container">Customer</div>
                      <div className="Home-filter-container">Restaurant</div>
                      <div className="Home-filter-container">Order Type</div>
                      <div className="Home-filter-container">Payment</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="Home-SubContainer">
                <div class="Home-tableArea">
                  <table class="Home-dbTable">
                    <thead>
                      <tr>
                        <th>Auction ID</th>
                        <th style={{ textAlign: 'left' }}>Auctioneer</th>
                        <th>No of Bids</th>
                        <th>Base Price(Rs)</th>
                        <th>Current Bid(Rs)</th>
                      </tr>
                    </thead>
                    <tbody>

                      {auctions && auctions.map((data, index) => (
                        <tr key={index}>
                          <td>{data.Id}</td>
                          <td style={{ textAlign: 'left' }}>{data.firstName}  {data.lastName}</td>
                          <td style={{ textAlign: 'right' }}>{data.hits}</td>
                          <td style={{ textAlign: 'right' }}>{(data.basePrice).toFixed(2)}</td>
                          <td style={{ textAlign: 'right' }}>{(data.max_bid).toFixed(2)}</td>
                        </tr>
                      ))}


                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Home-Right">
          <div className="Home-SubHeadingText">Food Partners</div>
          <div className="Home-filterButton1" onClick={toggleFilterMenu2}>
            Filter
            {showFilterMenu2 && (
              <div className="Home-filter-menu">
                <div className="Home-filter-container">All</div>
                <div className="Home-filter-container">Today</div>
                <div className="Home-filter-container">Yesterday</div>
                <div className="Home-filter-container">Last Week</div>
                <div className="Home-filter-container">Last Month</div>
              </div>
            )}
          </div>
          <div>
            <div className="Home-topRightContainer">
              <div className="Home-Activities">
                <div className="Home-ActivityIconContainer"></div>
                <div className="Home-ActivityText">KFC</div>
              </div>
              <div className="Home-Divider"></div>
              <div className="Home-Activities">
                <div className="Home-ActivityIconContainer"></div>
                <div className="Home-ActivityText">McDonalds</div>
              </div>
              <div className="Home-Divider"></div>
              <div className="Home-Activities">
                <div className="Home-ActivityIconContainer"></div>
                <div className="Home-ActivityText">Daiya Foods</div>
              </div>
              <div className="Home-Divider"></div>
              <div className="Home-Activities">
                <div className="Home-ActivityIconContainer"></div>
                <div className="Home-ActivityText">Spoons</div>
              </div>
              <div className="Home-Divider"></div>
              <div className="Home-Activities">
                <div className="Home-ActivityIconContainer"></div>
                <div className="Home-ActivityText">Pizza Hut</div>
              </div>
              <div className="Home-Divider"></div>
            </div>
          </div>
          <div className="Home-SubHeadingText">Customer Reviews</div>
          <div className="Home-filterButton1" onClick={toggleFilterMenu3}>
            Filter
            {showFilterMenu3 && (
              <div className="Home-filter-menu">
                <div className="Home-filter-container">All</div>
                <div className="Home-filter-container">Today</div>
                <div className="Home-filter-container">Yesterday</div>
                <div className="Home-filter-container">Last Week</div>
                <div className="Home-filter-container">Last Month</div>
              </div>
            )}
          </div>
          <div className="Home-SubContainer">
            <div className="Home-bottomRightContainer">
              <div className='anl-pie-chart-container'>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={data} innerRadius={60} outerRadius={100} fill='#ccc' paddingAngle={5} dataKey='value' label={{ fill: 'black', fontSize: 13 }} onClick={handlePieClick}>
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
