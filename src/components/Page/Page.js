import React from 'react';
import Header from '../Header';
import BuySection from '../BuySection';
import SellSection from '../SellSection';

import './page.scss';

class MainApp extends React.Component {
	render() {
		return (
			<div className="my-app">
				<Header />
				<BuySection />
				<SellSection />
			</div>
		)
	}
}

export default MainApp;
