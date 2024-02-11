import React, { useEffect, useState } from 'react';
import MenuItem from './MenuItem';
import '../styles/Sidebar.css';
import HomeIcon from '@mui/icons-material/Home';
import WindowIcon from '@mui/icons-material/Window';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import LogoutIcon from '@mui/icons-material/Logout';
import DatasetIcon from '@mui/icons-material/Dataset';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { socket } from '../socket';
const ShowSidebar = (props) => {
	const navigate = useNavigate();
	var user = localStorage.getItem('type');
	const [role, setRole] = useState('delivery');
	const [Active, setActive] = useState(1);
	const [expanded, setExpanded] = useState(true);
	const toggleSidebar = () => {
		setExpanded(!expanded);
	};
	/*useEffect(() => {
	navigate('/order');
  })*/
	//console.log(user);
	const customer = [
		{ id: 1, icon: <HomeIcon sx={{ fontSize: 30, fill: '#6F767F' }} />, label: 'Home', link: 'home', index: '1' },
		{id: 2, icon: <WindowIcon sx={{fontSize: 30, fill: '#6F767F'}} />, label: 'My Bids', link: 'mybids', index: '2'},
		{ id: 2, icon: <InventoryIcon sx={{ fontSize: 30, fill: '#6F767F' }} />, label: 'My Auctions', link: 'myauctions', index: '2' },
		{ id: 3, icon: <LogoutIcon sx={{ fontSize: 30, fill: '#6F767F' }} />, label: 'LogOut', link: 'logout', index: '3' },
	];
	const admin = [
		{ id: 1, icon: <HomeIcon sx={{ fontSize: 30, fill: '#6F767F' }} />, label: 'Home', link: 'home', index: '1' },
		{ id: 2, icon: <GroupsIcon sx={{ fontSize: 30, fill: '#6F767F' }} />, label: 'Members', link: 'staff', index: '2' },
		{ id: 3, icon: <TrendingUpIcon sx={{ fontSize: 30, fill: '#6F767F' }} />, label: 'Analytics', link: 'analytics', index: '3' },
		// { id: 4, icon: <DirectionsBikeIcon sx={{ fontSize: 30, fill: '#6F767F' }} />, label: 'Riders', link: 'riders', index: '4' },
		// { id: 5, icon: <DatasetIcon sx={{ fontSize: 30, fill: '#6F767F' }} />, label: 'Categories', link: 'categories', index: '5' },
		{ id: 6, icon: <AccountCircleIcon sx={{ fontSize: 30, fill: '#6F767F' }} />, label: 'Profile', link: 'profile', index: '6' },
		{ id: 7, icon: <LogoutIcon sx={{ fontSize: 30, fill: '#6F767F' }} />, label: 'LogOut', link: 'logout', index: '7' },
	];
	const navigateTo = (page, index) => {
		setActive(index);
		if (page == 'logout') {
			socket.close();
			setActive(1);
			sessionStorage.clear('type');
		}
		navigate('/' + page);
	};
	if (props.type == 'Admin') {
		return (
			<div className={`sidebar ${expanded ? 'expanded' : 'collapsed'}`} onSelect={(item) => console.log(item)}>
				<div className={expanded ? 'expand-toggle' : 'expand'} onClick={toggleSidebar}>
					{expanded ? <MenuOutlinedIcon /> : <MenuOutlinedIcon />}
				</div>
				<div>
					{admin.map((item) => (
						<MenuItem expanded={expanded ? true : false} key={item.id} icon={item.icon} labelMargin={expanded ? { marginLeft: '10%', height: '100%', display: 'flex', alignItems: 'center' } : { marginLeft: '0%', height: '100%', display: 'flex', alignItems: 'center' }} label={expanded ? item.label : null} style={{ width: '100%' }} fun={navigateTo} link={item.link} index={item.index} active={Active} />
					))}
				</div>
			</div>
		);
	} else if (props.type == 'customer') {
		return (
			<div className={`sidebar ${expanded ? 'expanded' : 'collapsed'}`} onSelect={(item) => console.log(item)}>
				<div className={expanded ? 'expand-toggle' : 'expand'} onClick={toggleSidebar}>
					{expanded ? <MenuOutlinedIcon /> : <MenuOutlinedIcon />}
				</div>
				<div>
					{customer.map((item) => (
						<MenuItem expanded={expanded ? true : false} key={item.id} icon={item.icon} labelMargin={expanded ? { marginLeft: '10%', height: '100%', display: 'flex', alignItems: 'center' } : { marginLeft: '0%', height: '100%', display: 'flex', alignItems: 'center' }} label={expanded ? item.label : null} style={{ width: '100%' }} fun={navigateTo} link={item.link} index={item.index} active={Active} />
					))}
				</div>
			</div>
		);
	}
};
export default function Sidebar(props) {
	const [showSidebar, setShowSidebar] = useState(true);

	const toggleSidebar = () => {
		setShowSidebar(!showSidebar);
	};
	return (
		<>
			{/* <div onClick={toggleSidebar} className='sidebarButton'>Hello</div> */}
			{showSidebar && <ShowSidebar type={props.type} />}
		</>
	);
}
