import * as UserViews from '../constants/AllViews';
import React from 'react';
export const customerRoutes = [
	{id: 1, path: '/home', element: <UserViews.Home />},
	{id: 2, path: '/mybids', element: <UserViews.MyBids />},
	{id: 3, path: '/myauctions', element: <UserViews.MyAuctions />},
	{id: 4, path: '/payment', element: <UserViews.Profile />},
];
export const adminRoutes = [
	{id: 1, path: '/home', element: <UserViews.AdminHome />},
	{id: 2, path: '/staff', element: <UserViews.Staff />},
	{id: 3, path: '/analytics', element: <UserViews.Analytics />},
	{id: 4, path: '/riders', element: <UserViews.Riders />},
	{id: 6, path: '/categories', element: <UserViews.AddCategories />},
	{id: 7, path: '/profile', element: <UserViews.AdminProfile />},
	{id: 8, path: '/sales', element: <UserViews.Sales />},
	
];
