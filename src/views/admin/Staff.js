import React, {useEffect, useState} from 'react';
import StaffRegistrationForm from './staffregisterform';
import '../../styles/Admin/Staff.css';
import CloseIcon from '@mui/icons-material/Close';
import * as API_ENDPOINTS from '../../api/ApiEndpoints';
import Axios from '../../api/Axios';
import { LineChart, Line, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

export default function Staff() {
	const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const currentDate = new Date();
	const dayOfWeek = daysOfWeek[currentDate.getDay()];
	const dayOfMonth = currentDate.getDate();
	const month = months[currentDate.getMonth()];
  const [staff, setStaff] = useState([]);
	const year = currentDate.getFullYear();
	const formattedDate = `${dayOfWeek} ${dayOfMonth.toString().padStart(2, '0')},  ${month} ${year}`;

	const data = [
		{
		  name: 'Monday',
		  "Staff Members": 31,  
		},
		{
		  name: 'Tuesday',
		  "Staff Members": 42,
		},
		{
		  name: 'Wednesday',
		  "Staff Members": 38,
		},
		{
		  name: 'Thursday',
		  "Staff Members": 26,
		},
		{
		  name: 'Friday',
		  "Staff Members": 45,
		},
		{
		  name: 'Saturday',
		  "Staff Members": 40,
		},
		{
		  name: 'Sunday',
		  "Staff Members": 50,
		},
	];

	const [showFilterMenu, setShowFilterMenu] = useState(false);
	
	const toggleFilterMenu = () => {
		setShowFilterMenu(!showFilterMenu);
	};

	const [showFilterMenu2, setShowFilterMenu2] = useState(false);
	
	const toggleFilterMenu2 = () => {
		setShowFilterMenu2(!showFilterMenu2);
	};

	const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

	const openRegistrationForm = () => {
		setIsRegistrationOpen(true);
	};

	const closeRegistrationForm = () => {
		setIsRegistrationOpen(false);
	};
  
	// useEffect(() => {
	// 	Axios.post(API_ENDPOINTS.FETCH_ALL_STAFF).then((response) => {
	// 		console.log(response.data);
  //     setStaff(response.data);
	// 	});
	// },[]);
	
useEffect(() => {
  // Axios.get('http://localhost:5001/api/fetchstaff').then((response) => {
  //   console.log(response.data);
  //   setStaff(response.data);
  // }
  // );
}
,[]);


    return (
        <div className="Staff-Container">
          <div className="Staff-Top">
             <div className="Staff-TopLeft">
                <div className="Staff-TopLine">
                    <div className="Staff-HeadingText">VGen Staff</div>    
				            <div className="Staff-NotificationButton"></div>
                </div>
                <div>
                  <div className="Staff-DateText">{formattedDate}</div>
				          <div className="Staff-AddButton" onClick={openRegistrationForm}>Add Member</div>
                </div>
                <div className="Staff-SubContainer">
				      <div class="Home-tableArea">
              <table className="Home-dbTable">
  <thead>
    <tr>
      <th>Staff ID</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>NIC</th>
      <th>Contact</th>
    </tr>
  </thead>
  <tbody>
    {staff.map((staff) => (
      <tr key={staff.userId}>
        <td>{staff.userId}</td>
        <td>{staff.firstName}</td>
        <td>{staff.lastName}</td>
        <td>{staff.nic}</td>
        <td>{staff.contactNo}</td>
      </tr>
    ))}
  </tbody>
</table>

			        </div>
            </div>
				    {isRegistrationOpen && (
				      <div className='modal'>
					    <div className='modal-content' style={{width: '70%'}}>
						    <span className='close' onClick={closeRegistrationForm}>
							    <CloseIcon />
						    </span>
						      <StaffRegistrationForm onClose={closeRegistrationForm} />
					    </div>
				      </div>
			      )}
            <div className="Staff-Bottom">
            <div className="Staff-BottomLeft">
              <div>
                <div className="Staff-SubHeadingText">Staff Additions Summary</div>
                <div className="Staff-FilterButton1" onClick={toggleFilterMenu}>
                  Weekly
                  {showFilterMenu && (
                    <div className="Staff-Filter-menu">

                      <div className="Staff-Filter-container">Weekly</div>
                      <div className="Staff-Filter-container">Monthly</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="Staff-SubContainer">
                <div className="Staff-BottomLeftContainer">
                  <ResponsiveContainer width="100%" height="100%">
                     <LineChart width={800} height={350} data={data} margin={{top: 5, right: 30, left: 0, bottom: 5, }}>
					   <defs>
                         <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#2F4858" />
                            <stop offset="100%" stopColor="#5FA18F" />
                         </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" />
                       <XAxis dataKey="name" tick={{ fontSize: 12 }}/>
                       <YAxis tick={{ fontSize: 12 }}/>
                       <Tooltip contentStyle={{ fontSize: 12 }}/>
                       <Legend iconSize={12} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                       <Line type="monotone" dataKey="Staff Members" stroke="url(#lineGradient)" strokeWidth={3} activeDot={{ r: 8 }}/>  
                     </LineChart>
                 </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
            </div>
            <div className="Staff-Right">
                <div className="Staff-SubHeadingText">
                    Active Status
				<div className="Staff-FilterButton2" onClick={toggleFilterMenu2}>
                  Filter
                  {showFilterMenu2 && (
                    <div className="Staff-Filter-menu2">
                      <div className="Staff-Filter-container">Active Now</div>
                      <div className="Staff-Filter-container">Active 5 mins Ago</div>
					  <div className="Staff-Filter-container">Active 30 mins ago</div>
                      <div className="Staff-Filter-container">Recently Active</div>
                    </div>
                  )}
                </div>
                </div>
                <div>
                  <div className="Staff-RightContainer">
				     <div className="Staff-Activities">
                        <div className="Staff-ActivityIconContainer"></div>
                        <div className="Staff-ActivityText">Daweendri Himasha</div>
                     </div>
                     <div className="Staff-Divider"></div>
                     <div className="Staff-Activities">
                        <div className="Staff-ActivityIconContainer"></div>
                        <div className="Staff-ActivityText">Madhawa Samarasinghe</div>
                     </div>
                     <div className="Staff-Divider"></div>
                     <div className="Staff-Activities">
                        <div className="Staff-ActivityIconContainer"></div>
                        <div className="Staff-ActivityText">Danusha Thilakarathne</div>
                     </div>
                     <div className="Staff-Divider"></div>
					 <div className="Staff-Activities">
                        <div className="Staff-ActivityIconContainer"></div>
                        <div className="Staff-ActivityText">Avishka Prabath</div>
                     </div>
                     <div className="Staff-Divider"></div>
                     <div className="Staff-Activities">
                        <div className="Staff-ActivityIconContainer"></div>
                        <div className="Staff-ActivityText">Ranil de Soysa</div>
                     </div>
                     <div className="Staff-Divider"></div>
                     <div className="Staff-Activities">
                        <div className="Staff-ActivityIconContainer"></div>
                        <div className="Staff-ActivityText">Sadun Perera</div>
                     </div>
                     <div className="Staff-Divider"></div>
					 <div className="Staff-Activities">
                        <div className="Staff-ActivityIconContainer"></div>
                        <div className="Staff-ActivityText">Kasun Soysa</div>
                     </div>
                     <div className="Staff-Divider"></div>
                     <div className="Staff-Activities">
                        <div className="Staff-ActivityIconContainer"></div>
                        <div className="Staff-ActivityText">Amal Perera</div>
                     </div>
                     <div className="Staff-Divider"></div>
                    
                  </div>
                </div>
            </div>
          </div>
        </div>
    );
}
