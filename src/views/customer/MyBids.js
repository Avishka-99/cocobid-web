import React, { useState, useEffect } from 'react';
import Axios from '../../api/Axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../../styles/Customer/Bids.css';
import * as ToastMessages from '../../components/ToastMessages';
import Toast from '../../components/Toast';
export default function MyBids() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateTo = (page) => {
    navigate('/' + page);

  };
  const arrayOfObjects = [
		{ id: 1, name: "Alice", age: 30 },
		{ id: 2, name: "Bob", age: 35 },
		{ id: 3, name: "Charlie", age: 25 },
		{ id: 4, name: "David", age: 40 },
		{ id: 5, name: "Eve", age: 28 },
		{ id: 6, name: "Frank", age: 33 },
		{ id: 7, name: "Grace", age: 27 },
		{ id: 8, name: "Hannah", age: 32 },
		{ id: 9, name: "Ian", age: 38 },
		{ id: 10, name: "Jack", age: 29 },
		{ id: 11, name: "Katie", age: 31 },
		{ id: 12, name: "Liam", age: 36 },
		{ id: 13, name: "Mia", age: 26 },
		{ id: 14, name: "Noah", age: 34 },
		{ id: 15, name: "Olivia", age: 37 },
		{ id: 16, name: "Peter", age: 24 },
		{ id: 17, name: "Quinn", age: 39 },
		{ id: 18, name: "Rachel", age: 23 },
		{ id: 19, name: "Sam", age: 41 },
		{ id: 20, name: "Tina", age: 22 },
		{ id: 21, name: "Ursula", age: 42 },
		{ id: 22, name: "Victor", age: 27 },
		{ id: 23, name: "Wendy", age: 29 },
		{ id: 24, name: "Xavier", age: 35 },
		{ id: 25, name: "Yvonne", age: 31 },
		{ id: 26, name: "Zack", age: 36 },
		{ id: 27, name: "Abigail", age: 24 },
		{ id: 28, name: "Benjamin", age: 38 },
		{ id: 29, name: "Catherine", age: 33 },
		{ id: 30, name: "Daniel", age: 26 },
		{ id: 31, name: "Emily", age: 30 },
		{ id: 32, name: "Fiona", age: 37 },
		{ id: 33, name: "George", age: 28 },
		{ id: 34, name: "Holly", age: 32 },
		{ id: 35, name: "Isaac", age: 39 },
		{ id: 36, name: "Julia", age: 25 },
		{ id: 37, name: "Kevin", age: 40 },
		{ id: 38, name: "Lucy", age: 23 },
		{ id: 39, name: "Michael", age: 41 },
		{ id: 40, name: "Natalie", age: 22 },
		{ id: 41, name: "Oscar", age: 34 },
		{ id: 42, name: "Pamela", age: 43 },
		{ id: 43, name: "Quincy", age: 29 },
		{ id: 44, name: "Rebecca", age: 27 },
		{ id: 45, name: "Samantha", age: 35 },
		{ id: 46, name: "Theodore", age: 31 },
		{ id: 47, name: "Uma", age: 28 },
		{ id: 48, name: "Vincent", age: 36 },
		{ id: 49, name: "Walter", age: 26 },
		{ id: 50, name: "Xena", age: 30 },
		{ id: 51, name: "Xena", age: 30 }
	];

  return (
    <div className='customerBids'>
rtregdf
    </div>
  );
}


