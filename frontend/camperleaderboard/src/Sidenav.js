import React from 'react';
import SideNav, {Nav, NavIcon, NavText} from 'react-sidenav';


const Sidenav = () => (
	<div style={{background: '#2c3e50', color: '#FFF', width: 220}}>
		<SideNav highlightColor="#E91E63" highlightBgColo="#00bcd4" defaultSelected="sales">
			<Nav id="dashboard">
				<NavText>Dashboard</NavText>
			</Nav>
			<Nav id="sales">
				<NavText>Sales</NavText>
			</Nav>
		</SideNav>
	</div>
)

export default Sidenav;