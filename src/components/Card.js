import React from 'react';

export default function DashBoardCard(props) {
	return (
		<div
			style={{
				width: '26%',
				height: '100%',
				backgroundColor: '#BCDAC8',
				borderRadius: 20,
			}}
		>
			<div style={{ width: '100%', height: '30%' }}></div>
			<div style={{ width: '100%', textAlign: 'center', fontFamily: 'poppins-bold', fontSize: 34 }}>{props.amount}</div>
			<div style={{ width: '100%', textAlign: 'center', alignItems: 'center' }}>
				<span style={{ fontFamily: 'poppins-bold', fontSize: 22 }}>{props.description}</span>
			</div>
		</div>
	);
}